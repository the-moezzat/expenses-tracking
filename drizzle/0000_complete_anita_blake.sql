CREATE TABLE IF NOT EXISTS "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" varchar(256),
	"amount" numeric(12, 2)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user-idx" ON "expenses" USING btree ("user_id");