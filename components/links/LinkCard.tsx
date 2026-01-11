"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { deleteLink } from "@/features/links/link.actions";
import { LinkData } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChartBar,
  ExternalLink,
  GripVertical,
  Lock,
  Pencil,
  Trash2,
} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import CustomDynamicIcon from "../icons";

interface LinkCardProps {
  link: LinkData;
}

const LinkCard = ({ link }: LinkCardProps) => {
  const [isDeleting, startDelete] = useTransition();
  const handleDeletePage = () => {
    startDelete(async () => {
      const res = await deleteLink(link.id);

      if (res.status) {
        toast.success(res.message);

        return;
      }
      toast.error(res.message);
    });
  };

  return (
    <Card className="relative  backdrop-blur-sm p-4 shadow-sm hover:shadow-md  bg-accent/20 hover:bg-accent/30 transition-all duration-200">
      <CardContent
        className={cn("px-0 relative z-0 space-y-4", {
          blur: isDeleting,
        })}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="hidden sm:block">
            <Button variant="ghost" size="icon" className="cursor-grab">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="grow">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10"
                )}
              >
                {
                  <CustomDynamicIcon
                    name={link.icon}
                    style={{ color: link.color ?? "white" }}
                  />
                }
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-semibold truncate">{link.title}</h3>
                <a className="block sm:hidden" href={link.url} target="_blank">
                  <ExternalLink size={20} />
                </a>
                <a
                  href={link.url}
                  target="_blank"
                  className=" text-sm max-w-xs md:max-w-sm overflow-hidden text-muted-foreground truncate hover:underline hidden sm:inline-block"
                >
                  {link.url}
                </a>
              </div>

              <div className="block sm:hidden">
                <Button variant="ghost" size="icon" className="cursor-grab">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Switch checked={!!link.isActive} />
                <Button className="cursor-pointer" variant="ghost" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  className="cursor-pointer"
                  onClick={handleDeletePage}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap  md:pl-11 **:cursor-pointer">
              <Button variant={"ghost"} size="icon" className="">
                <Lock />
              </Button>
              <Button variant={"ghost"} size="icon" className="">
                <Calendar />
              </Button>
              <Button variant={"ghost"} size="sm" className="">
                <ChartBar />0 Clicks
              </Button>
              <div className="flex flex-wrap sm:hidden items-center gap-2">
                <Switch checked={!!link.isActive} />
                <Button className="cursor-pointer" variant="ghost" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  className="cursor-pointer"
                  onClick={handleDeletePage}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {isDeleting && (
        <div className="absolute z-10 w-full h-full bg-accent/10 top-0 rounded-xl flex items-center justify-center gap-2 brightness-75">
          <Spinner />
          {isDeleting && "Deleting..."}
          {/* {isEditing && "Editing..."} */}
        </div>
      )}
    </Card>
  );
};

export default LinkCard;
