import React from "react";
import {
  Section,
  Text,
} from '@react-email/components';


const EmailFooter = () => {
  return (
    <Section className="text-center">
      <Text className="text-[12px] text-gray-500 m-0">
        © {new Date().getFullYear()} Linkhub. All rights reserved.
      </Text>
      <Text className="text-[12px] text-gray-500 m-0">
        123 Business Street, City, State 12345
      </Text>
      <Text className="text-[12px] text-gray-500 m-0">
        If you didn't create an account, you can safely ignore this email.
      </Text>
    </Section>
  );
};

export default EmailFooter;
