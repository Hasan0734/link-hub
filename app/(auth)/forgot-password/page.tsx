import AuthHeader from "@/components/AuthHeader";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { CardContent } from "@/components/ui/card";
import React from "react";

const ForgotPassword = () => {
  return (
    <>
      <AuthHeader
        title="Forgot Password"
        description="Enter your username or the email address that you used to create your account."
      />
      <CardContent className="space-y-6">
        <ForgotPasswordForm />
      </CardContent>
    </>
  );
};

export default ForgotPassword;
