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
} from "lucide-react";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import CustomDynamicIcon from "../icons";
import EditLinkDialog from "./EditLinkDialog";
import LinkCardAction from "./LinkCardAction";

interface LinkCardProps {
  link: LinkData;
}

const LinkCard = ({ link }: LinkCardProps) => {
  const [isDeleting, startDelete] = useTransition();
  const [isEditing, startEditing] = useTransition();
  const [editDialog, setEditDialog] = useState(false);

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
          "blur": isDeleting || isEditing,
        })}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="hidden sm:block">
            <Button variant="ghost" size="icon" className="cursor-grab">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="grow space-y-3">
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
              <LinkCardAction
                className={"hidden sm:flex"}
                link={link}
                handleDeletePage={handleDeletePage}
                setEditDialog={setEditDialog}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap  md:pl-11 **:cursor-pointer">
              <Button variant={"outline"} size="icon-sm" className="">
                <Lock />
              </Button>
              <Button variant={"outline"} size="icon-sm" className="">
                <Calendar />
              </Button>
              <Button variant={"outline"} size="sm" className="">
                <ChartBar />0 Clicks
              </Button>
              <LinkCardAction
                link={link}
                handleDeletePage={handleDeletePage}
                setEditDialog={setEditDialog}
                className="flex flex-wrap sm:hidden"
              />
            </div>
          </div>
        </div>
      </CardContent>

      {(isDeleting || isEditing) && (
        <div className="absolute z-10 w-full h-full bg-accent/10 top-0 rounded-xl flex items-center justify-center gap-2 brightness-75">
          <Spinner />
          {isDeleting && "Deleting..."}
          {isEditing && "Editing..."}
        </div>
      )}

      <EditLinkDialog
        link={link}
        isOpen={editDialog}
        setIsOpen={setEditDialog}
        isEditing={isEditing}
        startEditing={startEditing}
      />
    </Card>
  );
};

export default LinkCard;
