export type UserTypes = {
  name: string;
  email: string;
  emailVerified: boolean;
  id: string;
  image?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type ProfileDataType = {
  name: string | null;
  bio: string | null;
  username: string | null;
  avatarUrl: string | null;
  themeId: string | null;
  id: string;
  createdAt: Date | null;
};

export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias: string | null;
  clicks: number | null;
  password: string | null;
  expiresAt: Date | null;
  createdAt: Date;
}

export interface PageData {
  id: string;
  userId: string;
  title: string;
  slug: string;
  isPublic: boolean;
  customDomain: string | null;
  displayOrder: number | null;
  themeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkData {
  id: string;
  userId: string;
  title: string;
  url: string;
  icon: string | null;
  displayOrder: number;
  color: string | null;
  isActive: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeTypes {
  id: string;
  title: string;
  featureFlag: string | null;
  visibility: string;
  defaultFont: string;
  editable: boolean;
  category: string;
  assetUrlWebp: string;
  assetUrl: string;
  baseThemeVisibility: string;
  thumbnailUrl: string;
  isBaseThemePro: string;
  __typename: string
}