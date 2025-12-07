"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShortLinkSchema,
  shortLinkSchemaType,
} from "@/features/shortLink/shortLink.schema";
import LabelAndInput from "../LabelAndInput";
import { Calendar, Edit2, Lock } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { IconWorld } from "@tabler/icons-react";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";
import { nanoid } from "nanoid";
import * as z from "zod";
import { createShortLink } from "@/features/shortLink/shortLink.actions";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { checkCustomAlias } from "@/lib/checkCustomAlias";

const CreateNewUrl = () => {
  const [isPending, starTaransition] = useTransition();
  const [shortCode, setShortCode] = useState("");
  const [generating, setGenerating] = useState(false);
  const [checkAlias, setCheckAlias] = useState(false);

  const form = useForm({ resolver: zodResolver(ShortLinkSchema) });

  const getShortUrl = useCallback(() => {
    const shortUrl = nanoid(8);
    setShortCode(shortUrl);
    form.setValue("shortCode", shortUrl);
    setGenerating(false);
  }, []);

  const debouncedUrl = useDebounceCallback(getShortUrl, 700);

  useEffect(() => {
    setGenerating(true);
    const onUrlChange = () => {
      const value = form.watch().originalUrl;
      const checkUrlSchema = z.object({
        originalUrl: z.string().url("Please check url"),
      });
      if (!value) {
        setShortCode("");
        setGenerating(false);
        return;
      }

      const valueChecked = checkUrlSchema.safeParse({ originalUrl: value });

      if (!valueChecked.success) {
        form.setError("originalUrl", {
          type: "invalid_type",
          message: "Please enter valied url.",
        });
        setShortCode("");
        setGenerating(false);
        return;
      }

      form.clearErrors("originalUrl");

      debouncedUrl();
    };

    onUrlChange();
  }, [form.watch().originalUrl]);

  const resetCustomAlias = useCallback(async () => {
    const value = form.watch().customAlias;
    if (value) {
      setCheckAlias(true);
    }

    if (value?.length === 0) {
      form.setValue("customAlias", undefined);
      form.clearErrors("customAlias");
      return;
    }

    if (value) {
      setCheckAlias(false);
      const check = await checkCustomAlias(value);
      console.log(check);
    }
  }, []);

  const debouncedCustom = useDebounceCallback(resetCustomAlias, 500);

  useEffect(() => {
    debouncedCustom();
  }, [form.watch().customAlias?.length]);

  const onSubmit = async (data: shortLinkSchemaType) => {
    starTaransition(async () => {
      const res = await createShortLink({ ...data, shortCode: shortCode });

      if (res.status) {
        toast.success(res.message);
        form.reset();
        setShortCode("");
        return;
      }
      toast.error(res.message);
    });
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
            Icon={<IconWorld />}
            desClass="text-primary"
            description={
              <>
                {generating ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Generating...
                  </span>
                ) : shortCode ? (
                  `→ ${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`
                ) : (
                  ""
                )}
              </>
            }
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
              desClass="text-primary"
              description={
                <>
                  {checkAlias ? (
                    <span className="flex items-center gap-2">
                      <Spinner /> Checking...
                    </span>
                  ) : form.getValues("customAlias") ? (
                    `→ ${process.env.NEXT_PUBLIC_APP_URL}/${form.getValues("customAlias")}`
                  ) : (
                    ""
                  )}
                </>
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
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
            <DatePicker
              form={form}
              title="Expiry Date (Optional)"
              name="expiresAt"
              placeholder="June 01, 2025"
              showErrorMsg
              showAddon
              Icon={<Calendar />}
              readonly
            />
          </div>

          <Button disabled={isPending} className="w-full">
            {isPending && <Spinner />} Create Short URL
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CreateNewUrl;
