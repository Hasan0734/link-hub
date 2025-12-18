import PageCard from "./PageCard";
import { getPages } from "@/lib/getPages";
import PageCardSkeleton from "./PageCardSkeleton";

const PageGrid = async () => {
  const { status, data } = await getPages();

  if (!status) {
    return <div>Unauthenticate</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((page) => (
        <PageCard page={page} />
      ))}
    </div>
  );
};

export default PageGrid;
