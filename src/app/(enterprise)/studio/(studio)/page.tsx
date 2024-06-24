import { cookies } from "next/headers";
import { Studio } from "@/components/studio/studio";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";
import getSession from "@/lib/getSession";

export const metadata = {
  title: "Studio",
  description: "Studio page",
};

export default async function StudioPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const session = await getSession();

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      applies: {
        include: {
          user: true,
        },
      },
      author: true,
      comments: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <div className="hidden flex-col md:flex">
      <Studio
        initialPosts={posts}
        defaultLayout={defaultLayout}
        user={session?.user}
      />
    </div>
  );
}
