import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

interface WallpaperProps {
  selectedStyle?: string;
  id?: string;
  background?: string;
  isBlur?: boolean;
  title: string;
  handleSelect: () => void;
  backgroundNoise?: boolean;
  gradient?: {
    backgroundGradient: string[];
    direction: string;
    gradientAssetUrl?: string;
  };
}

const Gradient = (props: WallpaperProps) => {
  const {
    selectedStyle,
    id,
    handleSelect,
    title,
    backgroundNoise,
    gradient: { backgroundGradient, direction, gradientAssetUrl } = {},
  } = props;

  return (
    <div className="mb-4 last:mb-0">
      <div
        onClick={handleSelect}
        className={cn(
          "mb-2 cursor-pointer block text-sm font-medium relative  aspect-4/5 rounded-2xl overflow-hidden border border-border hover:border-primary transition-all",
          {
            "border-2 border-primary": selectedStyle === id,
          },
        )}
      >
        {gradientAssetUrl ? (
          <img
            src={gradientAssetUrl}
            alt="gradient"
            className={clsx("h-full w-full", {
              "[filter:url(#noiseFilter)]": backgroundNoise,
            })}
          />
        ) : (
          <div
            className={clsx("h-full w-full before:flex", {
              "[filter:url(#noiseFilter)]": backgroundNoise,
            })}
            style={{
              background: backgroundGradient
                ? direction === "gradientradial"
                  ? `radial-gradient(${backgroundGradient.join(",")})`
                  : `linear-gradient(${direction === "colordown" ? "180deg" : "0deg"}, ${backgroundGradient.join(",")})`
                : "linear-gradient(180deg, #3d444b 0%, #686d73 100%)",
            }}
          />
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-center">{title}</p>
      </div>
      
    </div>
  );
};

export default Gradient;
