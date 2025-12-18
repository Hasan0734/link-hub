"use client";
import LabelAndInput from "../LabelAndInput";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageSchema, PageSchemaType } from "@/features/page/page.schema";
import slugify from "slugify";
import { useTransition } from "react";
import { createPage } from "@/features/page/page.actions";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface PageFromProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageForm = ({ setIsDialogOpen }: PageFromProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({ resolver: zodResolver(PageSchema) });

  const onSubmit = (data: PageSchemaType) => {
    startTransition(async () => {
      const res = await createPage(data);
      if (res.status) {
        toast.success(res.message);
        form.reset();
        setIsDialogOpen(false);
        return;
      }
      toast.error(res.message);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LabelAndInput
          name="title"
          title="Title"
          placeholder="My Portfolio"
          form={form}
        />
        <LabelAndInput
          name="slug"
          title="URL Slug"
          placeholder="portfolio"
          description={
            <>
              {process.env.NEXT_PUBLIC_APP_URL}/
              {form.watch().slug ? slugify(form.watch().slug) : ""}
            </>
          }
          form={form}
        />

        <LabelAndInput
          name="customDomain"
          title="Custom Domain (Optional)"
          placeholder="portfolio.yourdomain.com"
          form={form}
        />

        <Button disabled={isPending} className="w-full">
          {isPending && <Spinner />} Submit Page
        </Button>
      </form>
    </Form>
  );
};

export default PageForm;
