import DesignButtons from "@/components/appearance/DesignButtons";
import DesignFooter from "@/components/appearance/DesignFooter";
import DesignHeader from "@/components/appearance/DesignHeader";
import DesignSidebar from "@/components/appearance/DesignSidebar";
import DesignText from "@/components/appearance/DesignText";
import Themes from "@/components/appearance/Themes";
import Wallpaper from "@/components/appearance/Wallpaper";
import AppHeader from "@/components/AppHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";
import Link from "next/link";

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
          <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 relative">
            <div className=" space-y-6">
              <DashboardTitle
                className="sticky top-0 pt-3 pb-2 z-20 bg-background"
                title="Theme Customization"
                details="Choose a theme or customize your own colors"
              />

              <div className="grid grid-cols-1 xl:grid-cols-9 gap-5 items-start relative">
                <DesignSidebar />
                <div className="col-span-4">
                  <DesignHeader />
                  <Themes />
                  <Wallpaper />
                  <DesignText />
                  <DesignButtons />
                  <DesignFooter />
                </div>

                <Card className="shadow-md col-span-3 sticky top-28">
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
