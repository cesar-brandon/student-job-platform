import format from "date-fns/format";
import { BriefcaseBusiness } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import EditorOutput from "../editor/editor-output";
import { ExtendedPostApply } from "@/types/db";
import { ScrollArea } from "../ui/scroll-area";
import { UserStack } from "@/components/user-stack";
import { useState } from "react";
import { simplifyName } from "@/lib/utils";
import { ApplyList } from "./apply/apply-list";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import { DeleteDialog } from "../post/delete-dialog";
import { PostEditModal } from "../post/edit-modal";
import { FilterBadgeList } from "../post/filters/filter-badge-list";

interface PostDisplayProps {
  post: ExtendedPostApply | null;
  user: User;
}

export type displayType = "post" | "apply" | "comment";

export function PostDisplay({ post, user }: PostDisplayProps) {
  const [display, setDisplay] = useState<displayType>("post");

  return (
    <div className="flex min-h-full flex-col">
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
            {post.updatedAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(post.updatedAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <ScrollArea className="w-full h-[34rem] whitespace-pre-wrap pt-0 px-4 text-sm">
            {display === "post" ? (
              <div className="flex flex-col">
                {post.filters.length > 0 && (
                  <FilterBadgeList filterIds={post.filters} />
                )}
                <EditorOutput content={post.content} />
              </div>
            ) : display === "apply" ? (
              <ApplyList applies={post.applies} />
            ) : (
              <p>Comentarios</p>
            )}
          </ScrollArea>
          <Separator />
          <div className="flex items-center justify-between p-6">
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
                <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                Comentarios
              </Button>
            )}
          </div>
          <Separator />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Comentar este puesto...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Silenciar hilo" /> Silenciar
                    hilo
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Comentar
                  </Button>
                </div>
              </div>
            </form>
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
