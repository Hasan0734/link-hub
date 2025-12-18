import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSchema, LinkSchemaType } from "@/features/links/link.schema";
import { Spinner } from "../ui/spinner";
import { Plus } from "lucide-react";
import LabelAndInput from "../LabelAndInput";

const CreateNewLink = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  // open={isDialogOpen} onOpenChange={setIsDialogOpen}
  const form = useForm({ resolver: zodResolver(LinkSchema) });

  const onSubmit = (data: LinkSchemaType) => {
    startTransition(async () => {
      console.log(data);
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>
          <Plus className="h-4 w-4" />
          Add Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
          <DialogDescription>
            Fill in the details for your link
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <LabelAndInput
              title="Title"
              name="title"
              form={form}
              showErrorMsg
              placeholder="My Website"
            />
            <LabelAndInput
              title="URL"
              name="url"
              form={form}
              showErrorMsg
              placeholder="https://example.com"
            />

            <div className="grid grid-cols-2 gap-4">
              {/* <div className="space-y-2">
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
              </div> */}
              <LabelAndInput
                name="color"
                type="color"
                title={"Color"}
                form={form}
              />
            </div>
            <Button disabled={isPending} className="w-full">
              {isPending && <Spinner />} Submit Link
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewLink;
