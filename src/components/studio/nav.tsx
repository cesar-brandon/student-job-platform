import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResizablePanel } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { AccountSwitcher } from "@/components/studio/account-switcher";
import { NavGroup } from "@/components/studio/nav-item";

interface NavProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  navCollapsedSize: number;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
}

export function Nav({
  accounts,
  navCollapsedSize,
  defaultLayout,
  defaultCollapsed,
}: NavProps) {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(
    defaultCollapsed || false
  );

  return (
    <ResizablePanel
      defaultSize={defaultLayout ? defaultLayout[0] : undefined}
      collapsedSize={navCollapsedSize}
      collapsible={true}
      minSize={15}
      maxSize={20}
      onCollapse={() => {
        setIsCollapsed(!isCollapsed);
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          !isCollapsed
        )}`;
      }}
      className={cn(
        isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
      )}
    >
      <div
        className={cn(
          "flex h-[52px] items-center justify-center",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
      </div>
      <Separator />
      <NavGroup
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            label: "128",
            icon: Inbox,
            variant: "default",
          },
          {
            title: "Drafts",
            label: "9",
            icon: File,
            variant: "ghost",
          },
          {
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveX,
            variant: "ghost",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
          },
          {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
      <Separator />
      <NavGroup
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Social",
            label: "972",
            icon: Users2,
            variant: "ghost",
          },
          {
            title: "Updates",
            label: "342",
            icon: AlertCircle,
            variant: "ghost",
          },
          {
            title: "Forums",
            label: "128",
            icon: MessagesSquare,
            variant: "ghost",
          },
          {
            title: "Shopping",
            label: "8",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            title: "Promotions",
            label: "21",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
    </ResizablePanel>
  );
}
