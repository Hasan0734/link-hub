import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";
import EmailFooter from "./EmailFooter";

interface DeletionProps {
  email: string;
  url: string;
}

const AccountDeletionConfirmation = ({ email, url }: DeletionProps) => {
  return (
    <Html>
      <Preview>Confirm your account deletion request</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="bg-white rounded-xl p-8 mx-auto max-w-[600px]">
            <Section>
              <Heading className="text-[24px] font-bold text-gray-900 mb-6 text-center">
                Account Deletion Confirmation
              </Heading>

              <Text className="text-[16px] text-gray-700 mb-4">
                We received a request to delete your account associated with{" "}
                <strong>{email}</strong>.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-6">
                Before we proceed, please understand that deleting your account
                will:
              </Text>

              <Section className="bg-red-50 border border-red-200 border-solid rounded-xl p-4 mb-6">
                <Text className="text-[14px] text-red-800 mb-2 font-semibold">
                  ⚠️ This action cannot be undone
                </Text>
                <Text className="text-[14px] text-red-700 mb-1">
                  • Permanently delete all your personal data
                </Text>
                <Text className="text-[14px] text-red-700 mb-1">
                  • Remove access to all your saved content
                </Text>
                <Text className="text-[14px] text-red-700 mb-1">
                  • Cancel any active subscriptions
                </Text>
                <Text className="text-[14px] text-red-700 mb-0">
                  • Delete your account history permanently
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-6">
                If you're sure you want to proceed with deleting your account,
                click the button below. This link will expire in 24 hours for
                security reasons.
              </Text>

              <Section className="text-center mb-8">
                <Button
                  href={url}
                  className="bg-red-600 text-white px-8 py-3 rounded-xl text-[16px] font-semibold box-border"
                >
                  Yes, Delete My Account
                </Button>
              </Section>

              <Section className="bg-blue-50 border border-blue-200 border-solid rounded-xl p-4 mb-6">
                <Text className="text-[14px] text-blue-800 mb-2 font-semibold">
                  Changed your mind?
                </Text>
                <Text className="text-[14px] text-blue-700 mb-0">
                  If you didn't request this deletion or want to keep your
                  account, simply ignore this email. Your account will remain
                  active and secure.
                </Text>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-4">
                If you have any questions or need assistance, please contact our
                support team before proceeding with the deletion.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-6">
                Best regards,
                <br />
                The Support Team
              </Text>
            </Section>
            <Hr />
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AccountDeletionConfirmation;
