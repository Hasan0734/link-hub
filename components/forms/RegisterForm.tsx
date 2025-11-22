"use client";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import LabelAndInput from "../LabelAndInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser } from "@/app/register/actions";
import * as z from "zod";
import { Form } from "../ui/form";

export const UserSchema = z.object({
  name: z.string().min(4).max(100),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password cannot be more than 15 characters long")
    .regex(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
    .regex(/.*[a-z].*/, "Password must contain at least one lowercase letter")
    .regex(/.*\d.*/, "Password must contain at least one number")
    .regex(
      /.*[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const RegisterForm = () => {
  //   const [state, formAction, pending] = useActionState(createUser, initialState);
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(data: z.infer<typeof UserSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LabelAndInput
          name="name"
          form={form}
          title="Name"
          placeholder="John Doe"
        />
        <LabelAndInput
          name="username"
          form={form}
          title="Username"
          placeholder="johndoe"
        />
        <LabelAndInput
          name="email"
          form={form}
          title="Email"
          placeholder="name@example.com"
        />
        <LabelAndInput
          name="password"
          form={form}
          title="Password"
          placeholder="••••••••"
          type="password"
        />

        <Button className="w-full" size="lg">
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

//  <LabelAndInput title="Full Name" id="name" placeholder="John Doe" />
// <LabelAndInput title="Username" id="username" placeholder="johndoe" />
// <LabelAndInput
//   title="Email"
//   id="email"
//   type="email"
//   placeholder="name@example.com"
// />
// <LabelAndInput
//   title="Password"
//   id="password"
//   type="password"
//   placeholder="••••••••"
// />
