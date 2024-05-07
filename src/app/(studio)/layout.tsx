import { Nav } from "@/components/studio/nav";
import "../globals.css";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  if (session && session.user.role === "ENTERPRISE") {
    return (
      <main className="bg-background flex justify-center">
        <Nav defaultCollapsed={defaultCollapsed} user={session.user}/>
        {children}
      </main>
    );
  }
  return redirect("/home");
}
