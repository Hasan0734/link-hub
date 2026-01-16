"use client";
import React, { TransitionStartFunction, useState, useTransition } from "react";
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
import { createLink, updateLink } from "@/features/links/link.actions";
import SelectIcon from "../SelectIcon";
import ColorPicker from "../ui/color-picker";
import { LinkData } from "@/lib/types";

interface EditLinkProps {
  link: LinkData;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  startEditing: TransitionStartFunction;
}

const EditLinkForm = ({
  link,
  isEditing,
  startEditing,
  setIsDialogOpen,
}: EditLinkProps) => {
  const form = useForm({
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      icon: link.icon,
      title: link.title,
      url: link.url,
      color: link.color,
    },
  });

  const onSubmit = (data: LinkSchemaType) => {
    startEditing(async () => {
      const res = await updateLink(data, link.id);
      if (res.status) {
        toast.success(res.message);
        form.reset();
        setIsDialogOpen(false)
        return;
      }
      toast.message(res.message);
    });
  };

  return (
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
        <Button disabled={isEditing} className="w-full">
          {isEditing && <Spinner />} Save Link
        </Button>
      </form>
    </Form>
  );
};

export default EditLinkForm;
