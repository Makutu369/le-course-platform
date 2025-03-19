// import { db } from "@/db";
// import { NewCourseSections, sections, userSections } from "@/db/schema";
// import { eq } from "drizzle-orm";

// (async () => {
//   const newSections: NewCourseSections[] = [
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Born again -1",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day1/kp3gffybtyktjk2w2fuy",
//       sortOrder: 1,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Born again -2",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day1/gw6uuhnnqzgfhjkk7osv",
//       sortOrder: 2,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Born again -3",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day1/kgqpswqb7roglwfjcges",
//       sortOrder: 3,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "The Holy Spirit - 1",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/lkts7ihbqsokvss1h0xw",
//       sortOrder: 4,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "The Holy Spirit - 2",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/pvg9lyu90jypewihfskz",
//       sortOrder: 5,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "The Holy Spirit - 3",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/peyiy73lhg4o2y1mhhxv",
//       sortOrder: 6,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Righteousness - 1",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day3/vuudqekwq5ukcfqiidhv",
//       sortOrder: 7,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Righteousness - 2",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day3/c7mmq2fyxqqavtgnlvmj",
//       sortOrder: 8,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Righteousness - 3",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day3/qswmeceweonclvnkoh76",
//       sortOrder: 9,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "You are not a sinner - 1",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-4/shk649g2cmcp9xhbeir5",
//       sortOrder: 10,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "You are not a sinner - 2",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-4/cwyrsf16lfxuirzsrh1g",
//       sortOrder: 11,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "You are not a sinner - 3",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-4/je5hz1nwqi96qjeqr8a4",
//       sortOrder: 12,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "You are not a sinner - 4",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-4/h0zttfwshuptj9gghova",
//       sortOrder: 13,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Soul Winning - 1",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day5/sp5jejfzufw9rgbnktk2",
//       sortOrder: 14,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Soul Winning - 2",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day5/mp6scefwt70utxfjqgn5",
//       sortOrder: 15,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Soul Winning - 3",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day5/gjgcqc1omu5hi3h0cszi",
//       sortOrder: 15,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Church Commitment - 1",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-6/jkorqyvshtfgeujfawxg",
//       sortOrder: 16,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Church Commitment - 2",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-6/ukshmzlrlwo7flrcfni7",
//       sortOrder: 17,
//     },
//     {
//       courseId: "ac9d9782-8282-4cbe-b9b3-494bc7c3b269",
//       title: "Church Commitment - 4",
//       videoUrl:
//         "https://res.cloudinary.com/dp563neb6/video/upload/f_auto:video,q_auto/v1/le-course-platform/wtgf/Day-6/i7zjncqr686dgcaxvis3",
//       sortOrder: 18,
//     },
//   ];

// })();
