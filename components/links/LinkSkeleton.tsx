import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import LinkSkeletonCard from "./LinkSkeletonCard";

const LinkSkeleton = () => {
  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-44  bg-secondary/20"/>
          </CardTitle>
        <CardDescription>
         <Skeleton className="h-5 w-52  bg-secondary/20"/>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LinkSkeletonCard key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkSkeleton;
