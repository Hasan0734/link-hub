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
  customAlias: string;
  clicks: number;
  password: string | null;
  expiresAt: string | null;
  createdAt: string;
}