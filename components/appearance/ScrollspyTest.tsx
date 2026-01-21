"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";

export default function Demo() {
  const [scrollContainer, setScrollContainer] =
    React.useState<HTMLDivElement | null>(null);

  const nav = [
    {
      id: "section-1",
      label: "Section 1",
    },
    {
      id: "section-2",
      label: "Section 2",
    },
    {
      id: "section-3",
      label: "Section 3",
    },
    {
      id: "section-4",
      label: "Section 4",
    },
    {
      id: "section-5",
      label: "Section 5",
    },
  ];

  return (
    <ScrollSpy
      offset={16}
      scrollContainer={scrollContainer}
      className="h-[400px] w-full border"
    >
      <div className="flex grow gap-5">
        <div className="flex flex-col gap-2 w-[150px]">
          <ScrollSpyNav  className="flex flex-col gap-2.5">
            {nav.map((item) => (
              <ScrollSpyLink value={item.id} key={item.id} asChild>
                <Button
                  key={item.id}
                  variant="secondary"
                  data-scrollspy-anchor={item.id}
                >
                  {item.label}
                </Button>
              </ScrollSpyLink>
            ))}
          </ScrollSpyNav>
        </div>
        <div className="grow">
          <ScrollSpyViewport
            ref={setScrollContainer}
            className="h-[500px] overflow-y-auto p-4"
          >
            <div className="space-y-8">
              {nav.map((item) => (
                <ScrollSpySection
                  value={item.id}
                  key={item.id}
                  id={item.id}
                  className="space-y-2.5"
                >
                  <h3 className="text-foreground text-base">{item.label}</h3>
                  <div className="bg-muted rounded-lg h-[350px]"></div>
                </ScrollSpySection>
              ))}
            </div>
          </ScrollSpyViewport>
        </div>
      </div>
    </ScrollSpy>
  );
}
