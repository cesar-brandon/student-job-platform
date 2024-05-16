import { cookies } from "next/headers";
import { Studio } from "@/components/studio/studio";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Studio",
  description: "Studio page",
};

export default async function StudioPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

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
      votes: true,
      author: true,
      comments: true,
      bookmarks: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <div className="hidden flex-col md:flex">
      <Studio initialPosts={posts} defaultLayout={defaultLayout} />
    </div>
  );
}
