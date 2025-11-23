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
import { loginUser } from "@/features/auth/server/auth.actions";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [actionResult, setActionResult] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(loginUserSchema),
    defaultValues,
  });

  function onSubmit(data: LoginUserSchemaType) {
    startTransition(async () => {
      const result = await loginUser(data);

      setActionResult(result);
      console.log(result);
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
          isPassword
        />

        <Button className="w-full" size="lg">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
