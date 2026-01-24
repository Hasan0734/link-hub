"use client";
import { Card, CardContent } from "../ui/card";
import {
  IconLayoutBoard,
  IconLayoutBottombar,
  IconLayoutList,
  IconSquare,
  IconUserSquare,
} from "@tabler/icons-react";
import { CaseSensitive } from "lucide-react";

import { cn } from "@/lib/utils";
import ScrollSpy from "../ScrollSpy";

const items = [
  { name: "Header", key: "header", icon: IconUserSquare },
  { name: "Theme", key: "theme", icon: IconLayoutBoard },
  { name: "Wallpaper", key: "wallpaper", icon: IconSquare },
  { name: "Text", key: "headerText", icon: CaseSensitive },
  { name: "Buttons", key: "buttons", icon: IconLayoutList },
  { name: "Footer", key: "footer", icon: IconLayoutBottombar },
];

const DesignSidebar = () => {
  return (
    <Card className="shadow-none border-0 col-span-2 sticky top-28 py-0">
      <CardContent className="px-0">
        <ScrollSpy activeClass="bg-secondary" rootMargin="-200px 0px 0px 0px">
          <ul className="space-y-3 flex flex-col gap-2.5">
            {items.map((item) => {
              const IconComponent = item.icon;

              return (
                <li className="" key={item.key}>
                  <a
                    href={"#" + item.key}
                    className={cn(
                      "w-full h-11  rounded-xl hover:bg-accent duration-200 transition-all px-3 py-2.5 flex items-center gap-2 cursor-pointer",
                    )}
                  >
                    <IconComponent className="size-5" />
                    <span className="block">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </ScrollSpy>
      </CardContent>
    </Card>
  );
};

export default DesignSidebar;
