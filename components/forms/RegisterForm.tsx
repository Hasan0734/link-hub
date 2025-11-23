"use client";
import React, { useActionState, useState, useTransition } from "react";
import { Button } from "../ui/button";
import LabelAndInput from "../LabelAndInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { createUser } from "@/features/auth/server/auth.actions";
import {
  registerUserWithConfirmSchema,
  UserWithConfirmSchemaType,
} from "@/features/auth/auth.schema";

const defaultValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [actionResult, setActionResult] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
    defaultValues,
  });

  async function onSubmit(data: UserWithConfirmSchemaType) {
    setActionResult(null);
    form.clearErrors();

    const result = await createUser(data);

    if (!result.success && result.fieldErrors) {
      Object.entries(result.fieldErrors).forEach(([key, value]) => {
        form.setError(key as keyof UserWithConfirmSchemaType, {
          type: "server",
          message: value,
        });
      });
      setActionResult(result);
      console.log(result)
    } else {
      setActionResult(result);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LabelAndInput
          name="name"
          form={form}
          title="Name"
          placeholder="John Doe"
          showErrorMsg
        />
        <LabelAndInput
          name="username"
          form={form}
          title="Username"
          placeholder="johndoe"
          showErrorMsg
        />
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
          isPassword
        />
        <LabelAndInput
          name="confirmPassword"
          form={form}
          title="Confirm Password"
          placeholder="••••••••"
          type="password"
          showErrorMsg
          isPassword
        />

        <Button className="w-full" size="lg">
          Create Account
        </Button>
      </form>
    </Form>
  );
};
