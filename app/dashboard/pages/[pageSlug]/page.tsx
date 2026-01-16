import AppHeader from "@/components/AppHeader";
import { Suspense } from "react";
import DashboardTitle from "@/components/DashboardTitle";
import PageCardSkeleton from "@/components/pages/PageCardSkeleton";
import PageLinkList from "@/components/pages/PageLlinkList";
import BackNavigation from "@/components/BackNavigation";

interface PageProps {
  params: {
    pageSlug: string;
  };
}

const DetailPage = async ({ params }: PageProps) => {
  const { pageSlug } = await params;

  console.log(pageSlug);

  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div className="flex  gap-3">
                  <BackNavigation />
                  <DashboardTitle
                    title="Page Details Management"
                    details="Manage your page details add, remove, edit links."
                  />
                </div>
                {/* <PageFormDialog /> */}
              </div>

              <Suspense fallback={<PageCardSkeleton />}>
                <PageLinkList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
