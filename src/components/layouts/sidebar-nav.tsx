"use client"

import { ArrowRightOnRectangleIcon, BellIcon, BookmarkIcon, Cog8ToothIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"
import { Cog8ToothIcon as Cog8ToothIconSolid, BellIcon as BellIconSolid } from "@heroicons/react/24/solid"
import ButtonLink from "../common/button-link"
import { user } from "@/types/next-auth";
import { ThemeToggle } from "../common/theme-toggle";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation'

interface Props {
  user: user
}

const SidebarNav: React.FC<Props> = ({ user }) => {
  const pathname = usePathname()
  return (
    <div className="mt-8 flex flex-col">
      <ButtonLink href="/bookmarks" text="Guardados" ariaLabel="Guardados" variant="ghost"
        className={`bg-background justify-start ${pathname === "/bookmarks" && "font-bold"}`}
        icon={<BookmarkIcon className={`w-6 h-6 order-first mr-4 ${pathname === "/bookmarks" && "fill-accent-foreground"}`} />} />
      <ButtonLink href="/notifications" text="Notificaciones" ariaLabel="Notificaciones" variant="ghost"
        className={`bg-background justify-start ${pathname === "/notifications" && "font-bold"}`}
        icon={pathname === "/notifications" ? <BellIconSolid className="w-6 h-6 order-first mr-4" /> : <BellIcon className="w-6 h-6 order-first mr-4" />} />
      <ThemeToggle />
      <ButtonLink href="/settings" text="Configuración" ariaLabel="Configuración" variant="ghost"
        className={`bg-background justify-start ${pathname === "/settings" && "font-bold"}`}
        icon={pathname === "/settings" ? <Cog8ToothIconSolid className="w-6 h-6 order-first mr-4" /> : <Cog8ToothIcon className="w-6 h-6 order-first mr-4" />} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full px-6 py-4 bg-background justify-start" variant="ghost">
            <EllipsisHorizontalCircleIcon className="w-6 h-6 order-first mr-4" />
            Más opciones
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl w-[15rem] xl:w-[20rem] p-0">
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm font-medium text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-accent px-6 py-4">
            <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6" />
            <span>Serrar Sesion</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {user.role === "ENTERPRISE" && (
        <ButtonLink href={`/${user.username}/submit`} text="Publicar oferta" ariaLabel="Publicar oferta" className="mt-8 child:flex child:justify-center" />
      )}
    </div>
  )
}
export default SidebarNav
