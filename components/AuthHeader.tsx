import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";

const AuthHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <CardHeader className="space-y-4 text-center">
      <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
        <LinkIcon className="w-6 h-6 text-primary-foreground" />
      </div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default AuthHeader;
