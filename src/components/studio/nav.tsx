"use client";
import * as React from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CircleArrowLeft,
  Cog,
  File,
  Send,
  Users2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AccountSwitcher } from "@/components/studio/account-switcher";
import { NavGroup } from "@/components/studio/nav-item";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { accounts } from "@/components/studio/data";
import { User } from "@prisma/client";
import Image from "next/image";

interface NavProps {
  defaultCollapsed?: boolean;
  user: User;
}

export function Nav({ defaultCollapsed, user }: NavProps) {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(
    defaultCollapsed || false,
  );

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "relative border-r-[1px] min-w-60",
          isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out",
        )}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              !isCollapsed,
            )}`;
          }}
          className="absolute -right-2 top-1/2 transform -translate-y-1/2
          z-10 flex w-7"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>

        <div
          className={cn(
            "flex gap-3 h-[56px] items-center",
            isCollapsed ? "h-[56px] justify-center" : "px-4 justify-start",
          )}
        >
          <div className="h-9 w-9 overflow-hidden flex items-center justify-center rounded-sm">
            <Image
              src={user.image || ""}
              alt="Avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className={cn("max-w-40 truncate", isCollapsed && "hidden")}>
            {user.name}
          </span>
        </div>

        {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
        <Separator />
        <NavGroup
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Puestos",
              label: "128",
              href: "/studio",
              icon: File,
              variant: "ghost",
            },
            {
              title: "Publicar oferta",
              href: `/studio/${user.username}/submit`,
              icon: Send,
              variant: "ghost",
            },
            {
              title: "Estudiantes",
              label: "420",
              href: "/studio/students",
              icon: Users2,
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <NavGroup
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Cuenta",
              href: "/studio/account",
              icon: Cog,
              variant: "ghost",
            },
            {
              title: "Encuestas",
              label: "972",
              href: "/studio/surveys",
              icon: Users2,
              variant: "ghost",
            },
            {
              title: "Anuncios",
              label: "342",
              href: "/studio/ads",
              icon: AlertCircle,
              variant: "checked",
            },
          ]}
        />
        <div
          className={cn(
            "absolute bottom-10 left-0 w-full",
            isCollapsed ? "px-2" : "p-3",
          )}
        >
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/home"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                  )}
                >
                  <CircleArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Volver al inicio</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                <span className="ml-auto text-muted-foreground">
                  Volver al inicio
                </span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/home"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full justify-start",
              )}
            >
              <CircleArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
