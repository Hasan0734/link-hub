import React from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
  const handleLogout = async () => {
    await authClient.signOut();
  };

  
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
