"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save } from "lucide-react";
import { UserTypes } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LabelAndInput from "../LabelAndInput";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { updateProfile } from "@/features/profiile/profile.actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { sendVerificationEmail } from "@/features/email/email.actions";

const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at leas 2 char long")
    .max(100, "Name must be less than 100 char long"),

  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255)
    .toLowerCase(),
});

type SchemaType = z.infer<typeof accountSchema>;

const AccountInformation = ({ user }: { user: UserTypes }) => {
  const [isPending, startTransition] = useTransition();
  const [isSending, emailTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: user.name, email: user.email },
  });

  async function onSubmit(data: SchemaType) {
    const accounts = await authClient.listAccounts();
    console.log(accounts);

    return;
    if (data.name === user.name) {
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.updateUser({ name: data.name });
      if (error) {
        toast.error("Failed to update.");
      } else {
        const result = await updateProfile({ name: data.name });
        if (result.success) {
          toast.success(result.message);
          return;
        } else {
          toast.error(result.message);
        }
      }
    });
  }

  const handleVerification = () => {
    emailTransition(async () => {
      const res = await sendVerificationEmail(user.email);
      if (res.status) {
        toast.success(res.message);
        return;
      }
      toast.error(res.message);
    });
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-sm"
          >
            <LabelAndInput
              name="name"
              form={form}
              title="Name"
              placeholder="Enter your name"
              showErrorMsg
            />
            <div className="flex items-end w-full gap-3">
              <LabelAndInput
                name="email"
                form={form}
                title="Email"
                placeholder="name@example.com"
                showErrorMsg
                readOnly
                formItemClass="w-full flex-1"
              />
              {!user.emailVerified ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleVerification}
                      type="button"
                      className="text-red-500"
                      variant={"ghost"}
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <Spinner />
                          Sending link
                        </>
                      ) : (
                        "Not Verified"
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Click to send verify link.</TooltipContent>
                </Tooltip>
              ) : (
                <Button className="text-green-500" variant={"ghost"}>
                  Verified
                </Button>
              )}
            </div>

            <Button disabled={isPending} type="submit">
              {isPending ? <Spinner /> : <Save className="h-4 w-4" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountInformation;
