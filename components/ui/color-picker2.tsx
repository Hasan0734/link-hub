"use client"

import React, { useEffect, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/* =========================
   Color Utils (HEX <-> HSL)
========================= */

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100
  l /= 100

  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  return (
    "#" +
    [f(0), f(8), f(4)]
      .map(x => Math.round(x * 255).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  )
}

const hexToHsl = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    switch (max) {
      case r:
        h = ((g - b) / d) % 6
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h *= 60
    if (h < 0) h += 360
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}

const isValidHex = (value: string) =>
  /^#[0-9A-Fa-f]{6}$/.test(value)

/* =========================
   Component
========================= */

export function ColorPicker2({
  color,
  onChange,
  className
}: {
  color: string
  onChange: (hex: string) => void;
  className?: string;
}) {
  const [hsl, setHsl] = useState<[number, number, number]>([0, 100, 50])
  const [input, setInput] = useState(color.toUpperCase())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isValidHex(color)) return
    setInput(color.toUpperCase())
    setHsl(hexToHsl(color))
  }, [color])

  const updateFromHsl = (next: [number, number, number]) => {
    setHsl(next)
    const hex = hslToHex(...next)
    setInput(hex)
    onChange(hex)
  }

  const handleSLChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const s = Math.min(100, Math.max(0, (e.clientX - rect.left) / rect.width * 100))
    const l = Math.min(100, Math.max(0, 100 - (e.clientY - rect.top) / rect.height * 100))
    updateFromHsl([hsl[0], Math.round(s), Math.round(l)])
  }

  const handleHueChange = (h: number) => {
    updateFromHsl([h, hsl[1], hsl[2]])
  }

  const handleInputChange = (v: string) => {
    setInput(v)
    if (isValidHex(v)) {
      onChange(v.toUpperCase())
      setHsl(hexToHsl(v))
    }
  }

  const presets = [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#4CD964",
    "#5AC8FA",
    "#007AFF",
    "#5856D6",
    "#FF2D55",
    "#8E8E93",
    "#D1D1D6",
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-[210px] justify-between", className)}>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ background: input }} />
            <span className="text-sm">{input}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[240px] p-3 space-y-3">
        {/* Saturation / Lightness */}
        <div
          className="relative h-40 rounded-lg cursor-crosshair"
          style={{
            background: `
              linear-gradient(to top, black, transparent),
              linear-gradient(to right, white, transparent),
              hsl(${hsl[0]},100%,50%)
            `,
          }}
          onClick={handleSLChange}
        >
          <div
            className="absolute w-4 h-4 rounded-full border-2 border-white"
            style={{
              left: `${hsl[1]}%`,
              top: `${100 - hsl[2]}%`,
              transform: "translate(-50%, -50%)",
              background: input,
            }}
          />
        </div>

        {/* Hue */}
        <input
          type="range"
          min={0}
          max={360}
          value={hsl[0]}
          onChange={e => handleHueChange(+e.target.value)}
          className="w-full h-3 rounded-full appearance-none"
          style={{
            background:
              "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
          }}
        />

        {/* Hex Input */}
        <div className="flex gap-2 items-center">
          <Label className="sr-only">HEX</Label>
          <Input
            value={input}
            onChange={e => handleInputChange(e.target.value.toUpperCase())}
            placeholder="#RRGGBB"
            className="h-8"
          />
          <div className="w-8 h-8 rounded-md" style={{ background: input }} />
        </div>

        {/* Presets */}
        <div className="grid grid-cols-6 gap-2">
          {presets.map(p => (
            <button
              key={p}
              className="w-8 h-8 rounded-full relative"
              style={{ background: p }}
              onClick={() => handleInputChange(p)}
            >
              {input === p && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker2
