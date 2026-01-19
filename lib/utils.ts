import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function requireRole(userRole: string, roles: string[] = []) {
  if (!userRole) throw new Error("Unauthorized");
  if (!roles.includes(userRole)) throw new Error("Forbidden");
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}



//  window.linktreeFederationHostEnv = {
//                 MESH_ENDPOINT: 'https://graph.linktr.ee/graphql',
//                 LINK_TYPES_ASSETS_ENDPOINT: 'https://link-types-assets.production.linktr.ee',
//                 LINK_TYPES_API_HOST: 'https://link-types.production.linktr.ee',
//                 INTEGRATIONS_API_HOST: 'https://integrations.production.linktr.ee',
//                 MONOLITH_API_ENDPOINT: 'https://linktr.ee/api',
//                 INGRESS_API_ENDPOINT: 'https://ingress.linktr.ee/uLZfGRmpj7',
//                 STATSIG_EDITOR_CLIENT_API_KEY: 'client-zvVFbtjWW5zrIxsTgCjbMGOJREJrzoEI7dEHQLjoF42',
//                 AMPLITUDE_CLIENT_API_KEY: '1b48997a7049f3fff0cecf24099c0365',
//                 GOLDEN_AMPLITUDE_CLIENT_API_KEY: '99681b5b192c190d708c1e659ff741a7',
//                 INTERCOM_APP_ID: 'ruf6zij9',
//                 STAGE: 'production',
//                 STATSIG_CLIENT_API_KEY: 'client-7nmJB4FYdJqQfd3wxl3BFpMGitwlSj7Pz9iuzdXarXu',
//                 STRIPE_PUBLISHABLE_KEY: 'pk_live_Le7CIKy9FHGbXVplQBQGiMxN'
//             };



//  "environment": {
//                             "INGRESS_API_ENDPOINT": "https://ingress.linktr.ee/uLZfGRmpj7",
//                             "INGRESS_API_INSTRUMENTATION_ENDPOINT": "https://ingress.linktr.ee/i/uLZfGRmpj7",
//                             "LINK_TYPES_ASSETS_ENDPOINT": "https://link-types-assets.production.linktr.ee",
//                             "STRIPE_PAYMENTS_API_ENDPOINT": "https://stripe-payments.linktr.ee",
//                             "STRIPE_PUBLISHABLE_KEY": "pk_live_51IdFBuL9SYJKPuFO2CTt5Wrpw46qcwd1ZjWC4MLOYi1aUXIfhfRbK7EkDJgMVQVaTcOceuPpCEnkv0g7J6TgkNdD00TD9bsb4o",
//                             "STRIPE_PAYMENTS_PUBLISHABLE_KEY": "pk_live_51Oi0EUGvyzkgvy9S2SEkE4iyCqW6a9LFlqPgVqaz40N03QLLh6wKjOKLzGB0sDciohZzzTYNd07GRfhtySne076D00RGhZNo0d",
//                             "PAYPAL_PAYMENTS_API_ENDPOINT": "https://paypal-payments.linktr.ee",
//                             "PAYPAL_PAYMENTS_CLIENT_ID": "ATsU006_NqnC_Jk_W49YoQSnMh9kDXgMY_IVkUhJbutOkhQ7F8wlTWoJHyi2GteXaczfOGu22BSdWopq",
//                             "SHOPIFY_INTEGRATIONS_API_ENDPOINT": "https://shopify-integrations.linktr.ee",
//                             "META_IMAGE_URL": "https://assets.production.linktr.ee/profiles/_next/static/logo-assets/default-meta-image.png",
//                             "RECAPTCHA_SITE_KEY": "6LdGYT4cAAAAANW9oE1Sa2AxBi8b9ZAbmvYBPnZm",
//                             "RECAPTCHA_SITE_KEY_INVISIBLE": "6LcGlm0dAAAAAMfsVsJl3MZtjI-cKhBYzq5RPEo4",
//                             "GRAPHQL_API_ENDPOINT": "https://graph.linktr.ee/graphql",
//                             "GRAPHQL_API_CLIENT_NAME": "profiles",
//                             "GRAPHQL_API_CLIENT_VERSION": "1.0.0",
//                             "BASE_PROFILE_URL": "https://linktr.ee",
//                             "CDN_DISTRIBUTION_URL": "https://assets.production.linktr.ee/profiles/",
//                             "LTAUTH_ENDPOINT": "https://public.ltauth.production.linktr.ee",
//                             "CHAT_SERVICE_API_KEY": "rvs79kmnjdrs"
//                         },