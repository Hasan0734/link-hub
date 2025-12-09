import React, {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShortLinkSchema,
  shortLinkSchemaType,
} from "@/features/shortLink/shortLink.schema";
import { ShortUrl } from "@/lib/types";
import LabelAndInput from "../LabelAndInput";
import { Spinner } from "../ui/spinner";
import { Calendar, Check, Edit, Link2, Lock } from "lucide-react";
import { IconWorld } from "@tabler/icons-react";
import { Form } from "../ui/form";
import { DatePicker } from "../ui/date-picker";
import { Button } from "../ui/button";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";
import { checkCustomAlias } from "@/lib/checkCustomAlias";
import { updateShortLink } from "@/features/shortLink/shortLink.actions";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

interface EditProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: ShortUrl;
  startEditing: TransitionStartFunction;
  isEditing: boolean
}
interface Availability {
  status: boolean;
  message: string;
}

const EditShortLink = ({ open, setOpen, data, isEditing, startEditing }: EditProps) => {
  
  const [checkAlias, setCheckAlias] = useState(false);

  const [availability, setAvailability] = useState<Availability>({
    status: false,
    message: "",
  });

  const form = useForm({
    resolver: zodResolver(ShortLinkSchema),
    defaultValues: {
      shortCode: data.shortCode,
      customAlias: data.customAlias || undefined,
      expiresAt: data.expiresAt || undefined,
      originalUrl: data.originalUrl,
    },
  });

  const onSubmit = (formData: shortLinkSchemaType) => {
    startEditing(async () => {
      const res = await updateShortLink(formData, data.id);

      if (res.status) {
        toast.success(res.message);
        form.reset();
        setOpen(false);
        return;
      }
      toast.error(res.message);
    });
  };

  const resetCustomAlias = useCallback(async () => {
    const value = form.watch().customAlias;

    if (value?.length === 0) {
      form.setValue("customAlias", undefined);
      form.clearErrors("customAlias");
      setCheckAlias(false);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Short URL</DialogTitle>
          <DialogDescription>
            You can update custom alias and change password, expires or remove.
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

            <Button disabled={isEditing} className="w-full">
              {isEditing && <Spinner />} Update Short URL
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditShortLink;
