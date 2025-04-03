import { db } from "@/db";
import { eq } from "drizzle-orm";

import { userCourses, users } from "@/db/schema";

export async function getUsersEnrolledInCourse(courseId: string) {
    return await db
      .select({
        userId: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        enrolledAt: userCourses.enrolledAt,
        completed: userCourses.completed
      })
      .from(userCourses)
      .innerJoin(users, eq(users.id, userCourses.userId)) 
      .where(eq(userCourses.courseId, courseId)); 
  }

  