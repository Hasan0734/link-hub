import React from "react";
import {
  Globe,
  Plus,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Github,
  Mail,
  Send,
} from "lucide-react";
import { Label } from "./ui/label";
const icons = [
  { name: "globe", icon: Globe },
  { name: "instagram", icon: Instagram },
  { name: "twitter", icon: Twitter },
  { name: "facebook", icon: Facebook },
  { name: "youtube", icon: Youtube },
  { name: "linkedin", icon: Linkedin },
  { name: "github", icon: Github },
  { name: "send", icon: Send },
];

interface SelectIconProps {
  [key: string]: any;
}

const SelectIcon = ({ form }: SelectIconProps) => {
  console.log(form.getValues("icon"));
  return (
    <div className="space-y-2">
      <Label htmlFor="icon">Select icon</Label>
      <div className="grid grid-cols-4 gap-3">
        {icons.map((iconOption) => {
          const IconComponent = iconOption.icon;
          return (
            <button
              key={iconOption.name}
              type="button"
              className={`p-4 rounded-xl border-2 transition-all hover:border-primary               ${
                form.watch("icon") === iconOption.name
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
              onClick={() => {
                form.setValue("icon", iconOption.name);
              }}
              // onClick={() => setSelectedIcon(iconOption.name)}
            >
              <IconComponent className="w-6 h-6 mx-auto" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectIcon;
