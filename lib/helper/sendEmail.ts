import { Resend } from "resend";
import { UserTypes } from "../types";
import { JSX } from "react";

const resend = new Resend(process.env.RESEND_API_KEYS as string);

console.log(resend);

interface ArugType {
  user: UserTypes;
  url: string;
  token: string;
  template: JSX.Element;
  subject: string;
}

export default async function sendEmail({ user, template, subject }: ArugType) {
  const email = await resend.emails.send({
    from: `Link-hub <onboarding@resend.dev>`,
    to: user.email,
    subject,
    react: template,
  });

  console.log({ email });
}
