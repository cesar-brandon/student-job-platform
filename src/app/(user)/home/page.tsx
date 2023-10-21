import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/prisma";
import HeaderFeed from "@/components/common/HeaderFeed";
import PostFeed from "@/components/common/PostFeed";
import PostFilters from "@/components/common/PostFilters";

export const metadata = {
  title: "Home",
  description: "Home page",
}

const HomePage = async () => {
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
    <div className="flex flex-col gap-4">
      <HeaderFeed />
      <PostFilters />
      <PostFeed initialPosts={posts} />
    </div>
  );
}

export default HomePage;
