"use client";

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
import { Plus, Trash2, GripVertical, Edit2, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";

const Links = () => {
  const [links, setLinks] = useState([
    {
      id: "1",
      title: "Portfolio",
      url: "https://portfolio.com",
      icon: "🎨",
      color: "#3B82F6",
      isActive: true,
      displayOrder: 0,
    },
    {
      id: "2",
      title: "Twitter",
      url: "https://twitter.com",
      icon: "🐦",
      color: "#1DA1F2",
      isActive: true,
      displayOrder: 1,
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com",
      icon: "💻",
      color: "#181717",
      isActive: true,
      displayOrder: 2,
    },
    {
      id: "4",
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "💼",
      color: "#0A66C2",
      isActive: true,
      displayOrder: 3,
    },
  ]);

  const [editingLink, setEditingLink] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddLink = () => {
    setEditingLink({
      id: "",
      title: "",
      url: "",
      icon: "🔗",
      color: "#3B82F6",
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditLink = (link: any) => {
    setEditingLink({ ...link });
    setIsDialogOpen(true);
  };

  const handleSaveLink = () => {
    if (editingLink.id) {
      setLinks(links.map((l) => (l.id === editingLink.id ? editingLink : l)));
    } else {
      setLinks([
        ...links,
        {
          ...editingLink,
          id: Date.now().toString(),
          displayOrder: links.length,
        },
      ]);
    }
    setIsDialogOpen(false);
    setEditingLink(null);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setLinks(
      links.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
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
                  title="Links Management"
                  details="Add, edit, and organize your profile links"
                />
                <Button onClick={handleAddLink}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Your Links ({links.length})</CardTitle>
                  <CardDescription>
                    Drag to reorder, toggle to activate/deactivate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {links.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-all duration-200 group"
                      >
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing" />

                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{link.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-medium">{link.title}</h3>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                            >
                              {link.url} <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={link.isActive}
                            onCheckedChange={() => handleToggleActive(link.id)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditLink(link)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLink(link.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingLink?.id ? "Edit Link" : "Add New Link"}
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the details for your link
                    </DialogDescription>
                  </DialogHeader>
                  {editingLink && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={editingLink.title}
                          onChange={(e) =>
                            setEditingLink({
                              ...editingLink,
                              title: e.target.value,
                            })
                          }
                          placeholder="My Website"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                          id="url"
                          value={editingLink.url}
                          onChange={(e) =>
                            setEditingLink({
                              ...editingLink,
                              url: e.target.value,
                            })
                          }
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="icon">Icon (Emoji)</Label>
                          <Input
                            id="icon"
                            value={editingLink.icon}
                            onChange={(e) =>
                              setEditingLink({
                                ...editingLink,
                                icon: e.target.value,
                              })
                            }
                            placeholder="🔗"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            type="color"
                            value={editingLink.color}
                            onChange={(e) =>
                              setEditingLink({
                                ...editingLink,
                                color: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <Button onClick={handleSaveLink} className="w-full">
                        Save Link
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

export default Links;
