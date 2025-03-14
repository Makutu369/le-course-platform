import {
  pgTable,
  varchar,
  date,
  integer,
  uuid,
  text,
  timestamp,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";
import { timestamps } from "./column_helper";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  otherNames: varchar("other_names", { length: 100 }),
  role: varchar("role", { length: 50, enum: ["user", "admin"] })
    .default("user")
    .notNull(), // user, admin, etc.
  profilePicture: varchar("profile_picture", { length: 255 }),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { enum: ["male", "female"] }),
  ...timestamps,
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull(),
  deviceType: varchar("device_type", { length: 50 }).notNull(),
  deviceName: varchar("device_name", { length: 100 }).notNull(),
  browser: varchar("browser", { length: 50 }).notNull(),
  operatingSystem: varchar("operating_system", { length: 50 }).notNull(),
  lastActiveAt: timestamp("last_active_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: varchar("description", { length: 255 }),
  imageUrl: text("image_url"),
  ...timestamps,
});

export const sections = pgTable("sections", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  videoUrl: varchar("video_url", { length: 255 }).notNull(),
  ...timestamps,
});

export const userCourses = pgTable(
  "user_courses",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at").defaultNow(),
    completed: boolean("completed").default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.courseId] }),
  })
);

export const userSections = pgTable(
  "user_sections",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.sectionId] }),
  })
);

//relations
export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export const usersRelations = relations(users, ({ many }) => ({
  enrolledCourses: many(userCourses),
  completedSections: many(userSections),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  sections: many(sections),
  enrolledUsers: many(userCourses),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  course: one(courses, {
    fields: [sections.courseId],
    references: [courses.id],
  }),
  completedByUsers: many(userSections),
}));

export const userCoursesRelations = relations(userCourses, ({ one }) => ({
  user: one(users, {
    fields: [userCourses.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [userCourses.courseId],
    references: [courses.id],
  }),
}));

export const userSectionsRelations = relations(userSections, ({ one }) => ({
  user: one(users, {
    fields: [userSections.userId],
    references: [users.id],
  }),
  section: one(sections, {
    fields: [userSections.sectionId],
    references: [sections.id],
  }),
  course: one(courses, {
    fields: [userSections.courseId],
    references: [courses.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;

export type CourseSection = typeof sections.$inferSelect;
export type NewCourseSection = typeof sections.$inferInsert;
