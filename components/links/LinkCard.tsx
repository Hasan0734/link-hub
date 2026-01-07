"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { deleteLink } from "@/features/links/link.actions";
import { LinkData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Calendar, ChartBar, GripVertical, Icon, Lock, Pencil, Trash2 } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

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
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="cursor-grab">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </Button>

          <div className="grow">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10"
                )}
              >
                <DynamicIcon
                  style={{ color: link.color ?? "white" }}
                  name={(link.icon || "link") as any}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{link.title}</h3>
                <a
                  href={link.url}
                  target="_blank"
                  className="text-sm text-muted-foreground truncate hover:underline"
                >
                  {link.url}
                </a>
              </div>

              <div className="flex items-center gap-2">
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
            <div className="pl-11 **:cursor-pointer">
              <Button variant={"ghost"} size="icon" className="">
                <Lock />
              </Button>
              <Button variant={"ghost"} size="icon" className="">
                <Calendar />
              </Button>
              <Button variant={"ghost"} size="sm" className="">
                <ChartBar />
                0 Clicks
              </Button>
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
