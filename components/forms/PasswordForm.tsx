"use client";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { db } from "@/db";
import * as z from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelAndInput from "../LabelAndInput";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/features/password/password.schema";
import { useTransition } from "react";
import { changePassword } from "@/features/password/password.actions";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Spinner } from "../ui/spinner";

const PasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  function submitPassword(data: ChangePasswordType) {
    
    startTransition(async () => {
      const res = await changePassword(data);
      console.log(res);
      if (res.status) {
        toast.success(res.message);
        return;
      }
      if (res.error) {
        toast.error(res.message);
        return;
      }

      toast.error(res.message || "Internal server error");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitPassword)}
        className="space-y-4 max-w-sm"
      >
        <Label>Change Password</Label>
        <div className="space-y-2">
          <LabelAndInput
            name="currentPassword"
            placeholder="Current Password"
            form={form}
            type="password"
            showErrorMsg
            showAddon
            isPassword
            Icon={<Lock />}
          />
          <LabelAndInput
            name="newPassword"
            placeholder="New Password"
            form={form}
            type="password"
            isPassword
            showErrorMsg
            showAddon
            Icon={<Lock />}
          />
          <LabelAndInput
            name="confirmPassword"
            placeholder="Confirm Password"
            form={form}
            type="password"
            showErrorMsg
            showAddon
            isPassword
            Icon={<Lock />}
          />
        </div>
        <Button disabled={isPending} variant="outline">
          {isPending && <Spinner />} Update Password
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
