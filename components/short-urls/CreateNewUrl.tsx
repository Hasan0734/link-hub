"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShortLinkSchema } from "@/features/shortLink/shortLink.schema";
import LabelAndInput from "../LabelAndInput";
import { Chromium, Edit2, Lock } from "lucide-react";
import { DatePicker } from "../ui/date-picker";

const CreateNewUrl = () => {
  const [isPending, starTaransition] = useTransition();

  const form = useForm({ resolver: zodResolver(ShortLinkSchema) });

  const onSubmit = async () => {
    starTaransition(() => {});
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create Short URL</DialogTitle>
        <DialogDescription>
          Generate a short link with optional customization
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <LabelAndInput
            title="Long URL *"
            name="originalUrl"
            form={form}
            showErrorMsg
            placeholder="https://example.com/very-long-url"
            showAddon
            Icon={<Chromium />}
          />

          <div className="space-y-2">
            <LabelAndInput
              title="Custom Alias (Optional)"
              name="customAlias"
              form={form}
              showErrorMsg
              placeholder="my-link"
              showAddon
              Icon={<Edit2 />}
            />
            {/* <p className="text-sm text-muted-foreground">
              {newUrl.customAlias
                ? `linkhub.app/${newUrl.customAlias}`
                : "Random code will be generated"}
            </p> */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <LabelAndInput
              title="Password (Optional)"
              name="password"
              form={form}
              showErrorMsg
              placeholder="••••••••"
              showAddon
              Icon={<Lock />}
            />

            {/* <div className="space-y-2">
              <Label htmlFor="expiresAt">Expiry Date (Optional)</Label>
              <Input id="expiresAt" type="date" />
            </div> */}
            <DatePicker title="Expiry Date (Optional)" />
          </div>

          <Button className="w-full">Create Short URL</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateNewUrl;
