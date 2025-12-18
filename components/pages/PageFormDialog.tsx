"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import PageForm from "../forms/PageForm";

const PageFormDialog = () => {
  const [editingPage, setEditingPage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
 


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Page
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingPage?.id ? "Edit Page" : "Create New Page"}
          </DialogTitle>
          <DialogDescription>Configure your page settings</DialogDescription>
        </DialogHeader>

        <PageForm setIsDialogOpen={setIsDialogOpen}/>

      </DialogContent>
    </Dialog>
  );
};

export default PageFormDialog;
