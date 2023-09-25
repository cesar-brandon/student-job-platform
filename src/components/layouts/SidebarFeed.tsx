"use client"
import MiniProfile from "@/components/common/MiniProfile";
import SidebarNav from "@/components/common/SidebarNav";
import { user } from "@/types/next-auth";

export interface SidebarProps {
  user: user
}

const SidebarFeed = ({ user }: SidebarProps) => {
  return (
    <div className="w-[25%] h-screen relative hidden lg:block">
      <div className="fixed h-full md:w-[14rem] lg:w-[15rem] xl:w-[20rem] hidden md:block">
        <MiniProfile />
        <SidebarNav user={user} />
      </div>
    </div>
  );
};

export default SidebarFeed;
