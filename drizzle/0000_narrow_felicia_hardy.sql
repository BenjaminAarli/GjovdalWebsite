CREATE TABLE "ticket" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" integer,
	"ticket_days" integer DEFAULT 1,
	"is_demo" boolean DEFAULT true NOT NULL,
	"price" integer DEFAULT 200 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"age" integer
);
