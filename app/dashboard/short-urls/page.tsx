import AppHeader from "@/components/AppHeader";

import DashboardTitle from "@/components/DashboardTitle";
import CreateNewUrl from "@/components/forms/CreateNewUrl";
import ShortLinkList from "@/components/short-urls/ShortLinkList";
import { Suspense } from "react";
import UrlsCardSkeleton from "@/components/short-urls/UrlsCardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make your short urls here",
  description:
    "This features is make long urls to short urls, and you can make custom alias. And also you can protect the url and expires date.",
};

const ShortUrls = () => {
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <DashboardTitle
                  title="Short URLs"
                  details="Create and manage short links with analytics"
                />

                <CreateNewUrl />
              </div>
              <Suspense fallback={<UrlsCardSkeleton />}>
                <ShortLinkList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortUrls;
