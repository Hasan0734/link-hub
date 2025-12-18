import AppHeader from "@/components/AppHeader";
import { Suspense } from "react";
import DashboardTitle from "@/components/DashboardTitle";
import PageGrid from "@/components/pages/PageGrid";
import PageFormDialog from "@/components/pages/PageFormDialog";
import PageCardSkeleton from "@/components/pages/PageCardSkeleton";

const Pages = () => {
  const handleAddPage = () => {
    // setEditingPage({
    //   id: "",
    //   title: "",
    //   slug: "",
    //   customDomain: "",
    //   isPublic: true,
    // });
    // setIsDialogOpen(true);
  };

  return (
    <>
      <AppHeader />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <DashboardTitle
                  title="Pages Management"
                  details="Create and manage multiple profile pages"
                />

                <PageFormDialog />
              </div>

              <Suspense fallback={<PageCardSkeleton />}>
                <PageGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pages;
