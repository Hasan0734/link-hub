import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const LinkSkeletonCard = () => {
  return (
    <Card className="relative  backdrop-blur-sm p-4 shadow-sm hover:shadow-md  bg-accent/20 hover:bg-accent/30 transition-all duration-200">
      <CardContent className={cn("px-3 relative z-0 space-y-4")}>
        <div className="flex items-center gap-4">
          <Skeleton className="size-5 bg-muted-foreground rounded-md" />
          <Skeleton className="size-8 bg-muted-foreground rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-5 w-32 mb-2 bg-muted-foreground" />
            <Skeleton className="h-4 w-48 bg-muted-foreground" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-5 rounded-full bg-muted-foreground" />
            <Skeleton className="w-6 h-6 rounded-md bg-muted-foreground" />

            <Skeleton className="w-6 h-6 rounded-md bg-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-2 pl-22">
          <Skeleton className="size-6 bg-muted-foreground " />
          <Skeleton className="size-6 bg-muted-foreground " />
          <Skeleton className="w-16 h-6 bg-muted-foreground" />

        </div>
      </CardContent>
    </Card>
  );
};

export default LinkSkeletonCard;
