import { Nav } from "@/components/studio/nav";
import "../globals.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getSession from "@/lib/getSession";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  if (session && session.user.role === "ENTERPRISE") {
    return (
      <main className="bg-background flex justify-center">
        <Nav defaultCollapsed={defaultCollapsed} user={session.user} />
        <div className="min-h-screen w-full">{children}</div>
      </main>
    );
  }
  return redirect("/home");
}
