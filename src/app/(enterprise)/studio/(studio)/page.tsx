import { cookies } from "next/headers";
import { Studio } from "@/components/studio";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";
import getSession from "@/lib/getSession";
import getUserWithReadPosts from "@/lib/data/getUserWithReadPosts";

export const metadata = {
  title: "Studio",
  description: "Studio page",
};

export default async function StudioPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const session = await getSession();
  if (!session)
    return { redirect: { destination: "/login", permanent: false } };

  const userWithReadPosts = await getUserWithReadPosts(session);

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
        user={session.user}
      />
    </div>
  );
}
