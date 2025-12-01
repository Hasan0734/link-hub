"use client";

import React, { useTransition } from "react";
import LabelAndInput from "../LabelAndInput";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const ChangePasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: any) => {
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
          />
          <Button disabled={isPending} className="w-full" size="lg">
            {isPending && <Spinner />} Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
