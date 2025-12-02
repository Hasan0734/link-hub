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

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const token = useSearchParams().get("token")


  console.log(token)

  if (!token) {
    redirect("/")
  }

  const form = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: ResetPasswordType) => {
    console.log(data);
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
