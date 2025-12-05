import { ReactNode, Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DashboardSkeleton from "@/components/DashboardSkeleton";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </Suspense>
  );
};

export default DashboardLayout;
