"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SelectFont from "./SelectFont";
import TextSize from "./TextSize";
import TitleColorPicker from "./TitleColorPicker";

const DesignText = () => {
  return (
    <section id="text">
      <Card className="shadow-none border-0 ">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          <SelectFont title="Title Font" />
          <TitleColorPicker title="Title Color" />
          <TextSize />
          <div className="space-y-3">
            <h4 className="text-base font-medium">Page and buttons</h4>
            <SelectFont title="Font" />
          </div>

          <TitleColorPicker title="Page text color" />
          <TitleColorPicker title="Button text color" />
        </CardContent>
      </Card>
    </section>
  );
};

export default DesignText;
