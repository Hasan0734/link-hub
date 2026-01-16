"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Dialog,
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
import { Calendar, Check, Edit, Link2, Lock, Plus } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { IconWorld } from "@tabler/icons-react";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";
import { nanoid } from "nanoid";
import * as z from "zod";
import { createShortLink } from "@/features/shortLink/shortLink.actions";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { checkCustomAlias } from "@/data/checkCustomAlias";
import { formatDate } from "@/lib/utils";

interface Availability {
  status: boolean;
  message: string;
}

const CreateNewUrl = () => {
  const [open, setOpen] = useState(false);
  const [isPending, starTaransition] = useTransition();
  const [shortCode, setShortCode] = useState("");
  const [generating, setGenerating] = useState(false);
  const [checkAlias, setCheckAlias] = useState(false);
  const [availability, setAvailability] = useState<Availability>({
    status: false,
    message: "",
  });

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

    if (value?.length === 0) {
      form.setValue("customAlias", undefined);
      form.clearErrors("customAlias");
      setCheckAlias(false)

      return;
    }

    if (value) {
      const check = await checkCustomAlias(value);
      // setCustomAlias(
      //   `→ ${process.env.NEXT_PUBLIC_APP_URL}/${form.getValues("customAlias")}`
      // );
      setAvailability(check);

      if (!check.status) {
        form.setError("customAlias", {
          type: "custom",
          message: check.message,
        });
        setCheckAlias(false);

        return;
      }

      form.clearErrors("customAlias");
      setCheckAlias(false);
    }
  }, []);

  const debouncedCustom = useDebounceCallback(resetCustomAlias, 500);

  useEffect(() => {
    const value = form.watch()?.customAlias;
    if (value) {
      setCheckAlias(true);
      debouncedCustom();
    }
  }, [form.watch().customAlias?.length]);

  const onSubmit = async (data: shortLinkSchemaType) => {
    starTaransition(async () => {
      const res = await createShortLink({ ...data, shortCode: shortCode });

      if (res.status) {
        toast.success(res.message);
        form.reset();
        setShortCode("");
        setOpen(false);
        return;
      }
      toast.error(res.message);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild className="max-w-xl">
        <Button size={"sm"}>
          <Plus />
          Create Short URL
        </Button>
      </DialogTrigger>

      {open && (
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
                // description={
                //   <>
                //     {generating ? (
                //       <span className="flex items-center gap-2">
                //         <Spinner /> Generating...
                //       </span>
                //     ) : shortCode ? (
                //       `→ ${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`
                //     ) : (
                //       ""
                //     )}
                //   </>
                // }
              />

              <LabelAndInput
                title="Short Code"
                name="shortCode"
                form={form}
                showErrorMsg
                placeholder="sdfjlkads"
                showAddon
                addonText="http://localhost:3000/"
                Icon={generating ? <Spinner /> : <Link2 />}
                readOnly
              />

              <LabelAndInput
                title="Custom Alias (Optional)"
                name="customAlias"
                form={form}
                showErrorMsg
                placeholder="my-link"
                showAddon
                addonText="http://localhost:3000/"
                Icon={checkAlias ? <Spinner /> : <Edit />}
                desClass="text-primary"
                description={
                  <>
                    {/* {checkAlias ? (
                    <span className="flex items-center gap-2">
                      <Spinner /> Checking...
                    </span>
                  ) : form.getValues("customAlias") ? (
                    <span className="grid">
                      {customAlias}
                      {availability.status && (
                        <span className="text-green-500 text-xs"> {availability.message}</span>
                      )}
                    </span>
                  ) : (
                    ""
                  )} */}
                    {availability.status && (
                      <span className="text-green-500 flex items-center text-xs">
                        <Check size={15} /> {availability.message}
                      </span>
                    )}
                  </>
                }
              />

              <div className="grid grid-cols-2 gap-4 items-start">
                <LabelAndInput
                  title="Password (Optional)"
                  name="password"
                  type="password"
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
                  placeholder={`${formatDate(new Date())}`}
                  showErrorMsg
                  showAddon
                  Icon={<Calendar />}
                  readonly
                  clear
                />
              </div>

              <Button  disabled={isPending} className="w-full">
                {isPending && <Spinner />} Create Short URL
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CreateNewUrl;
