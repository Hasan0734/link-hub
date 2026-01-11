import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const LinkSkeletonCard = () => {
  return (
    <Card className="relative  backdrop-blur-sm p-4 shadow-sm hover:shadow-md  bg-accent/20 hover:bg-accent/30 transition-all duration-200">
      <CardContent className={cn("px-3 relative z-0 space-y-4")}>
        <div className="flex items-center gap-4">
          <Skeleton className="hidden sm:block size-5 bg-secondary/20 rounded-md" />
          <div className="grow flex items-center gap-4">
            <Skeleton className="size-8  bg-secondary/20 rounded-full" />

            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-32 mb-2  bg-secondary/20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 sm:h-4 w-5 sm:w-48  bg-secondary/20" />
                <div className=" sm:hidden flex item-center gap-2">
                  <Skeleton className="w-10 h-5 rounded-full  bg-secondary/20" />
                  <Skeleton className="size-5 sm:size-6 rounded-md  bg-secondary/20" />
                  <Skeleton className="size-5 sm:size-6 rounded-md  bg-secondary/20" />
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Skeleton className="w-10 h-5 rounded-full  bg-secondary/20" />
              <Skeleton className="w-6 h-6 rounded-md  bg-secondary/20" />
              <Skeleton className="w-6 h-6 rounded-md  bg-secondary/20" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:pl-22">
          <Skeleton className="size-6  bg-secondary/20 " />
          <Skeleton className="size-6  bg-secondary/20 " />
          <Skeleton className="w-16 h-6  bg-secondary/20" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkSkeletonCard;
