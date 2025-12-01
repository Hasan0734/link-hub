"use client";
import React, { useTransition } from "react";
import { Spinner } from "../ui/spinner";
import LabelAndInput from "../LabelAndInput";
import { Form, useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LabelAndInput
          name="email"
          form={form}
          title="Email"
          placeholder="name@example.com"
          showErrorMsg
          showAddon
          Icon={<Mail />}
        />

        <Button disabled={isPending} className="w-full" size="lg">
          {isPending && <Spinner />} Submit
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
