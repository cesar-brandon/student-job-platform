"use client";
import MiniProfile from "@/components/mini-profile";
import SidebarNav from "@/components/layouts/sidebar-nav";
import { user } from "@/types/next-auth";
import { usePathname } from "next/navigation";

export interface SidebarProps {
  user: user;
}

const SidebarFeed = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const { username } = user;

  const routes = [
    `/${username}`,
    `/${username}/cv-create`,
    `/${username}/cv-import`,
    `/${username}/cv-options`,
  ];

  return (
    <div className="w-[25%] hidden lg:flex h-screen relative">
      <div className="fixed h-full md:w-[14rem] lg:w-[15rem] xl:w-[20rem] hidden md:block">
        {!routes.includes(pathname) && <MiniProfile user={user} />}
        <SidebarNav user={user} className="mt-8" />
      </div>
    </div>
  );
};

export default SidebarFeed;
