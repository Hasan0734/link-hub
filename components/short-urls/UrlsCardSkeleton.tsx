import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Copy, Eye, Lock, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { ShortUrl } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

const UrlsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card
          key={i}
          className=" backdrop-blur-sm hover:shadow-lg transition-all duration-200"
        >
          <CardContent className="px-2 sm:px-6">
            <div className="flex flex-col sm:flex-row items-end sm:items-start  gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-52 md:w-62 h-6 md:h-8 rounded-full bg-secondary/30" />
                  <div className="hidden sm:block">
                    <Skeleton className="w-20 h-5 rounded-full bg-primary" />
                  </div>
                </div>
                <Skeleton className="w-52 md:w-74 h-6 md:h-8 rounded-full bg-secondary/30" />

                <Skeleton className="w-62 h-5 rounded-full bg-blue-500/40" />
                <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground">
                  <Skeleton className="w-20 h-5 rounded-full bg-secondary/50" />
                  <Skeleton className="w-40 h-5 rounded-full bg-secondary/20" />
                  <Skeleton className="w-40 h-5 rounded-full bg-secondary/20" />
                </div>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <div className="block sm:hidden">
                  <Skeleton className="w-20 h-5 rounded-full bg-primary" />
                </div>
                <Skeleton className="size-6 sm:size-8 rounded-md bg-destructive/40" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UrlsCardSkeleton;
