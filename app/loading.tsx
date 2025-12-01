import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button variant={'ghost'} disabled size="sm">
        <Spinner />
        Loading...
      </Button>
    </div>
  );
};

export default Loading;
