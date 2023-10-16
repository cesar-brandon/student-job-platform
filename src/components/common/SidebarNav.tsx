import { ArrowRightOnRectangleIcon, BellIcon, BookmarkIcon, Cog8ToothIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"
import ButtonLink from "./button-link"
import { user } from "@/types/next-auth";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface Props {
  user: user
}

const SidebarNav: React.FC<Props> = ({ user }) => {
  return (
    <div className="mt-8 flex flex-col">
      <ButtonLink href="/bookmarks" text="Guardados" ariaLabel="Guardados" variant="ghost"
        className="bg-background justify-start " icon={<BookmarkIcon className="w-6 h-6 order-first mr-4" />} />
      <ButtonLink href="/notifications" text="Notificaciones" ariaLabel="Notificaciones" variant="ghost"
        className="bg-background justify-start " icon={<BellIcon className="w-6 h-6 order-first mr-4" />} />
      <ThemeToggle />
      <ButtonLink href="/settings" text="Configuración" ariaLabel="Configuración" variant="ghost"
        className="bg-background justify-start" icon={<Cog8ToothIcon className="w-6 h-6 order-first mr-4" />} />
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
        <ButtonLink href={`/${user.name}/submit`} text="Publicar oferta" ariaLabel="Publicar oferta" className="mt-8" />
      )}
    </div>
  )
}
export default SidebarNav
