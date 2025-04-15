CREATE TABLE "mega_centers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(49) NOT NULL,
	"mc_head" varchar(49),
	"mc_email" varchar(49),
	"mc_phone" varchar(49)
);
--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "description" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "sections" ALTER COLUMN "video_url" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "device_type" SET DATA TYPE varchar(49);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "device_name" SET DATA TYPE varchar(99);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "browser" SET DATA TYPE varchar(49);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "operating_system" SET DATA TYPE varchar(49);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET DATA TYPE varchar(99);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET DATA TYPE varchar(99);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "other_names" SET DATA TYPE varchar(99);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(49);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "profile_picture" SET DATA TYPE varchar(254);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "mc_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_mc_id_mega_centers_id_fk" FOREIGN KEY ("mc_id") REFERENCES "public"."mega_centers"("id") ON DELETE no action ON UPDATE no action;