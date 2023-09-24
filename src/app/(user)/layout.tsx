import "../globals.css";
import AsideFeed from "@/components/layouts/AsideFeed";
import NavBar from "@/components/layouts/NavBar";
import SidebarFeed from "@/components/layouts/SidebarFeed";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (session && session.user) {
    const { user } = session;

    return (
      <div className="bg-black lg:bg-gray-100 dark:lg:bg-gray-950">
        <main
          vaul-drawer-wrapper=""
          className="bg-white sm:bg-gray-100 dark:sm:bg-gray-950 xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 flex justify-center z-10"
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
