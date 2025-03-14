// import { db } from "@/db";
// import { courses, NewCourseSection, sections } from "@/db/schema";
// import { eq } from "drizzle-orm";

// (async () => {
//   const courses: NewCourseSection[] = [
//     {
//       title: "The Holy Spirit",
//       videoUrl:
//         "https://pub-6b8d0af5d9e0460383b2cbe128ef5b1c.r2.dev/Welcome%20To%20God's%20Family%20-%20Day%202%20-%20The%20Holy%20Spirit%20.mp4",
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//     },
//     {
//       title: "Righteousness",
//       videoUrl:
//         "https://pub-6b8d0af5d9e0460383b2cbe128ef5b1c.r2.dev/Welcome%20To%20God's%20Family-Day-3-Righteousnes.mp4",
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//     },
//   ];
//   const section = await db.insert(sections).values(courses);
//   console.log(section);
// })();
