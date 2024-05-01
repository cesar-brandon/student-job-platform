"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Post from "./post";
import { Skeleton } from "../ui/skeleton";

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

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  if (!posts) return <p>No hay ofertas</p>;

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

        const bookmarkAmt = (post.bookmarks && post.bookmarks.length) || 0;

        // const currentBookmark = post.bookmarks.find(
        //   (bookmark) => bookmark.userId === session?.user?.id
        // );

        const currentApply = post.applies?.find(
          (apply) => apply.userId === session?.user?.id
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                authorName={post.author.name}
                authorImage={post.author.image || ""}
                votesAmt={votesAmt}
                currentVote={currentVote}
                bookmarkAmt={bookmarkAmt}
                currentApply={currentApply}
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
              authorImage={post.author.image || ""}
              votesAmt={votesAmt}
              currentVote={currentVote}
              bookmarkAmt={bookmarkAmt}
              currentApply={currentApply}
            />
          );
        }
      })}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Skeleton className="w-full h-[10rem] rounded-xl" />
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
