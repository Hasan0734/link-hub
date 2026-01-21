"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight, Pencil, Plus, UserCircle } from "lucide-react";
import { IconUserScan } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import SelectorButton from "./SelectorButton";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import SelectFont from "./SelectFont";
import TitleColorPicker from "./TitleColorPicker";
import TextSize from "./TextSize";

const DesignHeader = () => {
  const [layout, setLayout] = useState("classic");
  const [titleStyle, setTitleStyle] = useState("text");

  const handleState = (state: string) => {};

  return (
    <div id={"header"} >
      <Card className="shadow-none border-0 py-0">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <div className="flex flex-row items-center justify-start gap-x-6">
            <div className="hover-ring h-24 w-24 shrink-0 overflow-hidden rounded-full bg-neutral-200">
              <button
                type="button"
                className="relative h-full w-full"
                aria-label="Change profile picture"
              >
                <img
                  src="https://ugc.production.linktr.ee/3536b179-70d3-4006-b10f-03f440820e1b_Hadi-02.jpeg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </button>
            </div>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg py-2.5 pl-3.5 pr-5 transition-colors focus-visible:outline-none focus-visible:ring-1 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 border border-primary bg-transparent hover:bg-background-secondary md:hover:bg-background-primary"
            >
              <Pencil size={20} />
              <span className="text-body-sm font-medium">Edit</span>
            </button>
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-medium">Profile image layout</h4>
            <div className="flex items-center gap-4">
              <SelectorButton
                IconComponent={UserCircle}
                state={layout}
                handleState={setLayout}
                keyValue={"classic"}
                title="Classic"
              />
              <SelectorButton
                IconComponent={IconUserScan}
                state={layout}
                handleState={setLayout}
                isPro
                keyValue={"hero"}
                title="Hero"
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-base font-medium">Title Style</h4>
            <div className="flex items-center gap-4">
              <SelectorButton
                IconComponent={UserCircle}
                state={titleStyle}
                handleState={setTitleStyle}
                keyValue={"text"}
                title="Text"
              />
              <SelectorButton
                IconComponent={IconUserScan}
                state={titleStyle}
                handleState={setTitleStyle}
                isPro
                keyValue={"logo"}
                title="Logo"
              />
            </div>

            <div
              className={cn(
                "border border-dashed border-primary  transition hover:bg-accent relative flex flex-col justify-between flex-1  w-full rounded-lg h-0 min-h-0 invisible  duration-500 opacity-30",
                {
                  "visible h-auto min-h-40 py-8 opacity-100":
                    "logo" === titleStyle,
                },
              )}
            >
              <label className="flex flex-col items-center justify-center w-full h-full z-10">
                <div className="flex h-full w-full flex-col items-center gap-3">
                  <Plus size={30} />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="hidden text-body-sm text-primary md:block">
                      Drag and drop or choose logo to upload
                    </p>
                    <p className="text-body-sm text-primary md:hidden">
                      Upload logo
                    </p>
                    <p className="text-xs text-mute">SVG or PNG</p>
                  </div>
                </div>
                <input
                  className="w-full h-full absolute top-0 right-0 bottom-0 left-0 opacity-0 cursor-pointer"
                  name="ugc-kit-file-upload"
                  type="file"
                  accept="image/svg+xml, image/png"
                />
              </label>
            </div>
          </div>

          <TextSize />
          <div className="space-y-3">
            <Label htmlFor="text" className="text-base font-medium">
              Text
            </Label>
            <Input
              onChange={(e) => console.log(e.target.value)}
              className="h-12 rounded-2xl focus-visible:ring-1"
              value={"jahid0734"}
              id="text"
              name="text"
              type="text"
            />
          </div>
          <SelectFont title="Title Font" />
          <TitleColorPicker title="Title Color" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignHeader;
