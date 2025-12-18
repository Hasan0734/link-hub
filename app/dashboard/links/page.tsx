"use client";

import { useState, Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import LinkList from "@/components/links/LinkList";

const Links = () => {
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

  const handleSave = () => {
    // if (editingLink.id) {
    //   setLinks(links.map((l) => (l.id === editingLink.id ? editingLink : l)));
    // } else {
    //   setLinks([
    //     ...links,
    //     {
    //       ...editingLink,
    //       id: Date.now().toString(),
    //       displayOrder: links.length,
    //     },
    //   ]);
    // }
    // setIsDialogOpen(false);
    // setEditingLink(null);
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
                  <Plus className="h-4 w-4" />
                  Add Link
                </Button>
              </div>

              <Suspense fallback={<>Loading</>}>
                <LinkList />
              </Suspense>

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
                      <Button onClick={handleSave} className="w-full">
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
