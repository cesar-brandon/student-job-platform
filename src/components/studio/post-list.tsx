import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtendedPostApply } from "@/types/db";
import EditorOutput from "../editor/editor-output";
import { usePostStore } from "@/store/post";
import { FilterBadgeList } from "../post/filters/filter-badge-list";
import { Skeleton } from "@/components/ui/skeleton";

interface MailListProps {
  items: ExtendedPostApply[];
  lastPostRef: (element: any) => void;
  isFetchingNextPage: boolean;
}

export function PostList({
  items,
  lastPostRef,
  isFetchingNextPage,
}: MailListProps) {
  return (
    <ScrollArea className="w-full h-[93dvh]">
      <ul className="w-full flex flex-col gap-2 p-4 pt-0">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <li key={item.id} ref={lastPostRef}>
                <PostItem item={item} />
              </li>
            );
          } else {
            return <PostItem key={item.id} item={item} />;
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

function PostItem({ item }: { item: ExtendedPostApply }) {
  const { post, setPost } = usePostStore();

  return (
    <button
      className={cn(
        "w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        post && post.selected === item.id && "bg-muted",
      )}
      onClick={() =>
        setPost({
          ...post,
          selected: item.id,
        })
      }
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="font-semibold break-all">{item.title}</div>
            {!item.read && (
              <span className="flex min-w-2 h-2 w-2 rounded-full bg-blue-600" />
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
        <div className="text-xs font-medium">{item.author.name}</div>
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
