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

  const userWithReadPosts = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      readPosts: true,
    },
  });

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

  const postsWithReadStatus = posts.map((post) => ({
    ...post,
    readByUser:
      userWithReadPosts?.readPosts?.some(
        (readPost: { id: string }) => readPost.id === post.id,
      ) ?? false,
  }));

  return (
    <div className="hidden flex-col md:flex">
      <Studio
        initialPosts={postsWithReadStatus}
        userWithReadPosts={userWithReadPosts}
        defaultLayout={defaultLayout}
        user={session?.user}
      />
    </div>
  );
}
