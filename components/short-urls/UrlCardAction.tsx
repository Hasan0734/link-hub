import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteShortLink } from "@/features/shortLink/shortLink.actions";
import { TransitionStartFunction, useState } from "react";
import EditShortLink from "../forms/EditShortLink";
import { ShortUrl } from "@/lib/types";

interface ActionProps {
  startTransition: TransitionStartFunction;
  startEditing: TransitionStartFunction;
  isEditing: boolean

  data: ShortUrl;
}

const UrlCardAction = ({
  startTransition,
  data,
  startEditing,
  isEditing
}: ActionProps) => {

  const [openEditForm, setOpenEditForm] = useState(false);
  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteShortLink(data.id);

      if (res.status) {
        toast.success(res.message);

        return;
      }
      toast.error(res.message);
    });
  };

  const handleEdit = async () => {
    setOpenEditForm(true);
  };

  return (
    <div className="flex items-center w-full md:w-auto justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="[&_svg:not([class*='size-'])]:size-3 size-6 sm:size-8 sm:[&_svg:not([class*='size-'])]:size-4"
            variant="ghost"
            size="icon-sm"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="bottom"
          className="border-primary/20"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleEdit} className="flex ">
              <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="flex ">
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {openEditForm && (
        <EditShortLink
          data={data}
          open={openEditForm}
          setOpen={setOpenEditForm}
          startEditing={startEditing}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default UrlCardAction;
