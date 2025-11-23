import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <>
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
    </>
  );
};

export default RegisterPage;
