import React from "react";
import { toast } from "sonner";
import { CopyButton } from "../ui/copy-button";

const ShortUrlLink = ({url}: {url:string} ) => {

  const handleCopy = (value: string | undefined | null) => {
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      toast.success("Link copied!");
    });
  };
  return (
    <div
      onClick={() => handleCopy(url)}
      className="group overflow-hidden relative rounded-full"
      // href={`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode}`}
    >
      <code className="text-xs sm:text-base lg:text-lg font-mono font-bold bg-accent/50 px-3 py-1 rounded-full z-0">
        {process.env.NEXT_PUBLIC_APP_URL}/{url}
        {/* linkhub.app */}
      </code>
      <div className="transform translate-y-7 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center w-full h-8  bg-accent/80 absolute top-0 z-10 backdrop-blur-sm">
        <CopyButton variant={"ghost"} content={url} size={"sm"} />
      </div>
    </div>
  );
};

export default ShortUrlLink;
