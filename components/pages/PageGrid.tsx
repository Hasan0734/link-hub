import PageCard from "./PageCard";

import EmptyPage from "./EmptyPage";
import { getPages } from "@/data/getPages";

const PageGrid = async () => {
  const { status, data } = await getPages();

  if (!status) {
    return <div>Unauthenticate</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>
      {data.length === 0 && (
        <div className="max-w-xl mx-auto mt-20">
          <EmptyPage />
        </div>
      )}
    </div>
  );
};

export default PageGrid;
