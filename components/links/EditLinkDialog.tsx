"use client";
import React, { TransitionStartFunction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LinkData } from "@/lib/types";
import EditLinkForm from "../forms/EditLinkForm";

interface EditLinkProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  startEditing: TransitionStartFunction;
  link: LinkData;
}

const EditLinkDialog = ({
  link,
  isOpen,
  isEditing,
  startEditing,
  setIsOpen,
}: EditLinkProps) => {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>Update your link here</DialogDescription>
        </DialogHeader>
        <EditLinkForm
          link={link}
          isEditing={isEditing}
          startEditing={startEditing}
          setIsDialogOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditLinkDialog;
