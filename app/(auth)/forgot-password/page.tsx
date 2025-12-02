import AuthHeader from "@/components/AuthHeader";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "You can change your password here.",
};

const ForgotPassword = () => {
  return (
    <>
      <AuthHeader
        title="Forgot Password"
        description="Enter your username or the email address that you used to create your account."
      />
      <CardContent className="space-y-6">
        <ForgotPasswordForm />

        <div className="flex justify-center">
          <Button className="" variant={"link"}>
            <Link href="/login">← Sign in</Link>
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default ForgotPassword;
