import AuthHeader from "@/components/AuthHeader";
import ChangePasswordForm from "@/components/forms/ResetPasswordForm";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "You can change your password here.",
};

const ChangePassword = () => {
  return (
    <>
      <AuthHeader
        title="Reset your password"
        description="Enter your new password and make strong it's strong password."
      />
      <CardContent className="space-y-6">
        <ChangePasswordForm />

        <div className="flex justify-center">
          <Button className="" variant={"link"}>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default ChangePassword;
