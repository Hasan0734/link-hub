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
        <Card key={i} className=" backdrop-blur-sm hover:shadow-lg transition-all duration-200">
          <CardContent className="pt-">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-40 h-8 rounded-full" />
                  <Skeleton className="w-20 h-5 rounded-full bg-secondary/50" />
                  <Skeleton className="w-20 h-5 rounded-full border border-primary/50" />
                
                </div>
                <Skeleton className="w-52 h-5 rounded-full" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Skeleton className="w-20 h-5 rounded-full bg-primary" />
                  <Skeleton className="w-20 h-5 rounded-full" />
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton className="w-8 h-8 rounded-md bg-secondary/50" />
                <Skeleton className="w-8 h-8 rounded-md bg-destructive/40" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UrlsCardSkeleton;
