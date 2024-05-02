import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";
import HeaderFeed from "@/components/layouts/header-feed";
import PostFeed from "@/components/post/post-feed";
import PostFilters from "@/components/post/post-filters";
import { Separator } from "../ui/separator";

const MainFeed = async () => {
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

  return (
    <div className="flex flex-col gap-4">
      <HeaderFeed />
      <Separator />
      <PostFilters />
      <PostFeed initialPosts={posts} />
    </div>
  );
};

export default MainFeed;
