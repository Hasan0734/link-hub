"use client";
import DesignButtons from "@/components/appearance/DesignButtons";
import DesignFooter from "@/components/appearance/DesignFooter";
import DesignHeader from "@/components/appearance/DesignHeader";
import DesignSidebar from "@/components/appearance/DesignSidebar";
import DesignText from "@/components/appearance/DesignText";
import Themes from "@/components/appearance/Themes";
import Wallpaper from "@/components/appearance/backgrounds/Wallpaper";
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
import { Separator } from "@/components/ui/separator";
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
import React from "react";
import ProfilePreview from "@/components/appearance/ProfilePreview";

const Appearance = () => {
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
                <div className="col-span-4 space-y-10">
                  <DesignHeader />
                  <Separator />
                  <Themes />
                  <Separator />

                  <Wallpaper />
                  <Separator />

                  <DesignText />
                  <Separator />

                  <DesignButtons />
                  <Separator />

                  <DesignFooter />
                </div>

                <ProfilePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appearance;
