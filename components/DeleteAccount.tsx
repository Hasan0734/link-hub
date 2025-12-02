"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTransition } from "react";
import { Spinner } from "./ui/spinner";
import { confirmDeleteAccount } from "@/features/email/email.actions";
import { toast } from "sonner";

const DeleteAccount = () => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccount = () => {
    startTransition(async () => {
      try {
        const res = await confirmDeleteAccount();

        if (res.success) {
          toast.success(res.message);
          return;
        }

        toast.error(res.message);
      } catch (error) {
        console.error(error);
      };
    });
  };

  return (
    <Card className="border-destructive/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>Irreversible actions for your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isPending} variant="destructive">
                {isPending ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                Delete
              </Button>
            </AlertDialogTrigger>
            <DeleteDialog action={handleDeleteAccount} />
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccount;

const DeleteDialog = ({ action }: { action: () => void }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          We send you email to confirm delete your account. If you want to
          delete you account parmanently confirm to email. Please check your
          inbox.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={action} asChild>
          <Button variant={"destructive"}>Continue</Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
