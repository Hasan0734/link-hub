"use client";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import {
  IconLayoutBoard,
  IconLayoutBottombar,
  IconLayoutList,
  IconSquare,
  IconUserSquare,
} from "@tabler/icons-react";
import { CaseSensitive } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
const items = [
  { name: "Header", key: "header", icon: IconUserSquare },
  { name: "Theme", key: "theme", icon: IconLayoutBoard },
  { name: "Wallpaper", key: "wallpaper", icon: IconSquare },
  { name: "Text", key: "text", icon: CaseSensitive },
  { name: "Buttons", key: "buttons", icon: IconLayoutList },
  { name: "Footer", key: "footer", icon: IconLayoutBottombar },
];

const DesignSidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState("");
  const router = useRouter()

  useEffect(() => {
    const currentHash = window.location.hash;
    if (currentHash) {
     
    } else {
      window.location.hash = "#header";
      setHash('#header')
    }
  }, [pathname, searchParams, hash]);

  console.log(hash);

  return (
    <Card className="shadow-none border-0 col-span-2 sticky top-28 py-0">
      <CardContent className="px-0">
        <ul className="space-y-3">
          {items.map((item) => {
            const IconComponent = item.icon;

            return (
              <li className="" key={item.key}>
                <div
                  onClick={() => {
                    setHash(`#${item.key}`);
                    router.push('#'+item.key)
                  }}
                  //   href={"#" + item.key}
                  className={cn(
                    "w-full rounded-xl hover:bg-accent duration-200 transition-all px-3 py-2.5 flex items-center gap-2 cursor-pointer",
                    {
                      "bg-accent": `#${item.key}` === hash,
                    },
                  )}
                >
                  <IconComponent className="size-5" />
                  {item.name}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DesignSidebar;
