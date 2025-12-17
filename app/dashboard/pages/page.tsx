"use client";
import AppHeader from "@/components/AppHeader";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import DashboardTitle from "@/components/DashboardTitle";
import PageGrid from "@/components/pages/PageGrid";

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

                <Button onClick={handleAddPage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Page
                </Button>
              </div>

              <PageGrid />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pages;
