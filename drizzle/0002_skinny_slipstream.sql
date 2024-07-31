ALTER TABLE "expenses" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN IF EXISTS "timestamp3";