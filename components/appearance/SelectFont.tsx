"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Switch } from "../ui/switch";
import ProButton from "./ProButton";
import data from "@/data/design.json";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

const SelectFont = () => {
  const [isToggle, setToggle] = useState(false);
  const [selectedFont, setSelectedFont] = useState({
    title: "Epilogue",
    id: "epilogue",
  });

  return (
    <div className="space-y-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            size={"lg"}
            className="h-12 cursor-pointer rounded-2xl w-full flex items-center justify-between"
          >
            <span> Title Font</span>
            <div className="flex items-center gap-2">
              {selectedFont.title} <ChevronRight />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Title Font</DialogTitle>
          </DialogHeader>
          <Button
            variant={"outline"}
            size={"lg"}
            className="h-12 group cursor-pointer rounded-2xl w-full flex items-center justify-between"
          >
            <span>Customize title font</span>
            <div className="flex items-center gap-2">
              <ProButton className="inline-flex! relative top-0 right-0" />
              <Switch
                checked={isToggle}
                onCheckedChange={(val) => setToggle(val)}
              />
            </div>
          </Button>
          <ScrollArea
            className={cn("max-h-0 opacity-0", {
              "max-h-[500px] opacity-100": isToggle,
            })}
          >
            <div className={cn("space-y-3 pr-4")}>
              <h3 className="text-lg font-medium">Suggested</h3>
              <div className="grid grid-cols-2 gap-3 ">
                {data.data.appearanceOptions.heading.fonts.suggested.map(
                  (font) => (
                    <Button
                      key={font.id}
                      onClick={() => setSelectedFont(font)}
                      className={cn(
                        "w-full rounded-2xl h-12 cursor-pointer bg-secondary/80",
                        {
                          "ring-2 ring-primary bg-secondary":
                            selectedFont.id === font.id,
                        },
                      )}
                      variant={"secondary"}
                      size={"lg"}
                    >
                      <img src={font.assetUrl} alt={font.title} />
                    </Button>
                  ),
                )}
              </div>
            </div>
            <div className={cn("space-y-3 mt-4 pl-2 pr-4")}>
              <h3 className="text-lg font-medium">Others</h3>
              <div className="grid grid-cols-2 gap-3 ">
                {data.data.appearanceOptions.heading.fonts.other.map((font) => (
                  <Button
                    key={font.id}
                    onClick={() => setSelectedFont(font)}
                    className={cn(
                      "w-full rounded-2xl h-12 cursor-pointer bg-secondary/80",
                      {
                        "ring-2 ring-primary bg-secondary":
                          selectedFont.id === font.id,
                      },
                    )}
                    variant={"secondary"}
                    size={"lg"}
                  >
                    <img src={font.assetUrl} alt={font.title} />
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectFont;
