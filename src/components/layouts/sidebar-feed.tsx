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

  return (
    <div className="w-[25%] h-screen relative hidden lg:block">
      <div className="fixed h-full md:w-[14rem] lg:w-[15rem] xl:w-[20rem] hidden md:block">
        {pathname !== `/${user.username}` && <MiniProfile user={user} />}

        <SidebarNav user={user} />
      </div>
    </div>
  );
};

export default SidebarFeed;
