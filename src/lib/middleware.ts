/* eslint-disable @typescript-eslint/no-explicit-any */
import type { z } from "zod";

export type ActionState<T = any> = {
  error?: string | null;
  success?: string | null;
  data?: T | null;
  [key: string]: any; // This allows for additional properties
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T = any> = (
  data: z.infer<S>,
  formData: FormData,
  prevState: ActionState<T>
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T = any>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState<T>, formData: FormData): Promise<T> => {
    const formDataObj: Record<string, any> = {};

    // First pass: collect all array fields
    const arrayFields = new Map<string, any[]>();

    for (const [key, value] of formData.entries()) {
      const arrayMatch = key.match(/^(.+?)\[(\d+)\]$/);

      if (arrayMatch) {
        const [, fieldName, index] = arrayMatch;
        if (fieldName && !arrayFields.has(fieldName)) {
          arrayFields.set(fieldName, []);
        }
        if (fieldName && index) {
          arrayFields.get(fieldName)![parseInt(index)] = value;
        }
      } else {
        formDataObj[key] = value;
      }
    }

    // Add collected arrays to the form data object
    for (const [fieldName, values] of arrayFields.entries()) {
      formDataObj[fieldName] = values.filter((v) => v !== undefined);
    }

    const result = schema.safeParse(formDataObj);
    if (!result.success) {
      console.log(result.error.errors);
      return {
        error: result.error.errors[0]?.message ?? "Invalid form data",
        data: formDataObj,
        errors: result.error.errors.reduce(
          (acc, err) => ({
            ...acc,
            [(err.path?.[0] ?? "unknown") as string]: err.message,
          }),
          {}
        ),
      } as T;
    }

    try {
      return await action(result.data, formData, prevState);
    } catch (error) {
      console.error("Action failed:", error);
      return {
        error: "An unexpected error occurred while processing the action.",
        data: result.data,
        errors: {},
      } as T;
    }
  };
}
