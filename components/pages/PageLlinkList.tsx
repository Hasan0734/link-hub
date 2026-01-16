import LinkCard from "../links/LinkCard";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { getLinks } from "@/data/getLinks";

const PageLinkList = async () => {
  const links = await getLinks();

  return (
    <Card className=" border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle>Your Links ({links.data.length})</CardTitle>
        <CardDescription>
          Drag to reorder, toggle to activate/deactivate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {links.data.map((link) => (
            <LinkCard link={link} key={link.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageLinkList;
