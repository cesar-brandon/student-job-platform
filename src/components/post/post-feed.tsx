"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useFilterStore } from "@/store/filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostList from "./post-list";
import { careerData } from "@/lib/utils";
import { FilterOption } from "./filters/filter-badge-list";

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

  const { setFilters, setIsPending, allFilters } = useFilterStore();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/post?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!authorName ? `&authorName=${authorName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    },
  );

  useQuery(
    ["filters"],
    async () => {
      setIsPending(true);
      const { data } = await axios.get("/api/filter");
      return data;
    },
    {
      onSuccess: (data) => {
        setFilters(data);
        setIsPending(false);
      },
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page) ?? initialPosts;

  let forYouPosts = allPosts;

  if (session?.user?.career) {
    const userCareer = session.user.career;
    const careerName = careerData[userCareer]?.name;

    const specialtyFilter = allFilters.find(
      (filter) => filter.title === "Especialidad",
    );

    let userSpecialtyOption;
    if (specialtyFilter?.options) {
      userSpecialtyOption = (specialtyFilter.options as FilterOption[]).find(
        (option) => option.label === careerName,
      );
    }

    if (userSpecialtyOption) {
      forYouPosts = allPosts.filter((post) =>
        post.filters.includes(userSpecialtyOption.id),
      );
    }
  }

  return (
    <section className="w-full grid grid-cols-1">
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="w-full bg-background">
          <TabsTrigger
            className="w-full pb-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-foreground"
            value="for-you"
          >
            Para ti
          </TabsTrigger>
          <TabsTrigger
            className="w-full pb-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:text-foreground"
            value="all"
          >
            Todos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="for-you" className="pt-2">
          <PostList
            posts={forYouPosts}
            user={session?.user}
            isFetchingNextPage={isFetchingNextPage}
            ref={ref}
          />
        </TabsContent>
        <TabsContent value="all" className="pt-2">
          <PostList
            posts={allPosts}
            user={session?.user}
            isFetchingNextPage={isFetchingNextPage}
            ref={ref}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PostFeed;
