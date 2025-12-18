import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { PageData } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

const PageCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="w-40 h-6 bg-secondary/40" />
                <Skeleton className="w-28 h-6 bg-secondary/40" />
              </div>
              <Skeleton className="w-14 rounded-full h-5 bg-secondary/40" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="block space-y-2">
              <Skeleton className="w-32 h-5 bg-secondary/40" />
              <Skeleton className="w-16 rounded-full h-5 bg-secondary/40" />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Skeleton className="w-10 h-7 rounded-md flex-1 bg-secondary/40" />
            <Skeleton className="size-7 rounded-md bg-secondary/40" />
            <Skeleton className="size-7 rounded-md bg-destructive/50" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PageCardSkeleton;
