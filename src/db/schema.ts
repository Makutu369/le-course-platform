import { pgTable, serial, varchar, date } from "drizzle-orm/pg-core";
import { timestamps } from "./column_helper";

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
