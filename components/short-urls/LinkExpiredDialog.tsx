import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { formatDate } from "@/lib/utils";

const LinkExpiredDialog = ({ date }: { date: Date }) => {
  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl">Expired Link</DialogTitle>
          <DialogDescription>
            ⚠This link is expired at: {formatDate(date)}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LinkExpiredDialog;
