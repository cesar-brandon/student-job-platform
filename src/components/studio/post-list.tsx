import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtendedPost } from "@/types/db";
import EditorOutput from "../editor/editor-output";
import { ClockIcon, MapPinIcon } from "lucide-react";
import { usePostStore } from "@/store/post";

interface MailListProps {
  items: ExtendedPost[];
}

const labels = [
  {
    id: "address",
    title: "Dirección de empleo",
    label: "work",
    icon: <MapPinIcon className="h-4 w-4" />,
    variant: "accent",
  },
  {
    id: "full-time",
    title: "Full Time",
    label: "personal",
    icon: <ClockIcon className="h-4 w-4" />,
    variant: "primary",
  },
];

export function PostList({ items }: MailListProps) {
  const { post, setPost } = usePostStore();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
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
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
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
            {labels.length ? (
              <div className="flex items-center gap-2">
                {labels.map((label) => (
                  <Badge
                    key={label.id}
                    variant={getBadgeVariantFromLabel(label.label)}
                    className="gap-2 py-1"
                  >
                    {label.icon}
                    {label.title}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "secondary";
  }

  return "secondary";
}
