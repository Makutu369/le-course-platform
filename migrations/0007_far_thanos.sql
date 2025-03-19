ALTER TABLE "user_sections" ADD COLUMN "completed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user_sections" ADD COLUMN "sort_order" integer;--> statement-breakpoint
ALTER TABLE "user_sections" DROP COLUMN "completed_at";