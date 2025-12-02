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

interface PasswordChangedProps {
  email: string;
  username: string;
}

const PasswordChanged = ({ email, username }: PasswordChangedProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-green-700 mb-4 mt-0">
                ✓ Password successfully changed
              </Text>

              <Text className="text-4 text-gray-700 mb-2 mt-0">
                Hi {username},
              </Text>

              <Text className="text-4 text-gray-700 mb-6 mt-0">
                This email confirms that the password for your account{" "}
                <strong>{email}</strong> has been successfully changed on
                December 2, 2024 at 10:53 AM (Asia/Dhaka).
              </Text>

              <Section className="bg-green-50 border-solid border-[1px] border-green-200 rounded-[6px] p-4 mb-6">
                <Text className="text-[14px] text-green-800 mb-2 mt-0 font-medium">
                  Your account is now secure with your new password.
                </Text>
                <Text className="text-[14px] text-green-700 m-0">
                  You can now use your new password to sign in to your account.
                </Text>
              </Section>

              <Text className="text-4 text-gray-700 mb-6 mt-0 font-medium">
                Didn't make this change?
              </Text>

              <Text className="text-[14px] text-gray-600 mb-6 mt-0">
                If you didn't change your password, your account may have been
                compromised. Please contact our support team immediately and
                consider the following steps:
              </Text>

              <Text className="text-[14px] text-gray-600 mb-6 mt-0">
                • Reset your password again
                <br />
                • Review your recent account activity
                <br />• Enable two-factor authentication if available
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href="https://example.com/contact-support"
                  className="bg-red-600 text-white px-8 py-3 rounded-[6px] text-4 font-medium no-underline box-border"
                >
                  Contact Support
                </Button>
              </Section>
            </Section>

            <Hr className="border-gray-200 my-8" />
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordChanged;
