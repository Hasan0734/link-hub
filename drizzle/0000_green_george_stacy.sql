CREATE TYPE "public"."period" AS ENUM('monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'cancelled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."themeTypes" AS ENUM('light', 'dark', 'colorful');--> statement-breakpoint
CREATE TABLE "link_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"link_id" uuid NOT NULL,
	"ip" varchar(100),
	"user_agent" text,
	"created_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"icon" varchar(50),
	"display_order" integer DEFAULT 0 NOT NULL,
	"color" varchar(20),
	"is_active" boolean DEFAULT true,
	"created_At" timestamp DEFAULT now() NOT NULL,
	"updated_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ip" varchar(100),
	"user_agent" text,
	"created_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(100) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"custom_domain" varchar(120),
	"theme_id" uuid,
	"is_public" boolean DEFAULT true,
	"display_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(30) NOT NULL,
	"price_monthly" integer DEFAULT 0,
	"price_yearly" integer DEFAULT 0,
	"max_pages" integer DEFAULT 1,
	"max_links_per_page" integer DEFAULT 10,
	"max_short_urls" integer DEFAULT 0,
	"custom_domains" integer DEFAULT 0,
	"analytics_access" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"username" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"bio" text,
	"avatar_url" text,
	"theme_id" uuid,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "short_link_visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_link_id" uuid NOT NULL,
	"ip" varchar(100),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "short_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"original_url" text NOT NULL,
	"short_code" varchar(20) NOT NULL,
	"custom_alias" varchar(50),
	"password" varchar(255),
	"clicks" integer DEFAULT 0,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "short_links_short_code_unique" UNIQUE("short_code"),
	CONSTRAINT "short_links_custom_alias_unique" UNIQUE("custom_alias")
);
--> statement-breakpoint
CREATE TABLE "themes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"type" "themeTypes" NOT NULL,
	"background" varchar,
	"primary" varchar(20),
	"text_color" varchar(20),
	CONSTRAINT "themes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "usage_limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"pages_used" integer DEFAULT 0,
	"short_urls_used" integer DEFAULT 0,
	"links_used" integer DEFAULT 0,
	"reset_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"status" "status" NOT NULL,
	"period" "period" NOT NULL,
	"period_start" timestamp DEFAULT now(),
	"period_end" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_At" timestamp DEFAULT now() NOT NULL,
	"updated_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_visits" ADD CONSTRAINT "page_visits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "short_link_visits" ADD CONSTRAINT "short_link_visits_short_link_id_short_links_id_fk" FOREIGN KEY ("short_link_id") REFERENCES "public"."short_links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "short_links" ADD CONSTRAINT "short_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage_limits" ADD CONSTRAINT "usage_limits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;