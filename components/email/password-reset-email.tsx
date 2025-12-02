import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";
import EmailFooter from "./EmailFooter";

interface ResetEmailProps {
  email: string;
  resetUrl: string;
  username: string;
}

const PasswordResetEmail = ({ email, resetUrl, username }: ResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-4 mt-0">
                Reset your password
              </Text>

              <Text className="text-[16px] text-gray-700 mb-2 mt-0">
                Hi {username},
              </Text>

              <Text className="text-[16px] text-gray-700 mb-6 mt-0">
                We received a request to reset the password for your account
                associated with <strong>{email}</strong>. Click the button below
                to create a new password.
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href={resetUrl}
                  className="bg-red-600 text-white px-9 py-3 rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-6 mt-0">
                If the button doesn't work, copy and paste this link into your
                browser:
                <br />
                {resetUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-4 mt-0">
                <strong>Important:</strong> This password reset link will expire
                in 1 hour for security reasons.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-8 mt-0">
                If you didn't request a password reset, please ignore this email
                or contact our support team if you have concerns about your
                account security.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
