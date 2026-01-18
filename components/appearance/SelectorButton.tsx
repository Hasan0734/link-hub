import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ProButton from "./ProButton";

interface SelectorButtonProps {
  IconComponent?: React.ElementType;
  state: string;
  handleState: (state:string) => void;
  isPro?: boolean;
  keyValue: string;
  title?: string;
  btnTitle?: string;
}

const SelectorButton = ({
  IconComponent,
  state,
  handleState,
  isPro,
  keyValue,
  title,
  btnTitle,
}: SelectorButtonProps) => {
  return (
    <div className="w-full text-center space-y-1 ">
      <div className="relative group">
        {isPro && (
          <ProButton/>
        )}
        <Button
          onClick={() => handleState(keyValue)}
          className={cn("w-full rounded-2xl h-12 ", {
            "bg-accent dark:bg-input": state === keyValue,
          })}
          variant={ "outline"}
          size={"lg"}
        >
          {IconComponent && <IconComponent className="size-6" />}
          {btnTitle}
        </Button>
      </div>
      {title && <span className="text-base">{title}</span>}
    </div>
  );
};

export default SelectorButton;
