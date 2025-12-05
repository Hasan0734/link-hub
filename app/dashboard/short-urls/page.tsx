import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DashboardTitle from "@/components/DashboardTitle";
import UrlsCard from "@/components/short-urls/UrlsCard";
import CreateNewUrl from "@/components/short-urls/CreateNewUrl";
import ShortLinkList from "@/components/short-urls/ShortLinkList";
import { Suspense } from "react";
import UrlsCardSkeleton from "@/components/short-urls/UrlsCardSkeleton";

const ShortUrls = () => {
  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <DashboardTitle
                  title="Short URLs"
                  details="Create and manage short links with analytics"
                />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Short URL
                    </Button>
                  </DialogTrigger>
                  <CreateNewUrl />
                </Dialog>
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
