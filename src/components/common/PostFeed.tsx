"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import Post from "./Post";

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
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-0 sm:space-y-6 ">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user?.id
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                authorName={post.author.name}
                votesAmt={votesAmt}
                currentVote={currentVote}
              />
            </li>
          );
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              authorName={post.author.name}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
          );
        }
      })}
    </ul>
  );
};

export default PostFeed;

// <div className="flex flex-col gap-4 px-4 sm:p-0">
//   <div className="w-full min-h-[8rem] bg-white rounded-3xl p-4 hover:drop-shadow-xl transition">
//     <strong className="text-blue-500 text-lg">Titulo</strong>
//     <div className="flex gap-2">
//       <p className="font-bold">empresa -</p>
//
//       <p>fecha de publicacion</p>
//     </div>
//     <p className="text-sm">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, fuga
//       deleniti! Excepturi nostrum molestiae unde natus optio.
//     </p>
//   </div>
// </div>
