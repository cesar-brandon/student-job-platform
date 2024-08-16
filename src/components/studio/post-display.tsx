import { BriefcaseBusiness, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EditorOutput from "../editor/editor-output";
import { ExtendedPostApply } from "@/types/db";
import { ScrollArea } from "../ui/scroll-area";
import { UserStack } from "@/components/user-stack";
import { useEffect, useState } from "react";
import { formatDateTime, simplifyName } from "@/lib/utils";
import { ApplyList } from "./apply/apply-list";
import type { User } from "@prisma/client";
import { DeleteDialog } from "../post/delete-dialog";
import { PostEditModal } from "../post/edit-modal";
import { FilterBadgeList } from "../post/filters/filter-badge-list";
import { CommentDisplay } from "./comment/comment-display";
import CreateComment from "../post/comment/create-comment";

interface PostDisplayProps {
  post: ExtendedPostApply | null;
  user: User;
}

export type displayType = "post" | "apply" | "comment";

export function PostDisplay({ post, user }: PostDisplayProps) {
  const [display, setDisplay] = useState<displayType>("post");

  useEffect(() => {
    setDisplay("post");
  }, [post?.id]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {post && post.author.id === user.id && (
        <div className="flex items-center p-2">
          <PostEditModal post={post} />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <DeleteDialog id={post.id} name={post.title} />
        </div>
      )}
      <Separator />
      {post ? (
        <div className="h-full flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={post.author.name} />
                <AvatarFallback>
                  {simplifyName(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{post.title}</div>
                <div className="line-clamp-1 text-xs">{post.author.name}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end ml-auto text-xs text-muted-foreground">
              {post.updatedAt && (
                <span>{formatDateTime(`${new Date(post.createdAt)}`)}</span>
              )}
              <span>{post.address}</span>
            </div>
          </div>
          <Separator />
          <ScrollArea className="w-full h-[40dvh] whitespace-pre-wrap pt-0 px-4 text-sm">
            {display === "post" ? (
              <div className="flex flex-col">
                {post.filters.length > 0 && (
                  <FilterBadgeList filterIds={post.filters} />
                )}
                <EditorOutput content={post.content} />
              </div>
            ) : display === "apply" ? (
              <ApplyList applyCount={post.applies.length} postId={post.id} />
            ) : (
              <CommentDisplay
                commentCount={post.comments.length}
                postId={post.id}
                userId={user.id}
              />
            )}
          </ScrollArea>
          <Separator />
          <div className="flex items-center justify-between h-[10dvh] p-6">
            {display !== "apply" && post.author.id === user?.id && (
              <UserStack applies={post.applies} setDisplay={setDisplay} />
            )}
            {display !== "post" && (
              <Button
                onClick={() => setDisplay("post")}
                size="sm"
                variant="outline"
                className="h-10"
              >
                <BriefcaseBusiness className="h-4 w-4 mr-2" />
                Puesto
              </Button>
            )}
            {display !== "comment" && (
              <Button
                onClick={() => setDisplay("comment")}
                size="sm"
                variant="outline"
                className="h-10"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Comentarios
              </Button>
            )}
          </div>
          <Separator />

          <div className="p-4 h-[20dvh]">
            <CreateComment
              postId={post.id}
              isOwner={post.author.id === user.id}
              fromStudio
            />
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Ningún puesto seleccionado.
        </div>
      )}
    </div>
  );
}
