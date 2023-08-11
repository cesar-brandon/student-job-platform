import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";
import HeaderFeed from "../common/HeaderFeed";
import PostFeed from "../common/PostFeed";

const MainFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
  });

  return (
    <div className="w-full lg:w-[50%] pt-6 sm:p-10">
      <div className="flex flex-col gap-4">
        <HeaderFeed />
        <PostFeed initialPosts={posts} />
      </div>
    </div>
  );
};

export default MainFeed;
