"use client";

import { Suspense, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import axios from "axios";
import { PostDisplay } from "./post-display";
import { usePostStore } from "@/store/post";
import { ScrollArea } from "../ui/scroll-area";
import type { User } from "@prisma/client";
import { NoItems } from "../common/no-items";

interface MailProps {
  initialPosts: ExtendedPostApply[];
  defaultLayout: number[] | undefined;
  user: User;
}

export function Studio({
  initialPosts,
  defaultLayout = [70, 30],
  user,
}: MailProps) {
  const { post } = usePostStore();
  const lastPostRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
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
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Puestos</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="all">Mis ofertas</TabsTrigger>
                <TabsTrigger value="unread">Todas</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <ScrollArea className="min-h-screen">
                {myPosts && myPosts.length > 0 ? (
                  <Suspense fallback={<p>Cargando posts...</p>}>
                    <PostList items={myPosts} />
                  </Suspense>
                ) : (
                  <NoItems text="No tienes ofertas publicadas" />
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <ScrollArea className="min-h-screen">
                {myPosts && myPosts.length > 0 ? (
                  <Suspense fallback={<p>Cargando posts...</p>}>
                    <PostList items={allPosts.filter((item) => !item.read)} />
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
