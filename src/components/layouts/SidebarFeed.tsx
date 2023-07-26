import {
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "../common/Button";
import MiniProfile from "../common/MiniProfile";

interface SidebarProps {
  user: {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    image: string;
    userTypeId: number;
  };
}

const SidebarFeed = ({ user }: SidebarProps) => {
  return (
    <div className="w-[25%] h-screen relative hidden md:block">
      <MiniProfile />
      <div className="mt-8">
        <div className="flex gap-4 items-center">
          <BookmarkIcon
            className="h-10 w-10 fill-indigo-600 stroke-none bg-white p-2 rounded-xl"
            aria-hidden="true"
          />
          <p className="font-medium">Guardados</p>
        </div>
      </div>
      <div className="absolute bottom-8 flex flex-col items-center gap-8">
        {user.userTypeId === 2 && (
          <div>
            <Link
              href={`${user.name}/submit`}
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
  );
};

export default SidebarFeed;
