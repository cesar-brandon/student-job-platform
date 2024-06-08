import { Nav } from "@/components/studio/nav";
import "../globals.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getSession from "@/lib/getSession";
import { privateRoles } from "@/config";
import { db } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const [userCount, studentCount, enterpriseCount, postCount] =
    await db.$transaction([
      db.user.count(),
      db.student.count(),
      db.enterprise.count(),
      db.post.count(),
    ]);

  if (session && privateRoles.includes(session.user.role)) {
    return (
      <main className="bg-background flex justify-center">
        <Nav
          defaultCollapsed={defaultCollapsed}
          user={session.user}
          counters={{ userCount, studentCount, enterpriseCount, postCount }}
        />
        <div className="min-h-screen w-full">{children}</div>
      </main>
    );
  }
  return redirect("/home");
}
