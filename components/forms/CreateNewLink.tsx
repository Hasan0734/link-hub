"use client";
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
import { IconPicker } from "../ui/icon-picker";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { createLink } from "@/features/links/link.actions";
import SelectIcon from "../SelectIcon";
import ColorPicker from "../ui/color-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CreateNewLink = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(LinkSchema),
    defaultValues: { icon: "website" },
  });

  const onSubmit = (data: LinkSchemaType) => {
    startTransition(async () => {
      // return;
      const res = await createLink(data);
      if (res.status) {
        toast.success(res.message);
        form.reset();
        setIsOpen(false);
        return;
      }
      toast.message(res.message);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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

            <div className="flex  gap-4">
              <SelectIcon form={form} />

              <div className="space-y-2">
                {/* <Label htmlFor="color">Color</Label> */}
                <ColorPicker
                  color={form.getValues("color") ?? `hsl(0, 0%, 100%)`}
                  onChange={(newColor) => {
                    form.setValue("color", newColor);
                  }}
                />
              </div>
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
