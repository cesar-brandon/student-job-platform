import { BellIcon, BookmarkIcon } from "@heroicons/react/24/outline"
import ButtonLink from "./button-link"

const SidebarNav: React.FC = () => {
  return (
    <div className="mt-8">
      <ButtonLink href="/bookmarks" text="Guardados" ariaLabel="Guardados" variant="ghost"
        className="w-full hover:bg-gray-200 justify-start" icon={<BookmarkIcon className="w-6 h-6 order-first mr-4" />} />
      <ButtonLink href="/notifications" text="Notificaciones" ariaLabel="Notificaciones" variant="ghost"
        className="w-full hover:bg-gray-200 justify-start" icon={<BellIcon className="w-6 h-6 order-first mr-4" />} />
    </div>
  )
}
export default SidebarNav
