"use client";
import React, { useActionState } from "react";
import { Button } from "../ui/button";
import LabelAndInput from "../LabelAndInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser } from "@/app/register/actions";
import * as z from "zod";
import { Form } from "../ui/form";
const initialState = {
  message: "",
};

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

const RegisterForm = () => {
  //   const [state, formAction, pending] = useActionState(createUser, initialState);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form className="space-y-4">
        <LabelAndInput
          name="name"
          form={form}
          title="Name"
          placeholder="John Doe"
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
