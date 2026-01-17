"use client";

import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackNavigation = () => {
  const router = useRouter();
  return (
    <>
      <Button variant={"ghost"} onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
    </>
  );
};

export default BackNavigation;
