"use client";
import AddLinkDialog from "@/components/AddLinkDialog";
import AppHeader from "@/components/AppHeader";
import LinkCard from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import { Globe, Instagram, Plus, Twitter, Youtube } from "lucide-react";
import React, { useState } from "react";

const Links = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [links, setLinks] = useState([
    {
      id: 1,
      title: "Instagram",
      url: "https://instagram.com/johndoe",
      icon: "instagram",
      active: true,
    },
    {
      id: 2,
      title: "Twitter",
      url: "https://twitter.com/johndoe",
      icon: "twitter",
      active: true,
    },
    {
      id: 3,
      title: "Website",
      url: "https://johndoe.com",
      icon: "globe",
      active: true,
    },
    {
      id: 4,
      title: "YouTube",
      url: "https://youtube.com/@johndoe",
      icon: "youtube",
      active: false,
    },
  ]);

  const iconMap: Record<string, any> = {
    instagram: <Instagram className="w-5 h-5 text-primary" />,
    twitter: <Twitter className="w-5 h-5 text-primary" />,
    globe: <Globe className="w-5 h-5 text-primary" />,
    youtube: <Youtube className="w-5 h-5 text-primary" />,
  };

  const handleSave = (link: { title: string; url: string; icon: string }) => {
    if (editingLink) {
      setLinks(
        links.map((l) => (l.id === editingLink.id ? { ...l, ...link } : l))
      );
      setEditingLink(null);
    } else {
      setLinks([...links, { id: Date.now(), ...link, active: true }]);
    }
  };

  const handleEdit = (link: any) => {
    setEditingLink(link);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const handleToggle = (id: number) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, active: !l.active } : l)));
  };
  return (
    <>
      <AppHeader title="Links" details="  Manage your links and their order" />

      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div></div>
                <Button
                  size="lg"
                  onClick={() => {
                    setEditingLink(null);
                    setDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <div className="space-y-3">
                {links.map((link) => (
                  <LinkCard
                    key={link.id}
                    title={link.title}
                    url={link.url}
                    icon={iconMap[link.icon]}
                    active={link.active}
                    onEdit={() => handleEdit(link)}
                    onDelete={() => handleDelete(link.id)}
                    onToggle={() => handleToggle(link.id)}
                  />
                ))}
              </div>

              {links.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No links yet. Add your first link to get started!
                  </p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Link
                  </Button>
                </div>
              )}

              <AddLinkDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={handleSave}
                editLink={editingLink}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
