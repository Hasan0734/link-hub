"use client";
import React, { useTransition } from "react";
import { Spinner } from "../ui/spinner";
import LabelAndInput from "../LabelAndInput";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { sendResetPassLink } from "@/features/email/email.actions";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z
    .email("Please enter your register email"),
});

type emailSchemaType = z.infer<typeof emailSchema>;
const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: emailSchemaType) => {
    startTransition(async () => {
      const { status, message } = await sendResetPassLink({
        email: data.email,
      });
      if (status) {
        toast.success(message);
        return;
      }
      toast.error(message);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LabelAndInput
          name="email"
          form={form}
          title="Email"
          placeholder="Enter your valid email"
          showErrorMsg
          showAddon
          Icon={<Mail />}
        />
        <Button disabled={isPending} className="w-full" size="lg">
          {isPending && <Spinner />} Send Reset Link
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
