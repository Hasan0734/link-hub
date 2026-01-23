import { cn } from "@/lib/utils";
import React from "react";

interface WallpaperProps {
  selectedStyle?: string;
  id?: string;
  background?: string;
  isBlur?: boolean;
  title: string;
  handleSelect: () => void;
}

const WallpaperCard = ({
  selectedStyle,
  id,
  background,
  isBlur,
  title,
  handleSelect,
}: WallpaperProps) => {


    
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
        // style={{ backgroundColor: isBlur ? background : undefined }}
          style={{
            backgroundImage: 'linear-gradient(0deg, #F60000, rgb(0 0 0/50%))',
          }}
      >
        {isBlur && (
          <div className="relative h-full w-full overflow-hidden ">
            <div
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              style={{
                backgroundColor: background,
              }}
            ></div>
            <div
              className="absolute inset-0 h-full w-full scale-110 bg-cover bg-center bg-no-repeat opacity-25 blur-[10px]"
              aria-hidden="true"
              style={{
                backgroundImage: `url("https://ugc.production.linktr.ee/3536b179-70d3-4006-b10f-03f440820e1b_Hadi-02.jpeg")`,
              }}
            ></div>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-center">{title}</p>
      </div>
    </div>
  );
};

export default WallpaperCard;
