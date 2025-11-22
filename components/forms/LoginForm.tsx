import React from "react";
import { Button } from "../ui/button";
import LabelAndInput from "../LabelAndInput";

const LoginForm = () => {
  return (
    <form className="space-y-4">
      {/* <LabelAndInput
        title="Email"
        id="email"
        type="email"
        placeholder="name@example.com"
      />
      <LabelAndInput
        title="Password"
        id="password"
        type="password"
        placeholder="••••••••"
      /> */}

      <Button className="w-full" size="lg">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
