import {
  pgTable,
  serial,
  varchar,
  date,
  integer,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { timestamps } from "./column_helper";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
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
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
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

//relations

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
