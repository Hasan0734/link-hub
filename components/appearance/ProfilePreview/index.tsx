import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";

const ProfilePreview = () => {
  return (
    <Card className="shadow-none col-span-3 sticky top-28">
     
      <CardContent className="relative border flex aspect-[393/852] max-h-[120vh] w-[340px] max-w-[394px] origin-center scale-[1] flex-col items-center gap-10 md:min-w-[394px] md:scale-[0.45] lg:scale-[0.6] xl:scale-[0.7] [@media(min-width:1536px)_and_(min-height:1000px)]:scale-[0.85] [@media(min-width:1536px)_and_(min-height:1200px)]:scale-[0.9]"></CardContent>
    </Card>
  );
};

export default ProfilePreview;
