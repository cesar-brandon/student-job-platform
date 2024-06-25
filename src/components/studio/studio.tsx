"use client";

import { Suspense, useEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PostList } from "@/components/studio/post-list";
import { useIntersection } from "@mantine/hooks";
import { ExtendedPostApply } from "@/types/db";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import axios from "axios";
import { PostDisplay } from "./post-display";
import { usePostStore } from "@/store/post";
import { ScrollArea } from "../ui/scroll-area";
import type { User } from "@prisma/client";
import { NoItems } from "../common/no-items";
import { Skeleton } from "../ui/skeleton";
import { useFilterStore } from "@/store/filter";

interface MailProps {
  initialPosts: ExtendedPostApply[];
  defaultLayout: number[] | undefined;
  user: User;
}

//NOTE: añadir funcionalidad de busqueda
export function Studio({
  initialPosts,
  defaultLayout = [70, 30],
  user,
}: MailProps) {
  const { post } = usePostStore();
  const { setFilters, setIsPending } = useFilterStore();
  const lastPostRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["studio-posts"],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;
      const { data } = await axios.get(query);
      return data as ExtendedPostApply[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    },
  );

  useQuery(
    ["filter-badges"],
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
  const myPosts = allPosts.filter((p) => p.author.id === session?.user?.id);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="myPosts">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Puestos</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="myPosts">Mis ofertas</TabsTrigger>
                <TabsTrigger value="allPosts">Todas</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
            {/*   <form> */}
            {/*     <div className="relative"> */}
            {/*       <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" /> */}
            {/*       <Input placeholder="Search" className="pl-8" /> */}
            {/*     </div> */}
            {/*   </form> */}
            {/* </div> */}
            <TabsContent value="myPosts" className="m-0 pt-4">
              <ScrollArea className="min-h-screen">
                {myPosts && myPosts.length > 0 ? (
                  <Suspense fallback={<PostListSkeleton />}>
                    <PostList
                      items={myPosts}
                      lastPostRef={ref}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  </Suspense>
                ) : (
                  <NoItems text="No tienes ofertas publicadas" />
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="allPosts" className="m-0 pt-4">
              <ScrollArea className="min-h-screen">
                {myPosts && myPosts.length > 0 ? (
                  <Suspense fallback={<PostListSkeleton />}>
                    <PostList
                      items={allPosts}
                      lastPostRef={ref}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  </Suspense>
                ) : (
                  <NoItems text="No hay ofertas publicadas" />
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          {post && post.selected && (
            <PostDisplay
              user={user}
              post={allPosts.find((item) => item.id === post.selected) || null}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

function PostListSkeleton() {
  return (
    <ul className="w-full flex flex-col gap-2 p-4 pt-0">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="w-full flex flex-col justify-between items-center gap-3 rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        >
          <div className="w-full">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-40 w-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}
