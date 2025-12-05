import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Copy, Eye, Lock, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { ShortUrl } from "@/lib/types";

const UrlsCard = ({ url }: { url: ShortUrl }) => {
  const handleCopy = (code: string, alias: string) => {
    const url = alias ? `linkhub.app/${alias}` : `linkhub.app/${code}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleDelete = (id: string) => {
    // setShortUrls(shortUrls.filter((u) => u.id !== id));
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
      <CardContent className="pt-">
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <code className="text-lg font-mono font-bold bg-accent/50 px-3 py-1 rounded-full">
                linkhub.app/{url.customAlias || url.shortCode}
              </code>
              {url.password && (
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  Protected
                </Badge>
              )}
              {url.expiresAt && (
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Expires {url.expiresAt}
                </Badge>
              )}
            </div>

            <a
              href={url.originalUrl}
              target="_blank"
              className="text-sm text-muted-foreground truncate max-w-2xl"
            >
              → {url.originalUrl}
            </a>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {url.clicks} clicks
              </Badge>
              <span>Created {url.createdAt}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
                onClick={() => handleCopy(url.shortCode, url.customAlias)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon-sm"
                onClick={() => handleDelete(url.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlsCard;
