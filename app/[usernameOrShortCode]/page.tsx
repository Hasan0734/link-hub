import { PasswordRequiredForm } from "@/components/forms/PasswordRequiredForm";
import PublicProfile from "@/components/PublicProfile";
import LinkExpiredDialog from "@/components/short-urls/LinkExpiredDialog";
import { UpdateLinkClickCount } from "@/features/shortLink/shortLinkClickCount";
import { checkUserOrUrl } from "@/lib/checkUserOrUrl";
import { ProfileDataType, ShortUrl } from "@/lib/types";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {headers} from 'next/headers'

interface PageProps {
  params: {
    usernameOrShortCode: string;
  };
}

interface ResultTypes {
  status: boolean;
  message: string;
  type: string;
  data: ProfileDataType | ShortUrl | null;
}

// 🔑 Dynamic Metadata Function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { usernameOrShortCode } = await params;

  if (!usernameOrShortCode) {
    return {
      title: "Page Not Found",
      description: "The requested page was not found.",
    };
  }

  // Fetch the data just like in your component
  const res: ResultTypes = await checkUserOrUrl(usernameOrShortCode);

  if (res.type === "LINK") {
    const linkData = res.data as ShortUrl;

    if (linkData.expiresAt && linkData?.expiresAt < new Date()) {
      return {
        title: `⚠ Expired your link`,
        description: `We are sorry to your link is expired.`,
      };
    }

    if (linkData.password) {
      return {
        title: `🔒 Password Protected this link`,
        description: `Short link is need to enter password then redirect the actual link.`,
      };
    }

    // Set metadata for a short link
    return {
      title: `Redirecting to ${linkData.originalUrl}`,
      description: `Short link for ${linkData.originalUrl}. Click to redirect.`,
    };
  } else {
    const profileData = res.data as ProfileDataType;

    // Set metadata for a public profile
    return {
      title: profileData.name || `${usernameOrShortCode}'s Profile`,
      description:
        profileData.bio || `Public profile page for @${usernameOrShortCode}.`,
    };
  }
}

const UserOrRedirectPage = async ({ params }: PageProps) => {
  const { usernameOrShortCode } = await params;


  if (usernameOrShortCode) {
    const res: ResultTypes = await checkUserOrUrl(usernameOrShortCode);

    if (!res.status) {
      notFound();
    }

    if (res.type === "LINK" && res.data) {
      const linkData = res.data as ShortUrl;

      if (linkData?.expiresAt && linkData?.expiresAt < new Date()) {
        return <LinkExpiredDialog date={linkData.expiresAt} />;
      }

      if (linkData.password) return <PasswordRequiredForm id={res.data.id} />;
      await UpdateLinkClickCount(linkData.id)

      redirect(linkData.originalUrl);
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
