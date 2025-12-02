"use client";

import React, { useTransition } from "react";
import LabelAndInput from "../LabelAndInput";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  ResetPasswordType,
} from "@/features/password/password.schema";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { resetPassword } from "@/features/password/password.actions";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const token = useSearchParams().get("token");

  if (!token) {
    redirect("/");
  }

  const form = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: ResetPasswordType) => {
    startTransition(async () => {
      try {
        const res = await resetPassword(data, token);

        if (res.status) {
          toast.success(res.message);
          redirect("/login");
          return;
        }
        toast.error(res.message);
      } catch (error) {
        toast.error("Invalid token");
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <LabelAndInput
            name="newPassword"
            form={form}
            title="New Password"
            placeholder="••••••••"
            showErrorMsg
            showAddon
            Icon={<Lock />}
            isPassword
            type="password"
          />
          <LabelAndInput
            name="confirmPassword"
            form={form}
            title="Confirm Password"
            placeholder="••••••••"
            showErrorMsg
            showAddon
            Icon={<Lock />}
            isPassword
            type="password"
          />
          <Button disabled={isPending} className="w-full" size="lg">
            {isPending && <Spinner />} Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
