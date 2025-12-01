import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";
import SocialLogin from "@/components/SocialLogin";
import { CardContent } from "@/components/ui/card";
import AuthHeader from "@/components/AuthHeader";

const LoginPage = () => {
  return (
    <>
      <AuthHeader
        title="Welcome back"
        description="Sign in to your account to continue"
      />
      <CardContent className="space-y-6">
        <SocialLogin title="Sign in" />
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
        <LoginForm />
        <div className="space-y-3">
  
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default LoginPage;
