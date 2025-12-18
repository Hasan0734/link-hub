"use client";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Eye, Lock } from "lucide-react";

import { ShortUrl } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

import UrlCardAction from "./UrlCardAction";
import ShortUrlLink from "./Short-url";
import { useTransition } from "react";
import { Spinner } from "../ui/spinner";
import LinkAnalyticsDialog from "./LinkAnalyticsDialog";

const UrlsCard = ({ url }: { url: ShortUrl }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, startEditing] = useTransition();

  console.log(isPending)

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 relative ">
      <CardContent
        className={cn("pt-1 px-2 sm:px-6 relative z-0", {
          blur: isPending || isEditing,
        })}
      >
        <div className="grid gap-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 flex flex-wrap flex-col sm:flex-row md:items-center gap-2">
              <ShortUrlLink url={url?.shortCode} />

              {url.customAlias && <ShortUrlLink url={url?.customAlias} />}
            </div>
            {isPending ? (
              <Spinner />
            ) : (
              <UrlCardAction
                isEditing={isEditing}
                data={url}
                startTransition={startTransition}
                startEditing={startEditing}
              />
            )}
          </div>

          <div className="">
            <a
              href={url.originalUrl}
              target="_blank"
              className="text-sm text-muted-foreground truncate 
                transition-all duration-150 max-w-64 sm:max-w-max 2xl:max-w-2xl
                hover:text-blue-300  hover:underline underline-offset-2
                 whitespace-nowrap line-clamp-1  inline-block"
            >
              → {url.originalUrl}
            </a>
          </div>

          <div className="flex flex-wrap  gap-3 text-sm text-muted-foreground">
            <Badge className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {url.clicks} clicks
            </Badge>

            <LinkAnalyticsDialog />

            {url.password && (
              <Badge variant="secondary">
                <Lock className="h-3 w-3 mr-1" />
                Protected
              </Badge>
            )}
            {url.expiresAt && (
              <Badge className="bg-secondary/30">
                <Calendar className="h-3 w-3 mr-1" />
                Expires: {formatDate(url.expiresAt)}
              </Badge>
            )}

            <Badge className="bg-secondary/30">
              Created: {formatDate(url.createdAt)}
            </Badge>
          </div>
        </div>
      </CardContent>
      {(isPending ||  isEditing) &&   (
    
          <div className="absolute z-10 w-full h-full bg-accent/10 top-0 rounded-xl flex items-center justify-center gap-2 brightness-75">
            <Spinner />
            {isPending && "Deleting..."}
            {isEditing && "Editing..."}
          </div>
       )} 
    </Card>
  );
};

export default UrlsCard;
