"use client";
import React, { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import TitleAndInput from "./TitleAndInput";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

const AccountInformation = ({ user }: { user: UserTypes }) => {
  const [isPending, startTransition] = useTransition();

  //   async function updateAccountInfo(formData: FormData) {
  //     "use server";

  //     const rawFormData = {
  //       name: formData.get("name") as string | undefined,
  //       email: formData.get("email"),
  //     };

  //     if (user.name === rawFormData.name) {
  //       return;
  //     }
  //     try {
  //       const newUpdated = await auth.api.updateUser({
  //         body: { name: rawFormData.name },
  //       });
  //       console.log(newUpdated);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     // const updateProfileNmae = await db
  //     //   .update(profiles)
  //     //   .set({ name: rawFormData.name })
  //     //   .where(eq(profiles.id, user.id));
  //   }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name === user.name) {
      return;
    }

    startTransition(async () => {
      await authClient
        .updateUser({
          name,
        })
        .then(async (value) => {
          const pf = await db
            .update(profiles)
            .set({ name })
            .where(eq(profiles.id, user.id));

            console.log(pf)
          if (!value.error) {
            toast.success("Account name is updated.");
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          console.log("hello");
        });
    });
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TitleAndInput
            title="Name"
            defaultValue={user.name}
            id="name"
            name="name"
          />
          <TitleAndInput
            title="Email"
            defaultValue={user.email}
            id="email"
            name="email"
            readOnly
          />

          <Button disabled={isPending} type="submit">
            {isPending ? <Spinner /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccountInformation;
