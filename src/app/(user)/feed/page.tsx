"use client";
import Button from "@/components/common/Button";
import MiniProfile from "@/components/common/MiniProfile";
import FeedPrincipal from "@/components/layouts/FeedPrincipal";
import {
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

const FeedPage = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    const { user } = session;
    return (
      <main className="xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 flex">
        <div className="w-[25%] h-screen relative">
          <MiniProfile />
          <div className="mt-8">
            <div className="flex gap-4 items-center">
              <BookmarkIcon
                className="h-10 w-10 fill-indigo-600 stroke-none bg-white p-2 rounded-xl"
                aria-hidden="true"
              />
              <p className="font-medium">Guardados</p>
            </div>
            {user.userType === "enterprise" && (
              <div>
                <Button
                  icon={<PlusIcon className="h-6 w-6" aria-hidden="true" />}
                  text="Publicar oferta"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm py-4 px-8 rounded-full flex items-center gap-4"
                />
              </div>
            )}
          </div>
          <div className="absolute bottom-8 flex items-center">
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
        <FeedPrincipal />
        <div className="w-[25%] p-4">
          <div className="bg-white min-h-[30rem] rounded-3xl drop-shadow-2xl p-6 font-semibold">
            Añadir a tu feed
          </div>
        </div>
      </main>
    );
  }
  return (
    <div>
      <h1>No se encuentra authenticado</h1>
    </div>
  );
};

export default FeedPage;
