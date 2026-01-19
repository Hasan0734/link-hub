"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import ProButton from "./ProButton";
import { Switch } from "../ui/switch";
import { IconLayoutBottombar } from "@tabler/icons-react";

const DesignFooter = () => {
  const [isToggle, setToggle] = useState(false);
  return (
    <section id="footer">
      <Card className="shadow-none border-0 ">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Buttons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <Button
            variant={"outline"}
            size={"lg"}
            className="h-12 group cursor-pointer rounded-2xl w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
                <IconLayoutBottombar />
            <span>Hide LinkHub footer</span>
            </div>
            <div className="flex items-center gap-2">
              <ProButton className="inline-flex! relative top-0 right-0" />
              <Switch
                checked={isToggle}
                onCheckedChange={(val) => setToggle(val)}
              />
            </div>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default DesignFooter;
