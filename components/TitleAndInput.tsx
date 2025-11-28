import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface PropsType {
  value?: string;
  title: string;
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  defaultValue?: string;
}

const TitleAndInput = ({ value, title, id, ...props }: PropsType) => {
  return (
    <div className="space-y-2">
      {title && <Label htmlFor={id}>{title}</Label>}
      <Input  id={id} {...props} />
    </div>
  );
};

export default TitleAndInput;
