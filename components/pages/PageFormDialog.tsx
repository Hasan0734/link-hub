import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

const PageFormDialog = () => {
  const [editingPage, setEditingPage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSavePage = () => {
    // if (editingPage.id) {
    //   setPages(pages.map((p) => (p.id === editingPage.id ? editingPage : p)));
    // } else {
    //   setPages([
    //     ...pages,
    //     {
    //       ...editingPage,
    //       id: Date.now().toString(),
    //       displayOrder: pages.length,
    //     },
    //   ]);
    // }
    // setIsDialogOpen(false);
    // setEditingPage(null);
  };


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingPage?.id ? "Edit Page" : "Create New Page"}
          </DialogTitle>
          <DialogDescription>Configure your page settings</DialogDescription>
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
              <Label htmlFor="customDomain">Custom Domain (Optional)</Label>
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
  );
};

export default PageFormDialog;
