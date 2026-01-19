"use client";
import React, { useState } from "react";
import SelectorButton from "./SelectorButton";

const TextSize = () => {
  const [size, setSize] = useState("small");

  return (
    <div className="space-y-3">
      <h4 className="text-base font-medium">Size</h4>
      <div className="flex items-center gap-4">
        <SelectorButton
          state={size}
          handleState={setSize}
          keyValue={"small"}
          btnTitle="Small"
        />
        <SelectorButton
          state={size}
          handleState={setSize}
          isPro
          keyValue={"large"}
          btnTitle="Large"
        />
      </div>
    </div>
  );
};

export default TextSize;
