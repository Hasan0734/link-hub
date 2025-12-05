import React from "react";
import { Skeleton } from "./ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="w-[400px] h-screen space-y-5">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
    </div>
  );
};

export default DashboardSkeleton;
