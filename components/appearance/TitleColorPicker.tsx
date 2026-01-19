import React from "react";
import { Label } from "../ui/label";
import ColorPicker2 from "../ui/color-picker2";

const TitleColorPicker = ({title}:{title:string}) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="titleColor" className="text-base font-medium">
        {title}
      </Label>
      <ColorPicker2
        className="w-full h-12 rounded-2xl"
        color={"#ffffff"}
        onChange={(newColor) => {
          console.log(newColor);
        }}
      />
    </div>
  );
};

export default TitleColorPicker;
