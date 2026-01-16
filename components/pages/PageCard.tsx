"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Edit2, ExternalLink, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { PageData } from "@/lib/types";
import { useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { deletePage, updatePage } from "@/features/page/page.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EditPageDialog from "./EditPageDialog";
import Link from "next/link";

const PageCard = ({ page }: { page: PageData }) => {
  const [isDeleting, startDelete] = useTransition();
  const [isEditing, startEditing] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeletePage = () => {
    startDelete(async () => {
      const res = await deletePage(page.id);

      if (res.status) {
        toast.success(res.message);

        return;
      }
      toast.error(res.message);
    });
  };

  const handleTogglePublic = (id: string) => {
    startEditing(async () => {
      const res = await updatePage(
        {
          title: page.title,
          slug: page.slug,
          isPublic: page.isPublic ? false : true,
        },
        id
      );
      if (res.status) {
        toast.success(res.message);
        return;
      }
      toast.error(res.message);
    });
  };

  return (
    <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent
        className={cn("pt-1 px-2 sm:px-6 relative z-0 space-y-4", {
          "blur": isDeleting || isEditing,
        })}
      >
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl capitalize">{page.title}</CardTitle>
            <CardDescription className="mt-2">
              <Link
                className="hover:underline"
                href={"/dashboard/pages/" + page.slug}
              >
                /{page.slug}
              </Link>
            </CardDescription>
          </div>
          <Badge variant={page.isPublic ? "default" : "secondary"}>
            {page.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
        {page.customDomain && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{page.customDomain}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsDialogOpen(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>

          <div className="flex items-center gap-2">
            <Switch
              checked={page.isPublic}
              onCheckedChange={() => handleTogglePublic(page.id)}
            />
            <span className="text-sm text-muted-foreground">Public</span>
          </div>

          <Button variant="link" size="sm" asChild>
            <a
              href={`/username/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => handleDeletePage()}
            className="text-destructive"
          >
            <Trash2 />
          </Button>
        </div>
      </CardContent>

      {(isDeleting || isEditing) && (
        <div className="absolute z-10 w-full h-full bg-accent/10 top-0 rounded-xl flex items-center justify-center gap-2 brightness-75">
          <Spinner />
          {isDeleting && "Deleting..."}
          {isEditing && "Editing..."}
        </div>
      )}
      <EditPageDialog
        page={page}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        isEditing={isEditing}
        startEditing={startEditing}
      />
    </Card>
  );
};

export default PageCard;
