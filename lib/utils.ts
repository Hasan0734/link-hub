import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUiniqueId = () => {
  return uuidv4();
};

export function requireRole(userRole: string, roles: string[] = []) {
  if (!userRole) throw new Error("Unauthorized");
  if (!roles.includes(userRole)) throw new Error("Forbidden");
}
