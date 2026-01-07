import { Suspense } from "react";

import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import LinkList from "@/components/links/LinkList";
import CreateNewLink from "@/components/forms/CreateNewLink";
import LinkSkeleton from "@/components/links/LinkSkeleton";

const Links = () => {
  const handleAddLink = () => {};

  const handleSave = () => {
    // if (editingLink.id) {
    //   setLinks(links.map((l) => (l.id === editingLink.id ? editingLink : l)));
    // } else {
    //   setLinks([
    //     ...links,
    //     {
    //       ...editingLink,
    //       id: Date.now().toString(),
    //       displayOrder: links.length,
    //     },
    //   ]);
    // }
    // setIsDialogOpen(false);
    // setEditingLink(null);
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
                  title="Links Management"
                  details="Add, edit, and organize your profile links"
                />
                <CreateNewLink />
              </div>

              <Suspense fallback={<LinkSkeleton />}>
                <LinkList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
