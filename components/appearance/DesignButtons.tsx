"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import SelectorButton from "./SelectorButton";
import TitleColorPicker from "./TitleColorPicker";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import data from "@/data/design.json";

const DesignButtons = () => {
  const [selectShadow, setShadow] = useState("none");
  const [value, setValue] = useState([50]);
  const [buttonStyle, setButtonStyle] = useState("solid");

  return (
    <section id="buttons">
      <Card className="shadow-none border-0 ">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Buttons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <div className="space-y-3">
            <h4 className="text-base font-medium">Button style</h4>
            <div className="grid grid-cols-3 gap-3">
              <SelectorButton
                btnTitle="Solid"
                state={buttonStyle}
                handleState={setButtonStyle}
                keyValue="solid"
              />
              <SelectorButton
                btnTitle="Glass"
                state={buttonStyle}
                handleState={setButtonStyle}
                keyValue="glass"
              />
              <SelectorButton
                btnTitle="Outline"
                state={buttonStyle}
                handleState={setButtonStyle}
                keyValue="outline"
              />
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-20">
            <span>Corners</span>
            <div className="w-full flex items-center gap-3">
              <p className="text-xs text-muted-foreground">Square</p>
              <div className="flex w-full max-w-md flex-col gap-2 relative">
                <Slider
                  id="slider"
                  max={75}
                  min={0}
                  onValueChange={setValue}
                  step={25}
                  value={value}
                />
                {/* <div className="relative w-full flex items-center justify-between z-10">
                <span className="size-1.5 bg-primary rounded-full"></span>
                <span className="size-1.5 bg-primary rounded-full"></span>
                <span className="size-1.5 bg-primary rounded-full"></span>
                <span className="size-1.5 bg-primary rounded-full"></span>
              </div> */}
              </div>
              <p className="text-xs text-muted-foreground">Round</p>
            </div>
          </div>
          {buttonStyle == "solid" && (
            <div className="flex items-center gap-18">
              <span>Shadows</span>
              {/* {data.data.appearanceOptions.buttonShadowStyles.map((shadow) =>  <SelectorButton
              btnTitle={shadow.title}
              state={selectShadow}
              handleState={setShadow}
              keyValue={shadow.id}
            />)} */}

             <div className="flex items-center gap-3 grow">
                 <SelectorButton
                btnTitle="None"
                state={selectShadow}
                handleState={setShadow}
                keyValue="none"
              />
              <SelectorButton
                btnTitle="Subtle"
                state={selectShadow}
                handleState={setShadow}
                keyValue="subtle"
              />
              <SelectorButton
                btnTitle="Strong"
                state={selectShadow}
                handleState={setShadow}
                keyValue="strong"
              />
              <SelectorButton
                btnTitle="Hard"
                state={selectShadow}
                handleState={setShadow}
                keyValue="hard"
              />
             </div>
            </div>
          )}
          <Separator />
          <div className="space-y-3">
            <h4 className="text-base font-medium">Color</h4>
            {buttonStyle !== "glass" && (
              <TitleColorPicker title="Button color" />
            )}
            <TitleColorPicker title="Text color" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DesignButtons;
