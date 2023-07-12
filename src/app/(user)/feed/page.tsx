"use client";
import Button from "@/components/common/Button";
import Post from "@/components/common/Post";
import {
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const metadata = {
  title: "Feed",
  description: "Pagina de Feed",
};

function getFirstTwoWords(fullName: string): string {
  const words = fullName.split(" ");
  const firstTwoWords = words.slice(0, 2);
  return firstTwoWords.join(" ");
}

function generateUsername(fullName: string): string {
  const words = fullName.split(" ");
  const firstTwoWords = words.slice(0, 2);
  const username = `@${firstTwoWords.join("").toLowerCase()}`;
  return username;
}

const FeedPage = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <main className="xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 flex">
        <div className="w-[25%] h-screen relative">
          <div className="min-h-[15rem] bg-yellow-300 flex flex-col px-8">
            <div className="py-4">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="bg-gray-50 border-none outline-none text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <div className="flex mt-12 gap-4 items-center">
              <div>
                <Image
                  className="rounded-2xl"
                  src={session.user.image}
                  alt="Picture of the author"
                  width={70}
                  height={70}
                />
              </div>
              <div>
                <h3 className="font-bold">
                  {getFirstTwoWords(session.user.name)}
                </h3>
                <p className="text-black text-opacity-50">
                  {generateUsername(session.user.name)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex gap-4 items-center">
              <BookmarkIcon
                className="h-10 w-10 fill-indigo-600 stroke-none bg-white p-2 rounded-xl"
                aria-hidden="true"
              />
              <p className="font-medium">Guardados</p>
            </div>
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
          <Post token={session.user.accessToken} />
        </div>

        <div className="w-[50%] p-10">
          <div className="flex gap-4">
            <Button
              text="Experiencia"
              className="border-2 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-sm text-blue-500 font-semibold py-2 px-4 rounded-full transition"
            />
            <Button
              text="Carga Horaria"
              className="border-2 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-sm text-blue-500 font-semibold py-2 px-4 rounded-full transition"
            />
            <Button
              text="Modalidad"
              className="border-2 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white text-sm text-blue-500 font-semibold py-2 px-4 rounded-full transition"
            />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div className="w-full min-h-[8rem] bg-white rounded-3xl p-4 hover:drop-shadow-xl transition">
              <strong className="text-blue-500 text-lg">Titulo</strong>
              <div className="flex gap-2">
                <p className="font-bold">empresa -</p>

                <p>fecha de publicacion</p>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                fuga deleniti! Excepturi nostrum molestiae unde natus optio.
              </p>
            </div>
            <div className="w-full min-h-[8rem] bg-white rounded-3xl p-4 hover:drop-shadow-xl transition">
              <strong className="text-blue-500 text-lg">Titulo</strong>
              <div className="flex gap-2">
                <p className="font-bold">empresa -</p>

                <p>fecha de publicacion</p>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                fuga deleniti! Excepturi nostrum molestiae unde natus optio.
              </p>
            </div>
            <div className="w-full min-h-[8rem] bg-white rounded-3xl p-4 hover:drop-shadow-xl transition">
              <strong className="text-blue-500 text-lg">Titulo</strong>
              <div className="flex gap-2">
                <p className="font-bold">empresa -</p>

                <p>fecha de publicacion</p>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                fuga deleniti! Excepturi nostrum molestiae unde natus optio.
              </p>
            </div>
          </div>
        </div>

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
