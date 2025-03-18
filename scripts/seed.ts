import { db } from "@/db";
import { sections, userSections } from "@/db/schema";
import { eq } from "drizzle-orm";

(async () => {
  const courseId = "ac9d9782-8282-4cbe-b9b3-494bc7c3b269";
  const courseSections = await db.query.courses.findFirst({
    columns: {
      title: true,
    },
    where: (course, { eq }) => eq(course.id, courseId),
    with: {
      sections: {
        columns: {
          id: true,
        },
      },
    },
  });

  courseSections?.sections.forEach(async (section) => {
    await db.insert(userSections).values({
      courseId,
      sectionId: section.id,
      userId: "e609cca1-5fbd-46e7-807a-abf0046c3071",
    });
  });
  console.log("done");
})();
