"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import bycript from "bcryptjs";
import * as z from "zod";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { shortLinks } from "@/db/schema";
import { useFormState } from "react-dom";
import { checkPassword } from "@/features/shortLink/check-password.actions";
import { ClientSubmitButton } from "../ClientSubmitButton";

type PasswordFormState = {
  error: string | null;
};

const initialState: PasswordFormState = { error: null };

export const PasswordRequiredForm = ({ id }: { id: string }) => {
  const [state, formAction] = useFormState(checkPassword, initialState);

  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogDescription>
            This link requried a password, please enter password.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="id" value={id} />
          <div className="grid gap-3">
            <Label htmlFor="name-1">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </div>

          <DialogFooter>
            {/* <Button type="submit">Submit</Button> */}
            <ClientSubmitButton title="Submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
