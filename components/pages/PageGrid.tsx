import React, { useState } from "react";
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

const PageGrid = () => {
  const [pages, setPages] = useState([
    {
      id: "1",
      title: "Main Profile",
      slug: "main",
      customDomain: "",
      isPublic: true,
      displayOrder: 0,
    },
    {
      id: "2",
      title: "Portfolio",
      slug: "portfolio",
      customDomain: "portfolio.johndoe.com",
      isPublic: true,
      displayOrder: 1,
    },
    {
      id: "3",
      title: "Resources",
      slug: "resources",
      customDomain: "",
      isPublic: false,
      displayOrder: 2,
    },
  ]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
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
      ))}
    </div>
  );
};

export default PageGrid;
