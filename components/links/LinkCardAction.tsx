import React from "react";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { LinkData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

interface ActionProps {
  link: LinkData;
  className: string;
  handleDeletePage: () => void;
  setEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const LinkCardAction = ({
  link,
  handleDeletePage,
  setEditDialog,
  className,
}: ActionProps) => {
    console.log(link.isActive);
  return (
    <div className={cn("items-center gap-2", className)}>
      <Switch
        checked={true}
        onCheckedChange={(v) => console.log(v)}
      />

      <Button
        onClick={() => setEditDialog(true)}
        className="cursor-pointer"
        variant="outline"
        size="icon-sm"
      >
        <Pencil className="w-4 h-4" />
      </Button>

      <Button
        className="cursor-pointer"
        onClick={handleDeletePage}
        variant="outline"
        size="icon-sm"
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  );
};

export default LinkCardAction;
