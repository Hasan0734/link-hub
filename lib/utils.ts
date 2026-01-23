import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { adjustHue, parseToRgb, rgbToColorString } from 'polished'

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


export const findScrollContainer = (el: any): Element => {
  if (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth) {
    return el;
  } else if (el.parentElement) {
    return findScrollContainer(el.parentElement);
  } else {
    return document.scrollingElement || document.documentElement;
  }
};


/**
 * Returns a gradient equivalent color
 * adjusts hue and lightens the original color
 * accepts a color string
 */


const MIN_LIGHTNESS = 10
const MAX_LIGHTNESS = 60
const HUE_ROTATION = -32

function lightenColor(color: string): string {
  const asRgb = parseToRgb(color)

  const minColor = Math.min(...(Object.values(asRgb) as number[]))
  const maxColor = Math.max(...(Object.values(asRgb) as number[]))

  // For light input we should pick return a darker color
  const isVeryLight = minColor > 200 && maxColor > 200
  const darkenAmount = 100

  if (isVeryLight) {
    // build object with all the values reduced by the darken amount
    const newColor = Object.entries(asRgb).reduce(
      (acc, [key, value]: [string, number]) => {
        const newAmount = Math.max(value - darkenAmount, 0)
        acc[key] = newAmount
        return acc
      },
      {} as Record<string, number>
    )
    // @ts-expect-error: UIU-860 temp ignore TS Error [TS2345]
    return rgbToColorString(newColor)
  }

  // figure out how much to lighten by
  const targetRange = MAX_LIGHTNESS - MIN_LIGHTNESS
  const range = maxColor - minColor
  const lightenAmount = MIN_LIGHTNESS + Math.floor(MAX_LIGHTNESS - (range / 255) * targetRange)

  // build object with all the values increased by the lighten amount
  const newColor = Object.entries(asRgb).reduce(
    (acc, [key, value]: [string, number]) => {
      const newAmount = Math.min(value + lightenAmount, 255)
      acc[key] = newAmount
      return acc
    },
    {} as Record<string, number>
  )
// @ts-expect-error: UIU-860 temp ignore TS Error [TS2345]
  return rgbToColorString(newColor)
}

export function gradientEquivalent(color: string): string {
  if (!color) return color
  const rotatedHue = adjustHue(HUE_ROTATION, color)
  const lightened = lightenColor(rotatedHue)
  return lightened
}

