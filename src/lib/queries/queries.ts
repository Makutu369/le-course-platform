"use server";
import { db } from "@/db";
import { courses, userCourses, userSections } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getSession } from "../session";

export async function getCourses() {
  return await db.select().from(courses);
}

export async function getCourseSections({ courseId }: { courseId: string }) {
  const course = await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, courseId),
    with: {
      sections: true,
    },
  });

  return course;
}

export async function updateCourseCompleted(courseId: string, userId: string) {
  return await db
    .update(userCourses)
    .set({ completed: true })
    .where(
      and(eq(userCourses.userId, userId), eq(userCourses.courseId, courseId))
    )
    .returning();
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
    with: {},
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
    .set({ completedAt: String(new Date()) })
    .where(
      and(
        eq(userSections.courseId, courseId),
        eq(userSections.sectionId, sectionId),
        eq(userSections.userId, session?.userId ?? "")
      )
    );

  return true;
}
