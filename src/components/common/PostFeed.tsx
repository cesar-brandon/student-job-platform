import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  authorName?: string;
}

const PostFeed = ({ initialPosts, authorName }: PostFeedProps) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!authorName ? `&authorName=${authorName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <div className="flex flex-col gap-4 px-4 sm:p-0">
      <div className="w-full min-h-[8rem] bg-white rounded-3xl p-4 hover:drop-shadow-xl transition">
        <strong className="text-blue-500 text-lg">Titulo</strong>
        <div className="flex gap-2">
          <p className="font-bold">empresa -</p>

          <p>fecha de publicacion</p>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, fuga
          deleniti! Excepturi nostrum molestiae unde natus optio.
        </p>
      </div>
    </div>
  );
};

export default PostFeed;
