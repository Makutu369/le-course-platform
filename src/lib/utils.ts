import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ADMIN_EMAILS = [
  "ojodavid116@gmail.com",
  "chelseakowouvi@gmail.com",
  "amandananaamaa@gmail.com",
  "beverly@gmail.com",
];
