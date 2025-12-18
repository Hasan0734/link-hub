"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, Edit2, ExternalLink, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { PageData } from "@/lib/types";
import { useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { deletePage } from "@/features/page/page.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PageCard = ({ page }: { page: PageData }) => {
  const [isDeleting, startDelete] = useTransition();
  const [isEditing, startEditing] = useTransition();

  const handleEditPage = (page: any) => {
    // setEditingPage({ ...page });
    // setIsDialogOpen(true);
  };

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
    //   setPages(
    //     pages.map((p) => (p.id === id ? { ...p, isPublic: !p.isPublic } : p))
    //   );
  };

  return (
    <Card className="relative border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent
        className={cn("pt-1 px-2 sm:px-6 relative z-0", {
          "blur": isDeleting,
        })}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{page.title}</CardTitle>
              <CardDescription className="mt-2">/{page.slug}</CardDescription>
            </div>
            <Badge variant={page.isPublic ? "default" : "secondary"}>
              {page.isPublic ? "Public" : "Private"}
            </Badge>
          </div>
        </CardHeader>
        {page.customDomain && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{page.customDomain}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Switch
            checked={page.isPublic}
            onCheckedChange={() => handleTogglePublic(page.id)}
          />
          <span className="text-sm text-muted-foreground">Public</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleEditPage(page)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`/page/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeletePage()}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
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
    </Card>
  );
};

export default PageCard;
