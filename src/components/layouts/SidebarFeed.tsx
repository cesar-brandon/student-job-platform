"use client";

import {
  ArrowRightOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../common/Button";
import MiniProfile from "../common/MiniProfile";
import SidebarNav from "../common/SidebarNav";

interface SidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    image: string;
    role: string;
  };
}

const SidebarFeed = ({ user }: SidebarProps) => {
  return (
    <div className="w-[25%] h-screen relative hidden lg:block">
      <div className="fixed h-full md:w-[14rem] lg:w-[15rem] xl:w-[20rem] hidden md:block">
        <MiniProfile />
        <SidebarNav />
        <div className="absolute bottom-8 flex flex-col items-center gap-8">
          {user.role === "ENTERPRISE" && (
            <div>
              <Link
                href={`user/${user.name}/submit`}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm py-3 px-5 rounded-full flex items-center gap-4"
              >
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
                Publicar oferta
              </Link>
            </div>
          )}
          <div className="flex items-center">
            <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              text="Serrar Sesion"
              className="text-gray-800 font-semibold py-2 px-4 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFeed;
