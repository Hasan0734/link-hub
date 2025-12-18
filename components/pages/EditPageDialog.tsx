"use client";
import React, { TransitionStartFunction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PageData } from "@/lib/types";
import PageEditForm from "../forms/PageEditForm";

interface EditPageProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  startEditing: TransitionStartFunction;
  page: PageData;
}

const EditPageDialog = ({
  page,
  isOpen,
  isEditing,
  startEditing,
  setIsOpen,
}: EditPageProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Page</DialogTitle>
          <DialogDescription>Configure your page settings</DialogDescription>
        </DialogHeader>
        <PageEditForm
          page={page}
          isEditing={isEditing}
          startEditing={startEditing}
          setIsDialogOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPageDialog;
