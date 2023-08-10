import LoadingIcon from "@/components/common/LoadingIcon";
import AsideFeed from "@/components/layouts/AsideFeed";
import MainFeed from "@/components/layouts/MainFeed";
import NavBar from "@/components/layouts/NavBar";
import SidebarFeed from "@/components/layouts/SidebarFeed";
import { getAuthSession } from "@/lib/auth";

const FeedPage = async () => {
  const session = await getAuthSession();

  if (session && session.user) {
    const { user } = session;
    return (
      <>
        <NavBar />
        <SidebarFeed user={user} />
        <MainFeed />
        <AsideFeed />
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
