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
import CreateNewLink from "@/components/forms/CreateNewLink";

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
               <CreateNewLink/>
              </div>

              <Suspense fallback={<>Loading</>}>
                <LinkList />
              </Suspense>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
