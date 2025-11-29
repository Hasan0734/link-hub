"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import LabelAndInput from "../LabelAndInput";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginUserSchema,
  LoginUserSchemaType,
} from "@/features/auth/auth.schema";
import { signIn } from "@/features/auth/auth.actions";

import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import {  useRouter } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues,
  });

  function onSubmit(data: LoginUserSchemaType) {
    startTransition(async () => {
      const result = await signIn(data);

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
        return;
      }

      if (result.error) {
        toast.error(result.error.message || "Registration failed");
        return;
      }
      toast.error(result.message || "Registration failed");
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LabelAndInput
          name="email"
          form={form}
          title="Email"
          placeholder="name@example.com"
          showErrorMsg
        />
        <LabelAndInput
          name="password"
          form={form}
          title="Password"
          placeholder="••••••••"
          type="password"
          showErrorMsg
        />

        <Button disabled={isPending} className="w-full" size="lg">
          {isPending && <Spinner />} Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
