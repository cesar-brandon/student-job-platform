"use client";
import * as React from "react";
import {
  AlertCircle,
  Building,
  ChevronLeft,
  ChevronRight,
  CircleArrowLeft,
  Cog,
  File,
  MessageCircleQuestion,
  PieChart,
  Send,
  Users2,
} from "lucide-react";
import { cn, simplifyName } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { NavGroup } from "@/components/studio/nav-group";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { User } from "@prisma/client";
import Image from "next/image";
import { adminRoles, privateRoles } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountSwitcher } from "./account-switcher";

interface NavProps {
  defaultCollapsed?: boolean;
  authorizedUsers?: User[];
  user: User;
  counters: {
    userCount: number;
    studentCount: number;
    enterpriseCount: number;
    postCount: number;
  };
}

export function Nav({
  defaultCollapsed,
  authorizedUsers,
  user,
  counters,
}: NavProps) {
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
          className="absolute -right-4 top-1/2 transform -translate-y-1/2
          z-10 flex rounded-full"
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
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image || ""} alt="Foto de perfil" />
            <AvatarFallback>
              {simplifyName(user.name.toUpperCase())}
            </AvatarFallback>
          </Avatar>
          <span className={cn("max-w-40 truncate", isCollapsed && "hidden")}>
            {user.name}
          </span>
        </div>

        {/* <div */}
        {/*   className={cn( */}
        {/*     "flex h-[56px] items-center justify-center", */}
        {/*     isCollapsed ? "h-[56px]" : "px-2", */}
        {/*   )} */}
        {/* > */}
        {/*   <AccountSwitcher */}
        {/*     user={user} */}
        {/*     isCollapsed={isCollapsed} */}
        {/*     accounts={authorizedUsers} */}
        {/*   /> */}
        {/* </div> */}

        <Separator />
        {privateRoles.includes(user.role) && (
          <NavGroup
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Puestos",
                label: counters.postCount || "",
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
            ]}
          />
        )}
        <Separator />
        {adminRoles.includes(user.role) && (
          <NavGroup
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Usuarios",
                label: counters.userCount,
                href: "/studio/users",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Estudiantes",
                label: counters.studentCount,
                href: "/studio/students",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Empresas",
                label: counters.enterpriseCount,
                href: "/studio/enterprises",
                icon: Building,
                variant: "ghost",
              },
            ]}
          />
        )}

        <Separator />
        {privateRoles.includes(user.role) && (
          <NavGroup
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Configuración",
                href: "/studio/settings",
                icon: Cog,
                variant: "ghost",
              },
              {
                title: "Cuestionario",
                href: "https://docs.google.com/forms/d/e/1FAIpQLSentVI056EKSdnPZy42B3nRZXYjCykPLdai0LX48j7bXwphnQ/viewform?usp=sf_link",
                icon: MessageCircleQuestion,
                variant: "ghost",
              },

              // {
              //   title: "Anuncios",
              //   label: 22,
              //   href: "/studio/ads",
              //   icon: AlertCircle,
              //   variant: "checked",
              // },
            ]}
          />
        )}
        {/* <Separator /> */}
        {/* {adminRoles.includes(user.role) && ( */}
        {/*   <NavGroup */}
        {/*     isCollapsed={isCollapsed} */}
        {/*     links={[ */}
        {/*       { */}
        {/*         title: "Encuestas", */}
        {/*         label: 2, */}
        {/*         href: "/studio/surveys", */}
        {/*         icon: PieChart, */}
        {/*         variant: "ghost", */}
        {/*       }, */}
        {/*     ]} */}
        {/*   /> */}
        {/* )} */}
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
