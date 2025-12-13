"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export function ClientSubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Spinner />} {title}
    </Button>
  );
}
