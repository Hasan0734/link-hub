import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconBrandPinterest,
  IconBrandThreads,
  IconBrandSoundcloud,
  IconLayout,
  IconMusic,
} from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
const icons = [
  { name: "globe", icon: Globe },
  { name: "instagram", icon: IconBrandInstagram },
  { name: "facebook", icon: IconBrandFacebook },
  { name: "youtube", icon: IconBrandYoutube },
  { name: "linkedin", icon: IconBrandLinkedin },
  { name: "github", icon: IconBrandGithub },
  { name: "telegram", icon: IconBrandTelegram },
  { name: "tiktok", icon: IconBrandTiktok },
  { name: "x", icon: IconBrandX },
  { name: "pinterest", icon: IconBrandPinterest },
  { name: "threads", icon: IconBrandThreads },
  { name: "soundCloud", icon: IconMusic },
  { name: "website", icon: IconLayout },
];

interface SelectIconProps {
  [key: string]: any;
}

const SelectIcon = ({ form }: SelectIconProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Select a  icon</Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="top" className="w-62">
        <div className="grid grid-cols-4 gap-3">
          {icons.map((iconOption) => {
            const IconComponent = iconOption.icon;
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    key={iconOption.name}
                    type="button"
                    className={`p-2 rounded-md border transition-all hover:border-primary ${
                      form.watch("icon") === iconOption.name
                        ? "border-primary/50 bg-primary/10"
                        : "border-border"
                    }`}
                    onClick={() => {
                      form.setValue("icon", iconOption.name);
                    }}
                  >
                    <IconComponent className="size-4 mx-auto" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-background border border-primary/20 text-white">
                  <p className="capitalize">{iconOption.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>

    // <div className="space-y-2">
    //   <Label htmlFor="icon">Select icon</Label>
    //   <div className="grid grid-cols-4 gap-3">
    //     {icons.map((iconOption) => {
    //       const IconComponent = iconOption.icon;
    //       return (
    //         <button
    //           key={iconOption.name}
    //           type="button"
    //           className={`p-4 rounded-xl border-2 transition-all hover:border-primary ${
    //             form.watch("icon") === iconOption.name
    //               ? "border-primary bg-primary/10"
    //               : "border-border"
    //           }`}
    //           onClick={() => {
    //             form.setValue("icon", iconOption.name);
    //           }}
    //           // onClick={() => setSelectedIcon(iconOption.name)}
    //         >
    //           <IconComponent className="w-6 h-6 mx-auto" />
    //         </button>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default SelectIcon;
