"use server";
import { db } from "@/db";
import {
  courses,
  NewuserCourseSections,
  userCourses,
  userSections,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getSession } from "../session";
import { revalidatePath } from "next/cache";

export async function getCourses() {
  return await db.select().from(courses);
}

export async function getCourseSections({ courseId }: { courseId: string }) {
  const course = await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, courseId),
    columns: { id: true, title: true },
    with: {
      sections: { orderBy: (sections, { asc }) => asc(sections.sortOrder) },
    },
  });

  return course;
}

export async function updateCourseCompleted(props: { courseId: string }) {
  const session = await getSession();
  if (!session) {
    return { error: " users session was notfound" };
  }
  try {
    await db
      .update(userSections)
      .set({ completed: true })
      .where(
        and(
          eq(userSections.userId, session?.userId ?? ""),
          eq(userSections.courseId, props.courseId)
        )
      );
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }

  revalidatePath(`/courses/${props.courseId}`);
  return { data: true };
}

export async function accessCourse(params: {
  courseId: string;
  userId: string;
}) {
  const session = await getSession();
  const course = await findUsersCourse(params.courseId);
  if (course) redirect(`/courses/${params.courseId}`);
  await db
    .insert(userCourses)
    .values({ courseId: params.courseId, userId: session?.userId ?? "" });

  const courseSections = await getCourseSections({ courseId: params.courseId });
  if (courseSections?.sections.length) {
    const value: NewuserCourseSections[] = courseSections?.sections!.map(
      (section) => ({
        userId: session?.userId ?? "",
        courseId: params.courseId ?? "",
        sectionId: section.id,
        sortOrder: section.sortOrder,
      })
    );
    await db.insert(userSections).values(value);
  }

  redirect(`/courses/${params.courseId}`);
}

export async function findUsersCourse(courseId: string) {
  const session = await getSession();

  const course = await db.query.userCourses.findFirst({
    where: (userCourses, { and, eq }) =>
      and(
        eq(userCourses.courseId, courseId),
        eq(userCourses.userId, session?.userId ?? "")
      ),
    columns: { userId: false },
    with: { course: { columns: { title: true, description: true, id: true } } },
  });

  return course;
}

export async function getUsersCourseSections({
  courseId,
}: {
  courseId: string;
}) {
  const session = await getSession();
  const userCourseSections = await db.query.userSections.findMany({
    where: (userSections, { and, eq }) =>
      and(
        eq(userSections.courseId, courseId),
        eq(userSections.userId, session?.userId ?? "")
      ),
    columns: { completed: true, sectionId: true },
    orderBy: (userSections, { asc }) => asc(userSections.sortOrder),
    with: {
      section: {
        columns: { title: true, videoUrl: true, id: true },
      },
    },
  });
  return userCourseSections;
}

export async function upateUserCourseSections({
  courseId,
  sectionId,
}: {
  courseId: string;
  sectionId: string;
}) {
  const session = await getSession();
  await db
    .update(userSections)
    .set({ completed: true })
    .where(
      and(
        eq(userSections.courseId, courseId),
        eq(userSections.sectionId, sectionId),
        eq(userSections.userId, session?.userId ?? "")
      )
    );

  return true;
}

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, userId),
    columns: {
      firstName: true,
      lastName: true,
      profilePicture: true,
    },
  });
  return user;
}

export async function filterSections(courseId: string) {
  const userSections = await getUsersCourseSections({ courseId });
  const incompleteSections = userSections.filter(
    (section) => !section.completed
  );
  return incompleteSections.length > 0 ? incompleteSections[0].section : null;
}
