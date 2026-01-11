import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
  IconBrandPinterest,
  IconBrandThreads,
  IconLayout,
  IconMusic,
  IconWorld,
} from "@tabler/icons-react";

export const icons = [
  { name: "world", icon: IconWorld },
  { name: "instagram", icon: IconBrandInstagram },
  { name: "facebook", icon: IconBrandFacebook },
  { name: "youtube", icon: IconBrandYoutube },
  { name: "linkedin", icon: IconBrandLinkedin },
  { name: "github", icon: IconBrandGithub },
  { name: "telegram", icon: IconBrandTelegram },
  { name: "tiktok", icon: IconBrandTiktok },
  { name: "x", icon: IconBrandX },
  { name: "pinterest", icon: IconBrandPinterest },
  { name: "threads", icon: IconBrandThreads },
  { name: "soundCloud", icon: IconMusic },
  { name: "website", icon: IconLayout },
];

const CustomDynamicIcon = ({
  name,
  style,
}: {
  name: string | null;
  style?: { [key: string]: string } | null | undefined;
}) => {
  const IconComponent =
    icons.find((icon) => icon.name === name)?.icon || IconLayout;
  return (
    <IconComponent
      className="size-5"
      style={style ? style : { color: "white" }}
    />
  );
};

export default CustomDynamicIcon;
