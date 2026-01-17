import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "@/data/design.json";

const Themes = () => {
  console.log(data);

  return (
    <Card className="shadow-md col-span-4">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Choose a theme for your profile page</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customizable">
          <TabsList>
            <TabsTrigger value="customizable">Customizable</TabsTrigger>
            <TabsTrigger value="curated">Curated</TabsTrigger>
          </TabsList>
          <TabsContent value="customizable">
            <RadioGroup
              className="grid grid-cols-5 gap-2"
              defaultValue="comfortable"
            >
              {data.data.appearanceOptions.themes.map((theme: any) => {
                const customize = theme.category === "customizable";

                if (customize) {
                  return (
                    <div key={theme.id} className="mb-4 last:mb-0">
                      <Label className="mb-2 block text-sm font-medium relative  aspect-3/4 rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition-all">
                        <div className={`absolute inset-0`}>
                          {/* <Image
                        className="aspect-4/5 h-full w-full object-cover"
                        width={250}
                        height={250}
                        alt={theme.title}
                        src={theme.thumbnailUrl}
                      /> */}
                          {theme.thumbnailUrl.endsWith(".mp4") ? (
                            <video
                              className="aspect-4/5 h-full w-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            >
                              <source
                                src={theme.thumbnailUrl}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <img
                              className="aspect-4/5 h-full w-full object-cover"
                              src={theme.thumbnailUrl}
                              alt={theme.title}
                            />
                          )}
                        </div>
                      </Label>

                      <div className="text-white">
                        <p className="text-sm font-medium text-center">
                          {theme.title}
                        </p>
                      </div>
                      <RadioGroupItem
                        value={theme.id}
                        className="hidden"
                      ></RadioGroupItem>
                    </div>
                  );
                }
                return null;
              })}
            </RadioGroup>
          </TabsContent>
          <TabsContent value="curated">
            <RadioGroup
              className="grid grid-cols-5 gap-2"
              defaultValue="comfortable"
            >
              {data.data.appearanceOptions.themes.map((theme: any) => {
                const curated = theme.category === "curated";

                if (curated) {
                  return (
                    <div key={theme.id} className="mb-4 last:mb-0">
                      <Label className="mb-2 block text-sm font-medium relative  aspect-3/4 rounded-2xl overflow-hidden border-2 border-border hover:border-primary transition-all">
                        <div className={`absolute inset-0`}>
                          {/* <Image
                        className="aspect-4/5 h-full w-full object-cover"
                        width={250}
                        height={250}
                        alt={theme.title}
                        src={theme.thumbnailUrl}
                      /> */}
                          {theme.thumbnailUrl.endsWith(".mp4") ? (
                            <video
                              className="aspect-4/5 h-full w-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            >
                              <source
                                src={theme.thumbnailUrl}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <img
                              className="aspect-4/5 h-full w-full object-cover"
                              src={theme.thumbnailUrl}
                              alt={theme.title}
                            />
                          )}
                        </div>
                      </Label>

                      <div className="text-white">
                        <p className="text-sm font-medium text-center">
                          {theme.title}
                        </p>
                      </div>
                      <RadioGroupItem
                        value={theme.id}
                        className="hidden"
                      ></RadioGroupItem>
                    </div>
                  );
                }
                return null;
              })}
            </RadioGroup>
          </TabsContent>
        </Tabs>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {themes.map((theme) => (
                        <button
                          key={theme.name}
                          className="group relative aspect-3/4 rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all"
                        >
                          <div className={`absolute inset-0 ${theme.bg}`} />
                          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 space-y-2">
                            <div
                              className={`h-8 ${theme.accent} rounded-full opacity-80`}
                            />
                            <div
                              className={`h-8 ${theme.accent} rounded-full opacity-80`}
                            />
                            <div
                              className={`h-8 ${theme.accent} rounded-full opacity-80`}
                            />
                          </div>
                          <div className="absolute bottom-0 inset-x-0 p-3 bg-background/80 backdrop-blur-sm">
                            <p className="text-sm font-medium text-center">
                              {theme.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div> */}
      </CardContent>
    </Card>
  );
};

export default Themes;
