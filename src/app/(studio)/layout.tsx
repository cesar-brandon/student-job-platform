import "../globals.css";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (session && session.user.role === "ENTERPRISE") {
    return (
      <main className="bg-background xl:w-[1440px] lg:w-[1024px] max-w-full mr-auto ml-auto py-0 lg:px-8 xl:px-16 flex justify-center">
        {children}
      </main>
    );
  }
  return redirect("/home");
}
