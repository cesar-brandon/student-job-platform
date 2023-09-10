import { BellIcon, BookmarkIcon } from "@heroicons/react/24/outline"
import SidebarNavItem from "./SidebarNavItem"

const SidebarNav: React.FC = () => {
  return (
    <div className="mt-8">
      <SidebarNavItem name="Guardados" icon={<BookmarkIcon className="w-6 h-6" />} to="/bookmarks" />
      <SidebarNavItem name="Notificaciones" icon={<BellIcon className="w-6 h-6" />} to="/notifications" />
    </div>
  )
}
export default SidebarNav
