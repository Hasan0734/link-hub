"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Link as LinkIcon,
  Palette,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Links", href: "/dashboard/links", icon: LinkIcon },
  { name: "Appearance", href: "/dashboard/appearance", icon: Palette },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <Button size={"icon-sm"} className="rounded-xl">
                  <LinkIcon className="w-5 h-5 text-primary-foreground" />
                </Button>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">LinkHub</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={isActive}
                      size={"lg"}
                      className={
                        " px-4 cursor-pointer w-full h-10"
                      }
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4!" />
                        <span className="">
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Link href="/johndoe" className="block cursor-pointer">
          <Button
            variant="outline"
            className="w-full rounded-lg  justify-start"
            size="lg"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            View Public Page
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
