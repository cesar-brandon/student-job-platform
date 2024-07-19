import { Nav } from "@/components/studio/nav";
import "../globals.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getSession from "@/lib/getSession";
import { privateRoles } from "@/config";
import { db } from "@/lib/prisma";
import { Feedback } from "@/components/feedback";
import { SmartphoneIcon } from "lucide-react";

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

  // const authorizedUsers = await db.user.findMany({
  //   where: {
  //     role: {
  //       in: privateRoles,
  //     },
  //   },
  // });

  if (session && privateRoles.includes(session.user.role)) {
    return (
      <main className="bg-background ">
        <div className="hidden md:flex">
          <Nav
            defaultCollapsed={defaultCollapsed}
            user={session.user}
            counters={{ userCount, studentCount, enterpriseCount, postCount }}
          />
          <div className="min-h-screen w-full">{children}</div>
          <div className="fixed right-10 bottom-10 z-10">
            <Feedback userId={session.user.id} />
          </div>
        </div>
        <div className="w-full h-[100dvh] flex flex-col items-center justify-center gap-4 md:hidden">
          <SmartphoneIcon className="w-10 h-10 animate-bounce" />
          <p className="max-w-md text-lg font-semibold text-center text-balance">
            El Sistema no esta disponible en dispositivos móviles
          </p>
        </div>
      </main>
    );
  }
  return redirect("/home");
}
