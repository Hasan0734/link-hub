import { relations } from "drizzle-orm";
import {
  session,
  account,
  user,
  profiles,
  themes,
  pages,
  userSubscriptions,
  pageVisits,
  shortLinks,
  linkClicks,
  verification,
  links, // ADDED
  pageTabs, // ADDED
  shortLinkVisits, // ADDED
  plans, // ADDED
  usageLimits, // ADDED
} from "./schema";

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  profiles: one(profiles),
  themes: many(themes),
  pages: many(pages),
  links: many(links), // ADDED relation for links
  subscriptions: many(userSubscriptions),
  pageVisits: many(pageVisits),
  shortLinks: many(shortLinks),
  linkClicks: many(linkClicks),
  verifications: many(verification),
  usageLimits: one(usageLimits), // ADDED
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));


export const profilesRelations= relations(profiles, ({one}) => ({
    user:one(user, {
        fields: [profiles.userId],
        references: [user.id],
    }),
    theme:one(themes, {
        fields: [profiles.themeId],
        references: [themes.id],
    })
}))

export const themesRelations = relations(themes, ({ one, many }) => ({
  // Note: Your themes table doesn't have a userId column, so this relationship won't work
  // user: one(user, {
  //   fields: [themes.userId],
  //   references: [user.id],
  // }),
  profiles: many(profiles), // ADDED reverse relation
  pages: many(pages),
  pageTabs: many(pageTabs), // Corrected spelling/casing for consistency
}));


export const pagesRelations = relations(pages, ({ one, many }) => ({
  user: one(user, {
    fields: [pages.userId],
    references: [user.id],
  }),
  theme: one(themes, {
    fields: [pages.themeId],
    references: [themes.id],
  }),
  pageTabs: many(pageTabs), // ADDED relation to the new table
}));

export const pageTabsRelations = relations(pageTabs, ({ one }) => ({
  page: one(pages, { // ADDED relation to the page table
    fields: [pageTabs.pageId],
    references: [pages.id],
  }),
  theme: one(themes, {
    fields: [pageTabs.themeId],
    references: [themes.id],
  }),
}));


export const linksRelations = relations(links, ({ one, many }) => ({
  user: one(user, {
    fields: [links.userId],
    references: [user.id],
  }),
  clicks: many(linkClicks),
}));

export const shortLinksRelations = relations(shortLinks, ({ one, many }) => ({
  user: one(user, {
    fields: [shortLinks.userId],
    references: [user.id],
  }),
  visits: many(shortLinkVisits),
  clicks: many(linkClicks),
}));

export const linkClicksRelations = relations(linkClicks, ({ one }) => ({
  user: one(user, {
    fields: [linkClicks.userId],
    references: [user.id],
  }),
  link: one(links, { // Corrected from shortLink to link, assuming linkId refers to the links table
    fields: [linkClicks.linkId],
    references: [links.id],
  }),
  // If linkClicks also tracks shortLinks, you'd need another foreign key in the linkClicks table
}));

export const shortLinkVisitsRelations = relations(shortLinkVisits, ({ one }) => ({
  shortLink: one(shortLinks, {
    fields: [shortLinkVisits.shortLinkId],
    references: [shortLinks.id],
  }),
}));


export const plansRelations = relations(plans, ({ many }) => ({
    subscriptions: many(userSubscriptions),
}))

export const userSubscriptionsRelations = relations(userSubscriptions, ({ one }) => ({
  user: one(user, {
    fields: [userSubscriptions.userId],
    references: [user.id],
  }),
  plan: one(plans, {
    fields: [userSubscriptions.planId],
    references: [plans.id],
  }),
}));

export const pageVisitsRelations = relations(pageVisits, ({ one }) => ({
  user: one(user, {
    fields: [pageVisits.userId],
    references: [user.id],
  }),
}));

export const usageLimitsRelations = relations(usageLimits, ({ one }) => ({
  user: one(user, {
    fields: [usageLimits.userId],
    references: [user.id],
  }),
}));