import { getShortLinks } from "@/lib/getShortLinks";
import React from "react";
import UrlsCard from "./UrlsCard";
import ShortLinkEmpty from "./ShortLinkEmpty";

const ShortLinkList = async () => {
  const shortUrls = await getShortLinks();

  console.log(shortUrls);

  if (!shortUrls.status) {
    return <div>Unauthenticate</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {shortUrls?.data.length > 0 &&
          shortUrls.data.map((url) => <UrlsCard key={url.id} url={url} />)}
      </div>

      {shortUrls.data.length === 0 && (
        <div className="max-w-xl mx-auto mt-20">
          <ShortLinkEmpty />
        </div>
      )}
    </div>
  );
};

export default ShortLinkList;
