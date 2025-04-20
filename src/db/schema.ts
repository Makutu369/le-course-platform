import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  date,
  foreignKey,
  primaryKey,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const courses = pgTable("courses", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  title: text().notNull(),
  description: varchar({ length: 254 }),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
});

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    email: varchar({ length: 254 }).notNull(),
    password: varchar({ length: 254 }).notNull(),
    firstName: varchar("first_name", { length: 99 }),
    lastName: varchar("last_name", { length: 99 }),
    phone: varchar("phone", { length: 49 }),
    otherNames: varchar("other_names", { length: 99 }),
    role: varchar({ length: 49 }).default("user").notNull(),
    profilePicture: varchar("profile_picture", { length: 254 }),
    dateOfBirth: date("date_of_birth"),
    megaCenter: uuid("mc_id"),
    gender: varchar(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.megaCenter],
      foreignColumns: [megaCenters.id],
      name: "users_mc_id_mega_centers_id_fk",
    }),
  ]
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    token: text().notNull(),
    deviceType: varchar("device_type", { length: 49 }).notNull(),
    deviceName: varchar("device_name", { length: 99 }).notNull(),
    browser: varchar({ length: 49 }).notNull(),
    operatingSystem: varchar("operating_system", { length: 49 }).notNull(),
    lastActiveAt: timestamp("last_active_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "sessions_user_id_users_id_fk",
    }).onDelete("cascade"),
  ]
);

export const megaCenters = pgTable("mega_centers", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  church: varchar("church", { length: 49 }),
  zonalPastor: varchar("zonal_pastor", { length: 49 }),
  name: varchar("name", { length: 49 }).notNull(),
  head: varchar("mc_head", { length: 49 }),
  email: varchar("mc_email", { length: 49 }),
  phone: varchar("mc_phone", { length: 49 }),
});

export const sections = pgTable(
  "sections",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    courseId: uuid("course_id").notNull(),
    sortOrder: integer("sort_order"),
    title: text().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
    videoUrl: varchar("video_url", { length: 254 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "sections_course_id_courses_id_fk",
    }).onDelete("cascade"),
  ]
);

export const userCourses = pgTable(
  "user_courses",
  {
    userId: uuid("user_id").notNull(),
    courseId: uuid("course_id").notNull(),
    enrolledAt: timestamp("enrolled_at", { mode: "string" }).defaultNow(),
    completed: boolean().default(false),
    compeletedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "user_courses_user_id_users_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "user_courses_course_id_courses_id_fk",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.userId, table.courseId],
      name: "user_courses_user_id_course_id_pk",
    }),
  ]
);

export const userSections = pgTable(
  "user_sections",
  {
    userId: uuid("user_id").notNull(),
    sectionId: uuid("section_id").notNull(),
    courseId: uuid("course_id").notNull(),
    completed: boolean().default(false),
    sortOrder: integer("sort_order"),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "user_sections_user_id_users_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.sectionId],
      foreignColumns: [sections.id],
      name: "user_sections_section_id_sections_id_fk",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.courseId],
      foreignColumns: [courses.id],
      name: "user_sections_course_id_courses_id_fk",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.userId, table.sectionId],
      name: "user_sections_user_id_section_id_pk",
    }),
  ]
);

export const megaCenterRelations = relations(megaCenters, ({ many }) => ({
  users: many(users),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  userCourses: many(userCourses),
  userSections: many(userSections),
  megacenters: one(megaCenters, {
    fields: [users.megaCenter],
    references: [megaCenters.id],
  }),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  course: one(courses, {
    fields: [sections.courseId],
    references: [courses.id],
  }),
  userSections: many(userSections),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  sections: many(sections),
  userCourses: many(userCourses),
  userSections: many(userSections),
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

export type CourseSections = typeof sections.$inferSelect;
export type NewCourseSections = typeof sections.$inferInsert;

export type userCourseSections = typeof userSections.$inferSelect;
export type NewuserCourseSections = typeof userSections.$inferInsert;

export type MegaCenter = typeof megaCenters.$inferSelect;
export type NewMegaCenter = typeof megaCenters.$inferInsert;
