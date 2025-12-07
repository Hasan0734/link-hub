"use client";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Edit, Ellipsis, Eye, Lock, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { ShortUrl } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CopyButton } from "../ui/copy-button";
import { toast } from "sonner";

import UrlCardAction from "./UrlCardAction";

const UrlsCard = ({ url }: { url: ShortUrl }) => {
  //   const handleDelete = (id: string) => {
  //     // setShortUrls(shortUrls.filter((u) => u.id !== id));
  //   };

  const handleCopy = (value: string | undefined | null) => {
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      toast.success("Link copied!");
    });
  };



  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
      <CardContent className="pt-1 px-2 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap flex-col sm:flex-row 2xl:flex-col md:items-center gap-2">
              {/* short code url */}
              <div
                onClick={() => handleCopy(url?.shortCode)}
                className="group overflow-hidden relative rounded-full"
                // href={`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode}`}
              >
                <code className="text-xs lg:text-lg font-mono font-bold bg-accent/50 px-3 py-1 rounded-full z-0">
                  {process.env.NEXT_PUBLIC_APP_URL}/{url.shortCode}
                  {/* linkhub.app */}
                </code>
                <div className="transform translate-y-7 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center w-full h-8  bg-accent/80 absolute top-0 z-10 backdrop-blur-sm">
                  <CopyButton
                    variant={"ghost"}
                    content={url.shortCode}
                    size={"sm"}
                  />
                </div>
              </div>

              {/* custom alias */}
              {url.customAlias && (
                <div
                  onClick={() => handleCopy(url?.customAlias)}
                  className="group overflow-hidden relative rounded-full"
                  // href={`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode}`}
                >
                  <code className="text-xs lg:text-lg font-mono font-bold bg-accent/50 px-3 py-1 rounded-full z-0">
                    {process.env.NEXT_PUBLIC_APP_URL}/{url.customAlias}
                    {/* linkhub.app */}
                  </code>
                  <div className="transform translate-y-7 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center w-full h-8  bg-accent/80 absolute top-0 z-10 backdrop-blur-sm">
                    <CopyButton
                      variant={"ghost"}
                      content={url.customAlias}
                      size={"sm"}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <a
                href={url.originalUrl}
                target="_blank"
                className="text-sm text-muted-foreground truncate max-w-64 sm:max-w-['content-width'] transition-all duration-150 hover:text-blue-300  hover:underline underline-offset-2 whitespace-nowrap line-clamp-1"
              >
                → {url.originalUrl}
              </a>
            </div>

            <div className="flex flex-wrap md:items-center gap-3 text-sm text-muted-foreground">
              <Badge className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {url.clicks} clicks
              </Badge>
              {url.password && (
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  Protected
                </Badge>
              )}
              {url.expiresAt && (
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Expires {formatDate(url.expiresAt)}
                </Badge>
              )}

              <Badge className="bg-secondary/30">
                Created: {formatDate(url.createdAt)}
              </Badge>
            </div>
          </div>

        <UrlCardAction id={url.id}/>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlsCard;
