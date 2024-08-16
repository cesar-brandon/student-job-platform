import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtendedPostApply } from "@/types/db";
import EditorOutput from "../editor/editor-output";
import { usePostStore } from "@/store/post";
import { FilterBadgeList } from "../post/filters/filter-badge-list";
import { Skeleton } from "@/components/ui/skeleton";
import { markedAsRead } from "@/actions/post/markedAsRead";
import type { User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

interface MailListProps {
  items: ExtendedPostApply[];
  lastPostRef: (element: any) => void;
  isFetchingNextPage: boolean;
  user: User;
}

export function PostList({
  items,
  lastPostRef,
  isFetchingNextPage,
  user,
}: MailListProps) {
  return (
    <ScrollArea className="w-full h-[93dvh]">
      <ul className="w-full flex flex-col gap-2 p-4 pt-0">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <li key={item.id} ref={lastPostRef}>
                <PostItem item={item} user={user} />
              </li>
            );
          } else {
            return <PostItem key={item.id} item={item} user={user} />;
          }
        })}
        {isFetchingNextPage && (
          <li className="w-full flex flex-col justify-between items-center gap-3 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="w-full">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-40 w-full" />
            </div>
          </li>
        )}
      </ul>
    </ScrollArea>
  );
}

function PostItem({ item, user }: { item: ExtendedPostApply; user: User }) {
  const { post, setPost } = usePostStore();
  const queryClient = useQueryClient();

  return (
    <button
      className={cn(
        "w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        item.readByUser && "bg-muted",
        post && post.selected === item.id && "bg-accent",
      )}
      onClick={async () => {
        setPost({
          ...post,
          selected: item.id,
        });
        if (!item.readByUser) {
          await markedAsRead(item.id, user.id);
          queryClient.invalidateQueries(["studio-posts"]);
        }
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="font-semibold break-all">{item.title}</div>
            {!item.readByUser && (
              <span className="flex min-w-2 h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
          <div
            className={cn(
              "min-w-24 text-xs",
              post && post.selected === item.id
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="flex justify-between text-xs font-medium">
          {item.author.name}
          <span className="text-xs text-muted-foreground font-normal mr-2">
            {item.address}
          </span>
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {item.content && <EditorOutput content={item.content} />}
      </div>
      {item.filters.length > 0 ? (
        <FilterBadgeList filterIds={item.filters} />
      ) : null}
    </button>
  );
}
