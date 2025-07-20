"use server";
import { db } from "@/db";
import {
  courses,
  megaCenters,
  NewuserCourseSections,
  sections,
  userCourses,
  users,
  userSections,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
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

export async function updateCourseCompleted(props: {
  courseId: string;
  sectionId: string;
}) {
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
          eq(userSections.courseId, props.courseId),
          eq(userSections.sectionId, props.sectionId)
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
  const isEnrolled = await db.query.userCourses.findFirst({
    where: (userCourses, { and, eq }) =>
      and(
        eq(userCourses.courseId, courseId),
        eq(userCourses.userId, session?.userId ?? "")
      ),
  });
  if (!isEnrolled) return;
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
      email: true,
      phone: true,
      megaCenter: true,
    },
  });
  return user;
}

export async function filterSections(courseId: string) {
  const userSections = await getUsersCourseSections({ courseId });
  if (!userSections) redirect("/courses");
  const incompleteSections = userSections.filter(
    (section) => !section.completed
  );
  return incompleteSections.length > 0 ? incompleteSections[0].section : null;
}

export async function getUsersEnrolledInCourse(courseId: string) {
  return await db
    .select({
      userId: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      enrolledAt: userCourses.enrolledAt,
      completed: userCourses.completed,
      megaCenterid: users.megaCenter,
      megaCenterName: users.megaCenter,
    })
    .from(userCourses)
    .innerJoin(users, eq(users.id, userCourses.userId))
    .innerJoin(megaCenters, eq(megaCenters.id, users.megaCenter))
    .where(eq(userCourses.courseId, courseId));
}
export async function getAllUsersProgressInCourse(courseId: string) {
  const totalSections = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(sections)
    .where(eq(sections.courseId, courseId))
    .then((res) => res[0]?.count ?? 0);

  if (totalSections === 0) return [];

  try {
    const usersProgress = await db
      .select({
        userId: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        megaCenterId: users.megaCenter,
        megaCenterName: megaCenters.name,
        completedSections: sql<number>`COUNT(${userSections.sectionId})`,
        completed: sql<boolean>`bool_or(${userCourses.completed})`,
      })
      .from(users)
      .innerJoin(userCourses, eq(users.id, userCourses.userId))
      .leftJoin(megaCenters, eq(users.megaCenter, megaCenters.id))
      .leftJoin(
        userSections,
        and(
          eq(userSections.userId, users.id),
          eq(userSections.courseId, courseId),
          eq(userSections.completed, true)
        )
      )
      .where(eq(userCourses.courseId, courseId))
      .groupBy(
        users.id,
        users.firstName,
        users.lastName,
        users.email,
        users.megaCenter,
        megaCenters.name
      );

    return usersProgress.map((user) => ({
      ...user,
      progress: Math.round((user.completedSections / totalSections) * 100),
      courseCompleted: user.completedSections === totalSections,
    }));
  } catch (error) {
    console.error("Error fetching users progress:", error);
    return [];
  }
}

export async function checkAdditionalInfoAdded() {
  const currentUser = await getSession();
  if (!currentUser) return;

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, currentUser.userId),
    columns: {
      phone: true,
      megaCenter: true,
    },
  });

  if (!user) return { error: "unauthorised" };
  const { megaCenter } = user;

  if (!megaCenter) {
    redirect("/student-info");
  }

  redirect("/courses");
}

export async function getAllMegaCenters() {
  const centers = await db.query.megaCenters.findMany();

  return centers;
}

export async function assignUserToMC(MegaCenterId: string) {
  try {
    const sessionData = await getSession();
    const res = await db
      .update(users)
      .set({ megaCenter: MegaCenterId })
      .where(eq(users.id, sessionData?.userId ?? ""));
    return res;
  } catch (error) {
    console.error("Error assigning user to mega center:", error);
    throw error;
  }
}

export async function addUserPhone(phone: string) {
  try {
    const sessionData = await getSession();

    await db
      .update(users)
      .set({ phone: phone })
      .where(eq(users.id, sessionData?.userId ?? ""));
  } catch (error) {
    console.error("Error adding user phone:", error);
    throw error;
  }
}
