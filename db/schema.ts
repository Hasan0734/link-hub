import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/* ---------------- ENUMS ---------------- */

export const statusEnum = pgEnum("status", ["active", "cancelled", "expired"]);
export const periodEnum = pgEnum("period", ["monthly", "yearly"]);
export const themeTypesEnum = pgEnum("themeTypes", [
  "light",
  "dark",
  "colorful",
]);
export const roleEnum = pgEnum("role", ["admin", "user"]);

/* ---------------- USERS ---------------- */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").default("user").notNull(),

  createdAt: timestamp("created_At").defaultNow().notNull(),
  updatedAt: timestamp("updated_At")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* ---------------- THEMES ---------------- */

export const themes = pgTable("themes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  type: themeTypesEnum("type").notNull(),
  background: varchar("background"),
  primary: varchar("primary", { length: 20 }),
  textColor: varchar("text_color", { length: 20 }),
});

/* ---------------- PROFILES (USER PAGE) ---------------- */

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  themeId: uuid("theme_id").references(() => themes.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- LINKS INSIDE PROFILE ---------------- */

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  icon: varchar("icon", { length: 50 }),
  displayOrder: integer("display_order").default(0).notNull(),
  color: varchar("color", { length: 20 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_At").defaultNow().notNull(),
  updatedAt: timestamp("updated_At")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* ---------------- PAGES ---------------- */

export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  title: varchar("title", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),

  customDomain: varchar("custom_domain", { length: 120 }),

  themeId: uuid("theme_id").references(() => themes.id, {
    onDelete: "set null",
  }),

  isPublic: boolean("is_public").default(true),
  displayOrder: integer("display_order").default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* ---------------- PAGE VISITS ---------------- */

export const pageVisits = pgTable("page_visits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  ip: varchar("ip", { length: 100 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_At").defaultNow().notNull(),
});

/* ---------------- LINK CLICKS ---------------- */

export const linkClicks = pgTable("link_clicks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  linkId: uuid("link_id")
    .references(() => links.id, { onDelete: "cascade" })
    .notNull(),
  ip: varchar("ip", { length: 100 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_At").defaultNow().notNull(),
});

/* ---------------- SHORT LINKS ---------------- */

export const shortLinks = pgTable("short_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  originalUrl: text("original_url").notNull(),
  shortCode: varchar("short_code", { length: 20 }).unique().notNull(),
  customAlias: varchar("custom_alias", { length: 50 }).unique(),
  password: varchar("password", { length: 255 }),
  clicks: integer("clicks").default(0),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ---------------- SHORT LINK VISITS ---------------- */

export const shortLinkVisits = pgTable("short_link_visits", {
  id: uuid("id").defaultRandom().primaryKey(),
  shortLinkId: uuid("short_link_id")
    .references(() => shortLinks.id, { onDelete: "cascade" })
    .notNull(),
  ip: varchar("ip", { length: 100 }),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ---------------- PLANS (PAID SUBSCRIPTIONS) ---------------- */

export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 30 }).notNull(),
  priceMonthly: integer("price_monthly").default(0),
  priceYearly: integer("price_yearly").default(0),

  maxPages: integer("max_pages").default(1),
  maxLinksPerPage: integer("max_links_per_page").default(10),
  maxShortUrls: integer("max_short_urls").default(0),
  customDomains: integer("custom_domains").default(0),
  analyticsAccess: boolean("analytics_access").default(false),

  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- USER SUBSCRIPTIONS ---------------- */

export const userSubscriptions = pgTable("user_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  planId: uuid("plan_id")
    .notNull()
    .references(() => plans.id, { onDelete: "cascade" }),

  status: statusEnum("status").notNull(), // FIXED
  period: periodEnum("period").notNull(), // FIXED

  currentPeriodStart: timestamp("period_start").defaultNow(),
  currentPeriodEnd: timestamp("period_end").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- USAGE LIMITS ---------------- */

export const usageLimits = pgTable("usage_limits", {
  id: serial("id").primaryKey(),

  userId: uuid("user_id") // FIXED
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  pagesUsed: integer("pages_used").default(0),
  shortUrlsUsed: integer("short_urls_used").default(0),
  linksUsed: integer("links_used").default(0),

  resetAt: timestamp("reset_at").defaultNow(),
});
