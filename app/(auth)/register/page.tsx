import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import AuthHeader from "@/components/AuthHeader";
import { CardContent } from "@/components/ui/card";
import SocialLogin from "@/components/SocialLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an new account.",
  description: "Sign up with your email and password or google.",
};

const RegisterPage = () => {
  return (
    <>
      <AuthHeader
        title="Create an account"
        description="Get started with your link page in seconds"
      />
      <CardContent className="space-y-6">
        <SocialLogin title="Sign up" />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <RegisterForm />

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </>
  );
};

export default RegisterPage;
