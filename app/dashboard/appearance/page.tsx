import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const Appearance = () => {
  const themes = [
    { name: "Light", bg: "bg-white", accent: "bg-slate-900" },
    { name: "Dark", bg: "bg-slate-900", accent: "bg-white" },
    {
      name: "Ocean",
      bg: "bg-gradient-to-br from-blue-400 to-cyan-500",
      accent: "bg-white",
    },
    {
      name: "Sunset",
      bg: "bg-gradient-to-br from-orange-400 to-pink-500",
      accent: "bg-white",
    },
    {
      name: "Forest",
      bg: "bg-gradient-to-br from-green-400 to-emerald-600",
      accent: "bg-white",
    },
    {
      name: "Purple",
      bg: "bg-gradient-to-br from-purple-400 to-pink-500",
      accent: "bg-white",
    },
  ];

  return (
    <>
      <AppHeader actionButton={<Button>Save Changes</Button>} />

      <div className="flex flex-1 flex-col relative">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className=" space-y-6">
              <DashboardTitle
                title="Theme Customization"
                details="Choose a theme or customize your own colors"
              />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 ">
        

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>
                      Choose a theme for your profile page
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Custom Colors</CardTitle>
                    <CardDescription>
                      Personalize your brand colors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ColorPicker className="h-[300px] max-w-sm rounded-md border bg-background p-4 shadow-sm">
                      <ColorPickerSelection />
                      <div className="flex items-center gap-4">
                        <ColorPickerEyeDropper />
                        <div className="grid w-full gap-1">
                          <ColorPickerHue />
                          <ColorPickerAlpha />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ColorPickerOutput />
                        <ColorPickerFormat />
                      </div>
                    </ColorPicker>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appearance;
