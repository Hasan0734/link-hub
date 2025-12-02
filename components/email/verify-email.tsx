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

interface VerifyEmailProps {
  username: string;
  verifyUrl: string;
}

const VerifyEmail = (props: VerifyEmailProps) => {
  const { username, verifyUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-4 mt-0">
                Verify your email address
              </Text>

              <Text className="text-[16px] text-gray-700 mb-6 mt-0">
                Thanks {username} for signing up! Please click the button below
                to verify your email address and complete your account setup.
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href={verifyUrl}
                  className="bg-blue-600 text-white px-8 py-3 rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-6 mt-0">
                If the button doesn't work, you can copy and paste this link
                into your browser:
                <br />
                {verifyUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 mb-8 mt-0">
                This verification link will expire in 24 hours for security
                reasons.
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

export default VerifyEmail;
