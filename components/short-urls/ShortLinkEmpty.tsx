import React from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link, Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import CreateNewUrl from "../forms/CreateNewUrl";

const ShortLinkEmpty = () => {
  return (
    <Empty className="border border-primary/20 border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Link />
        </EmptyMedia>
        <EmptyTitle>Short urls Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus /> Add New
            </Button>
          </DialogTrigger>
          <CreateNewUrl />
        </Dialog>
      </EmptyContent>
    </Empty>
  );
};

export default ShortLinkEmpty;
