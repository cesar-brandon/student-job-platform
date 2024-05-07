import "../globals.css";
import AsideFeed from "@/components/layouts/aside-feed";
import { NavBar } from "@/components/layouts/navbar";
import SidebarFeed from "@/components/layouts/sidebar-feed";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session && session.user) {
    const { user } = session;

    return (
      <div className="bg-background">
        <main
          vaul-drawer-wrapper=""
          className="bg-background xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 flex justify-center z-10"
        >
          <NavBar user={user} />
          <SidebarFeed user={user} />
          <div className="w-full lg:w-[75%] xl:w-[50%] lg:pr-0 xl:pr-4 pt-4 lg:pt-6 sm:p-10">
            {children}
          </div>
          <AsideFeed />
        </main>
      </div>
    );
  }
  return redirect("/");
}
