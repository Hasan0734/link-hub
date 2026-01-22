import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";

const DashboardSkeleton = () => {
  return (
    <div className="flex items-center gap-2 justify-center h-screen w-screen">
      <Spinner /> Loading...
    </div>
  );
};

export default DashboardSkeleton;
