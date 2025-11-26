"use client";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
      },
    });
  };

  return <Button size={'icon'} variant={'outline'} onClick={handleLogout}>
    <LogOut/>
  </Button>;
};

export default LogoutButton;
