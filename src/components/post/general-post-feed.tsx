import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";
import PostFeed from "@/components/post/post-feed";

const GeneralPostFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      applies: true,
      votes: true,
      author: true,
      comments: true,
      bookmarks: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  });

  return <PostFeed initialPosts={posts} />;
};

export default GeneralPostFeed;
