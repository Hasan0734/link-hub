import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, Edit2, ExternalLink, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { PageData } from "@/lib/types";

const PageCard = ({ page }: { page: PageData }) => {
  const handleEditPage = (page: any) => {
    // setEditingPage({ ...page });
    // setIsDialogOpen(true);
  };

  const handleDeletePage = (id: string) => {
    // setPages(pages.filter((p) => p.id !== id));
  };

  const handleTogglePublic = (id: string) => {
    //   setPages(
    //     pages.map((p) => (p.id === id ? { ...p, isPublic: !p.isPublic } : p))
    //   );
  };

  return (
    <Card
      key={page.id}
      className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
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
      <CardContent className="space-y-4">
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
            onClick={() => handleDeletePage(page.id)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageCard;
