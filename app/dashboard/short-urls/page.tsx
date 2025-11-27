"use client"

import AppHeader from "@/components/AppHeader";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Copy, Trash2, Eye, Calendar, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias: string;
  clicks: number;
  password: string | null;
  expiresAt: string | null;
  createdAt: string;
}

const ShortUrls = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([
    {
      id: "1",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      shortCode: "abc123",
      customAlias: "",
      clicks: 234,
      password: null,
      expiresAt: null,
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      originalUrl: "https://portfolio.com/projects/my-awesome-project",
      shortCode: "xyz789",
      customAlias: "project",
      clicks: 156,
      password: "protected",
      expiresAt: "2024-12-31",
      createdAt: "2024-01-15",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUrl, setNewUrl] = useState({
    originalUrl: "",
    customAlias: "",
    password: "",
    expiresAt: "",
  });

  const handleCreateShortUrl = () => {
    const shortCode = Math.random().toString(36).substring(2, 8);
    setShortUrls([
      ...shortUrls,
      {
        id: Date.now().toString(),
        originalUrl: newUrl.originalUrl,
        shortCode,
        customAlias: newUrl.customAlias,
        clicks: 0,
        password: newUrl.password || null,
        expiresAt: newUrl.expiresAt || null,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setIsDialogOpen(false);
    setNewUrl({
      originalUrl: "",
      customAlias: "",
      password: "",
      expiresAt: "",
    });
  };

  const handleCopy = (code: string, alias: string) => {
    const url = alias ? `linkhub.app/${alias}` : `linkhub.app/${code}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleDelete = (id: string) => {
    setShortUrls(shortUrls.filter((u) => u.id !== id));
  };
  return (
    <>
      <AppHeader title="Short URLs" />
      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Short URLs
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Create and manage short links with analytics
                  </p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Short URL
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {shortUrls.map((url) => (
                  <Card
                    key={url.id}
                    className="border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <code className="text-lg font-mono font-bold bg-accent/20 px-3 py-1 rounded">
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

                          <div className="text-sm text-muted-foreground truncate max-w-2xl">
                            → {url.originalUrl}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {url.clicks} clicks
                            </span>
                            <span>Created {url.createdAt}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleCopy(url.shortCode, url.customAlias)
                            }
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(url.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Short URL</DialogTitle>
                    <DialogDescription>
                      Generate a short link with optional customization
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="originalUrl">Long URL *</Label>
                      <Input
                        id="originalUrl"
                        value={newUrl.originalUrl}
                        onChange={(e) =>
                          setNewUrl({ ...newUrl, originalUrl: e.target.value })
                        }
                        placeholder="https://example.com/very-long-url"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customAlias">
                        Custom Alias (Optional)
                      </Label>
                      <Input
                        id="customAlias"
                        value={newUrl.customAlias}
                        onChange={(e) =>
                          setNewUrl({ ...newUrl, customAlias: e.target.value })
                        }
                        placeholder="my-link"
                      />
                      <p className="text-sm text-muted-foreground">
                        {newUrl.customAlias
                          ? `linkhub.app/${newUrl.customAlias}`
                          : "Random code will be generated"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password (Optional)</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUrl.password}
                          onChange={(e) =>
                            setNewUrl({ ...newUrl, password: e.target.value })
                          }
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiresAt">
                          Expiry Date (Optional)
                        </Label>
                        <Input
                          id="expiresAt"
                          type="date"
                          value={newUrl.expiresAt}
                          onChange={(e) =>
                            setNewUrl({ ...newUrl, expiresAt: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleCreateShortUrl}
                      className="w-full"
                      disabled={!newUrl.originalUrl}
                    >
                      Create Short URL
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortUrls;
