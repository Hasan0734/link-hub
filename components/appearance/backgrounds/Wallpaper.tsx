import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, gradientEquivalent } from "@/lib/utils";
import WallpaperCard from "./WallpaperCard";
import { useState } from "react";
import TitleColorPicker from "../TitleColorPicker";
import { Separator } from "../../ui/separator";
import SelectorButton from "../SelectorButton";
import { ArrowDown, ArrowUp, WallpaperIcon } from "lucide-react";
import { IconCircleDot } from "@tabler/icons-react";
import Gradient from "./Gradient";
import { ProfileNoise } from "../ProfileNoise";
import { Switch } from "@/components/ui/switch";
import data from "@/data/design.json";

const Wallpaper = () => {
  const [selectedStyle, setSelectedStyle] = useState("FILL");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [direction, setDirection] = useState("colordown");
  const [backgroundNoise, setBackgroundNoise] = useState(false);
  const [gradientStyle, setGradientStyle] = useState("custom");
  const [selectedGradient, setSelectedGradient] = useState({
    id: "",
    assetUrlWebp: "",
  });

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

  const isGradient = true;

  console.log(data.data.appearanceOptions);
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

              <Gradient
                gradient={
                  isGradient
                    ? {
                        backgroundGradient: [
                          selectedColor,
                          gradientEquivalent(selectedColor),
                        ],
                        gradientAssetUrl: selectedGradient?.assetUrlWebp || "",
                        direction: direction,
                      }
                    : undefined
                }
                backgroundNoise={backgroundNoise}
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
            {backgroundNoise && <ProfileNoise />}
          </div>
          <Separator />

          {selectedStyle === "GRADIENT" && (
            <div className="space-y-3">
              <h4 className="text-base font-medium">Gradient style</h4>
              <div className="grid grid-cols-2 gap-3 ">
                <SelectorButton
                  btnTitle="Custom"
                  state={gradientStyle}
                  handleState={setGradientStyle}
                  keyValue="custom"
                />
                <SelectorButton
                  btnTitle="Pre-made"
                  state={gradientStyle}
                  handleState={setGradientStyle}
                  keyValue="pre-made"
                />
              </div>
            </div>
          )}

          {gradientStyle !== "pre-made" && (
            <div className="space-y-3">
              <h4 className="text-base font-medium">Color</h4>
              <div className="flex items-center gap-2">
                {/* <TitleColorPicker title="Color" /> */}

                {colors.map((color) => (
                  <button
                    key={color}
                    className={cn("size-7 rounded-full border", {
                      "border-2 border-primary": selectedColor === color,
                    })}
                    onClick={() => {
                      setSelectedColor(color);
                      console.log(gradientEquivalent(color));
                      console.log(color);
                    }}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          )}
          {gradientStyle === "pre-made" && (
            <div className="space-y-3">
              <h4 className="text-base font-medium">Select gradient</h4>
              <div className="flex items-center gap-2">
                {/* <TitleColorPicker title="Color" /> */}

                {data.data.appearanceOptions.gradients.map((option) => (
                  <button
                    key={option.id}
                    className={cn(
                      "size-7 rounded-full border overflow-hidden ",
                      {
                        "border-2 border-primary":
                          selectedGradient?.id === option.id,
                      },
                    )}
                    onClick={() => {
                      setSelectedGradient(option);
                    }}
                  >
                    <img
                      className="h-full w-full object-fill"
                      src={option.assetUrlWebp}
                      alt={option.title}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedStyle === "GRADIENT" && (
            <div className="space-y-3 ">
              <h4 className="text-base font-medium">Direction</h4>
              <div className="grid grid-cols-3 gap-3">
                <SelectorButton
                  IconComponent={ArrowUp}
                  title="Up"
                  state={direction}
                  handleState={setDirection}
                  keyValue="colorup"
                />
                <SelectorButton
                  title="Down"
                  IconComponent={ArrowDown}
                  state={direction}
                  handleState={setDirection}
                  keyValue="colordown"
                />
                <SelectorButton
                  title="Radial"
                  IconComponent={IconCircleDot}
                  state={direction}
                  handleState={setDirection}
                  keyValue="gradientradial"
                />
              </div>

              <div className="h-12 text-sm border border-primary/20 shadow-xs dark:bg-input/30 px-3 group cursor-pointer rounded-2xl w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <WallpaperIcon />
                  <span>Noise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={backgroundNoise}
                    onCheckedChange={(val) => setBackgroundNoise(val)}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallpaper;
