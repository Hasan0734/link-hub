"use client";
import { useTransition } from "react";
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
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Spinner } from "../ui/spinner";

const defaultValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
    defaultValues,
  });

  function onSubmit(data: UserWithConfirmSchemaType) {
    form.clearErrors();

    startTransition(async () => {
      const result = await createUser(data);
      if (result.success) {
        toast.success(result.message);
        redirect("/login");
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
        <Button className="w-full" size="lg" disabled={isPending} type="submit">
          {isPending && <Spinner />} Create Account
        </Button>
      </form>
    </Form>
  );
};
