"use client";
import AppHeader from "@/components/AppHeader";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit2, ExternalLink, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import DashboardTitle from "@/components/DashboardTitle";

const Pages = () => {
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

  const [editingPage, setEditingPage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPage = () => {
    setEditingPage({
      id: "",
      title: "",
      slug: "",
      customDomain: "",
      isPublic: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditPage = (page: any) => {
    setEditingPage({ ...page });
    setIsDialogOpen(true);
  };

  const handleSavePage = () => {
    if (editingPage.id) {
      setPages(pages.map((p) => (p.id === editingPage.id ? editingPage : p)));
    } else {
      setPages([
        ...pages,
        {
          ...editingPage,
          id: Date.now().toString(),
          displayOrder: pages.length,
        },
      ]);
    }
    setIsDialogOpen(false);
    setEditingPage(null);
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((p) => p.id !== id));
  };

  const handleTogglePublic = (id: string) => {
    setPages(
      pages.map((p) => (p.id === id ? { ...p, isPublic: !p.isPublic } : p))
    );
  };

  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <DashboardTitle
                  title="Pages Management"
                  details="Create and manage multiple profile pages"
                />

                <Button onClick={handleAddPage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Page
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                  <Card
                    key={page.id}
                    className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {page.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            /{page.slug}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={page.isPublic ? "default" : "secondary"}
                        >
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
                        <span className="text-sm text-muted-foreground">
                          Public
                        </span>
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

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingPage?.id ? "Edit Page" : "Create New Page"}
                    </DialogTitle>
                    <DialogDescription>
                      Configure your page settings
                    </DialogDescription>
                  </DialogHeader>
                  {editingPage && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Page Title</Label>
                        <Input
                          id="title"
                          value={editingPage.title}
                          onChange={(e) =>
                            setEditingPage({
                              ...editingPage,
                              title: e.target.value,
                            })
                          }
                          placeholder="My Portfolio"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input
                          id="slug"
                          value={editingPage.slug}
                          onChange={(e) =>
                            setEditingPage({
                              ...editingPage,
                              slug: e.target.value,
                            })
                          }
                          placeholder="portfolio"
                        />
                        <p className="text-sm text-muted-foreground">
                          linkhub.app/{editingPage.slug}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customDomain">
                          Custom Domain (Optional)
                        </Label>
                        <Input
                          id="customDomain"
                          value={editingPage.customDomain}
                          onChange={(e) =>
                            setEditingPage({
                              ...editingPage,
                              customDomain: e.target.value,
                            })
                          }
                          placeholder="portfolio.yourdomain.com"
                        />
                      </div>
                      <Button onClick={handleSavePage} className="w-full">
                        Save Page
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pages;
