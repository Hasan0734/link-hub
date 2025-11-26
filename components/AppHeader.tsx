import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./theme-toggle";

const AppHeader = ({
  title,
  details,
  actionButton,
}: {
  title: string;
  details?: string;
  actionButton?: React.ReactNode;
}) => {
  return (
    <header className="flex border-b h-[65px]  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div>
          <h1 className="text-base font-medium">{title}</h1>
          {details && (
            <p className="text-muted-foreground text-sm">{details}</p>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          {actionButton}
          <ThemeToggle />

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
