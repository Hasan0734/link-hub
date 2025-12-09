import PublicProfile from "@/components/PublicProfile";
import { checkUserOrUrl } from "@/lib/checkUserOrUrl";
import { ProfileDataType, ShortUrl } from "@/lib/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    usernameOrShortCode: string;
  };
}

interface ResultTypes {
  status: boolean;
  message: string;
  type: string;
  data: ProfileDataType | ShortUrl;
}

const UserOrRedirectPage = async ({ params }: PageProps) => {
  const { usernameOrShortCode } = await params;

  console.log(usernameOrShortCode);
  
  if (usernameOrShortCode) {
    const res: ResultTypes = await checkUserOrUrl(usernameOrShortCode);

    console.log(res);
    if (res.type === "LINK") {
      if (res?.data?.password) return <>This is the link</>;
    } else {
      return (
        <>
          <PublicProfile />
        </>
      );
    }
  } else {
    notFound();
  }
};

export default UserOrRedirectPage;
