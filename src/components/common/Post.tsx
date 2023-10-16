"use client";

import { formatTimeToNow, simplifyName } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  ClockIcon,
  MapPinIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Post, User, Vote } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { FC, useRef } from "react";
import { Drawer } from "vaul";
import EditorOutput from "./EditorOutput";
import { Button } from "../ui/button";
import PostVoteClient from "../post-vote/PostVoteClient";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HistoryIcon } from "./Icons";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  authorName: string;
  authorImage: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  authorName,
  authorImage,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  return (
    <div className="overflow-hidden bg-card text-card-foreground shadow-sm border-b-[1px] sm:border-[1px] sm:rounded-xl">
      <div className="px-6 pt-6 pb-4 flex justify-between">
        <div className="w-full flex gap-4">
          <Avatar className="flex items-center justify-center">
            <AvatarImage src={authorImage} alt="avatar" />
            <AvatarFallback>
              {simplifyName(authorName.toUpperCase())}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="max-h-40">
              <h1 className="text-2xl text-primary font-semibold leading-none tracking-tight">
                {post.title}
              </h1>
              {authorName ? (
                <a
                  className="hover:underline underline-offset-2"
                  href={`/user/${authorName}`}>
                  {authorName}
                </a>
              ) : null}
            </div>
            <Drawer.Root shouldScaleBackground>
              <Drawer.Trigger asChild>
                <div>
                  <div className="flex gap-2 text-sm text-muted-foreground my-2">
                    <div className="flex items-center gap-2 rounded-full border py-1 px-2">
                      <MapPinIcon className="h-4 w-4" />
                      Direccion de ejemplo
                    </div>
                    <div className="flex items-center gap-2 rounded-full border py-1 px-2">
                      <ClockIcon className="h-4 w-4" />
                      Full Time
                    </div>
                  </div>

                  <div
                    className="relative text-sm max-h-32 w-full overflow-clip"
                    ref={pRef}
                  >
                    <EditorOutput content={post.content} />
                    {pRef.current?.clientHeight === 128 ? (
                      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div>
                    ) : null}
                  </div>
                </div>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                  <div className="p-4 rounded-t-[10px] flex-1">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                    <div className="max-w-md mx-auto">
                      <Drawer.Title className="font-medium text-xl mb-4">
                        Oferta {post.title}
                      </Drawer.Title>
                      <div>
                        <p className="text-slate-500 text-sm flex gap-4">
                          <ClockIcon className="h-4 w-4 inline-block" />{" "}
                          Publicado hace{" "}
                          {formatTimeToNow(new Date(post.createdAt))}{" "}
                        </p>
                        <Button>Postularme</Button>
                      </div>
                      <Separator className="mb-2" />
                      <div
                        className="relative text-sm h-full w-full overflow-clip"
                        ref={pRef}
                      >
                        <EditorOutput content={post.content} />
                      </div>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </div>

      <div className="z-20 text-sm px-6 py-4 sm:px-6 flex justify-between">
        <p className="flex items-center gap-2"><HistoryIcon className="w-4 h-4" /> Publicado hace {formatTimeToNow(new Date(post.createdAt))}</p>
        <div className="flex items-center justify-center">
          <PaperAirplaneIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
export default Post;
