"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import data from "@/data/design.json";
import ThemeCard from "./ThemeCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Themes = () => {
  console.log(data);

  const [selectedTheme, setTheme] = useState("custom");

  const handleTheme = (id: string) => {
    setTheme(id);
  };
  return (
    <Card id="theme" className="shadow-none border-0 ">
      <Tabs defaultValue="customizable">
        <CardHeader className="px-0">
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Choose a theme for your profile page
          </CardDescription>
          <div className="flex justify-end">
            <TabsList>
            <TabsTrigger value="customizable">Customizable</TabsTrigger>
            <TabsTrigger value="curated">Curated</TabsTrigger>
          </TabsList>
          </div>
        </CardHeader>

        <CardContent className="px-0 mt-3">
          <TabsContent value="customizable">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-2">
              <div className="mb-4 last:mb-0">
                <div
                  onClick={() => handleTheme("custom")}
                  className={cn(
                    "mb-2 cursor-pointer block text-sm font-medium relative  aspect-3/4 rounded-2xl overflow-hidden border border-border hover:border-primary transition-all",
                    {
                      "border-2 border-primary": selectedTheme === "custom",
                    },
                  )}
                >
                  <div className="aspect-4/5 h-full w-full bg-background-secondary">
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="text-foreground-secondary"
                      >
                        <path d="M232,32a8,8,0,0,0-8-8c-44.08,0-89.31,49.71-114.43,82.63A60,60,0,0,0,32,164c0,30.88-19.54,44.73-20.47,45.37A8,8,0,0,0,16,224H92a60,60,0,0,0,57.37-77.57C182.3,121.31,232,76.08,232,32ZM92,208H34.63C41.38,198.41,48,183.92,48,164a44,44,0,1,1,44,44Zm32.42-94.45q5.14-6.66,10.09-12.55A76.23,76.23,0,0,1,155,121.49q-5.9,4.94-12.55,10.09A60.54,60.54,0,0,0,124.42,113.55Zm42.7-2.68a92.57,92.57,0,0,0-22-22c31.78-34.53,55.75-45,69.9-47.91C212.17,55.12,201.65,79.09,167.12,110.87Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-center">Custom</p>
                </div>
              </div>

              {data.data.appearanceOptions.themes.map((theme: any) => {
                const customize = theme.category === "customizable";

                if (!customize) {
                  return null;
                }
                return (
                  <ThemeCard
                    selectedTheme={selectedTheme}
                    handleTheme={handleTheme}
                    key={theme.id}
                    theme={theme}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="curated">
            <div className="grid lg:grid-cols-4 2xl:grid-cols-5 gap-2">
              {data.data.appearanceOptions.themes.map((theme: any) => {
                const curated = theme.category === "curated";

                if (!curated) {
                  return null;
                }
                return (
                  <ThemeCard
                    selectedTheme={selectedTheme}
                    handleTheme={handleTheme}
                    key={theme.id}
                    theme={theme}
                  />
                );
              })}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default Themes;
