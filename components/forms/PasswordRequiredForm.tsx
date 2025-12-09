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
import { checkPassword } from "@/features/shortLink/shortLink.actions";
import { redirect } from "next/navigation";

export const PasswordRequiredForm = async ({ id }: { id: string }) => {
  async function handlePassword(formData: FormData) {
    "use server"
    const res = await checkPassword(id, formData);

    if(res.status) {
        return;
    }
    redirect(res?.url)
  }

  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogDescription>
            This link requried a password, please enter password.
          </DialogDescription>
        </DialogHeader>

        <form action={handlePassword} className="grid gap-4">
          <div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
