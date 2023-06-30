"use client";
import Button from "@/components/common/Button";
import Post from "@/components/common/Post";
import { signOut, useSession } from "next-auth/react";

const FeedPage = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <h1> Feed: {session.user.name}</h1>
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          text="Serrar Sesion"
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
        />
        <Post token={session.user.accessToken} />
      </div>
    );
  }
  return (
    <div>
      <h1>No se encuentra authenticado</h1>
    </div>
  );
};

export default FeedPage;
