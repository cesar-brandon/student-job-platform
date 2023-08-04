"use client";
import LoadingIcon from "@/components/common/LoadingIcon";
import AsideFeed from "@/components/layouts/AsideFeed";
import MainFeed from "@/components/layouts/MainFeed";
import NavBar from "@/components/layouts/NavBar";
import SidebarFeed from "@/components/layouts/SidebarFeed";
import { useSession } from "next-auth/react";

const FeedPage = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session && session.user) {
    const { user } = session;
    return (
      <>
        <SidebarFeed user={user} />
        <MainFeed />
        <AsideFeed />
        <NavBar />
      </>
    );
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoadingIcon />
    </div>
  );
};

export default FeedPage;
