import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import WallpaperCard from "./WallpaperCard";
import { useState } from "react";
import TitleColorPicker from "./TitleColorPicker";
import { Separator } from "../ui/separator";
import SelectorButton from "./SelectorButton";
import { ArrowDown, ArrowUp } from "lucide-react";
import { IconCircleDot } from "@tabler/icons-react";

const Wallpaper = () => {
  const [selectedStyle, setSelectedStyle] = useState("FILL");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [direction, setDirection] = useState("UP");

  const colors = [
    "#ffffff",
    "#000000",
    "#F60000",
    "#FF8C00",
    "#FFEE00",
    "#4DE94C",
    "#3783FF",
    "#4815AA",
  ];
  return (
    <div id="wallpaper">
      <Card className="shadow-none border-0 -space-y-3">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Wallpaper</CardTitle>
        </CardHeader>

        <CardContent className="px-0 space-y-6">
          <div className="space-y-3">
            <h4 className="text-base font-medium">Wallpaper style</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-2">
              <WallpaperCard
                selectedStyle={selectedStyle}
                id="FILL"
                title="Fill"
                background={selectedColor}
                handleSelect={() => setSelectedStyle("FILL")}
              />
              <WallpaperCard
                selectedStyle={selectedStyle}
                id="GRADIENT"
                title="Gradient"
                background={selectedColor}
                handleSelect={() => setSelectedStyle("GRADIENT")}
              />
              <WallpaperCard
                selectedStyle={selectedStyle}
                id="BLUR"
                title={"Blur"}
                background={selectedColor}
                handleSelect={() => setSelectedStyle("BLUR")}
                isBlur
              />
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            {/* <TitleColorPicker title="Color" /> */}

            {colors.map((color) => (
              <button
                key={color}
                className={cn("size-7 rounded-full border", {
                  "border-2 border-primary": selectedColor === color,
                })}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-medium">Direction</h4>
            <div className="grid grid-cols-3 gap-3">
              <SelectorButton
                IconComponent={ArrowUp}
                title="Up"
                state={direction}
                handleState={setDirection}
                keyValue="UP"
              />
              <SelectorButton
                title="Down"
                IconComponent={ArrowDown}
                state={direction}
                handleState={setDirection}
                keyValue="DOWN"
              />
              <SelectorButton
                title="Radial"
                IconComponent={IconCircleDot}
                state={direction}
                handleState={setDirection}
                keyValue="RADIAL"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallpaper;
