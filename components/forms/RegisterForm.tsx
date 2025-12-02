"use client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import LabelAndInput from "../LabelAndInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { createUser } from "@/features/auth/auth.actions";
import {
  registerUserWithConfirmSchema,
  UserWithConfirmSchemaType,
} from "@/features/auth/auth.schema";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { Lock, Mail, User, UserCircle2 } from "lucide-react";

const defaultValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
    defaultValues,
  });

  function onSubmit(data: UserWithConfirmSchemaType) {
    form.clearErrors();

    startTransition(async () => {
      const { success, message } = await createUser(data);
      if (success) {
        toast.success(`${message}, Please check your email for verification.`);
        router.push("/dashboard");
        return;
      }
      toast.error(message || "Registration failed");
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
          showAddon
          Icon={<User />}
        />
        <LabelAndInput
          name="username"
          form={form}
          title="Username"
          placeholder="johndoe"
          showErrorMsg
          showAddon
          Icon={<UserCircle2 />}
        />
        <LabelAndInput
          name="email"
          form={form}
          title="Email"
          placeholder="name@example.com"
          showErrorMsg
          showAddon
          Icon={<Mail />}
        />
        <LabelAndInput
          name="password"
          form={form}
          title="Password"
          placeholder="••••••••"
          type="password"
          showErrorMsg
          isPassword
          showAddon
          Icon={<Lock />}
        />
        <LabelAndInput
          name="confirmPassword"
          form={form}
          title="Confirm Password"
          placeholder="••••••••"
          type="password"
          showErrorMsg
          isPassword
          showAddon
          Icon={<Lock />}
        />
        <Button className="w-full" size="lg" disabled={isPending} type="submit">
          {isPending && <Spinner />} Create Account
        </Button>
      </form>
    </Form>
  );
};
