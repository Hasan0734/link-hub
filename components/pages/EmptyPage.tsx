import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "lucide-react";

const EmptyPage = () => {
  return (
    <Empty className="border border-primary/20 border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Link />
        </EmptyMedia>
        <EmptyTitle>Page Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
     
    </Empty>
  );
};

export default EmptyPage;
