
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <>
      <LoginForm />

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
