"use client";
import LabelAndInput from "../LabelAndInput";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageSchema, PageSchemaType } from "@/features/page/page.schema";
import slugify from "slugify";
import { TransitionStartFunction } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { PageData } from "@/lib/types";
import { updatePage } from "@/features/page/page.actions";

interface PageFromProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  page: PageData;
  isEditing: boolean;
  startEditing: TransitionStartFunction;
}

const PageEditForm = ({
  setIsDialogOpen,
  page,
  isEditing,
  startEditing,
}: PageFromProps) => {
  const form = useForm({
    resolver: zodResolver(PageSchema),
    defaultValues: {
      title: page.title,
      slug: page.slug,
      customDomain: page.customDomain,
    },
  });

  const onSubmit = (data: PageSchemaType) => {
    startEditing(async () => {
      const res = await updatePage(data, page.id);
      if (res.status) {
        toast.success(res.message);
        form.reset();
        setIsDialogOpen(false);
        return;
      }
      toast.error(res.message);
      setIsDialogOpen(false);
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
          showErrorMsg
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
          showErrorMsg
        />

        <LabelAndInput
          name="customDomain"
          title="Custom Domain (Optional)"
          placeholder="portfolio.yourdomain.com"
          form={form}
          showErrorMsg
        />

        <Button disabled={isEditing} className="w-full">
          {isEditing && <Spinner />} Save Page
        </Button>
      </form>
    </Form>
  );
};

export default PageEditForm;
