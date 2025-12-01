import AuthHeader from "@/components/AuthHeader";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const ChangePassword = () => {
  return (
    <>
      <AuthHeader
        title="Set new password"
        description="Enter your username or the email address that you used to create your account."
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
