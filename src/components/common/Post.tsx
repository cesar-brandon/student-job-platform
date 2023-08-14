"use client";

import { formatTimeToNow } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  ClockIcon,
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

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  authorName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  authorName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="overflow-hidden bg-white shadow border-b-[1px] sm:rounded-xl sm:border-none">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {authorName ? (
              <>
                <a
                  className="underline text-zinc-900 text-sm underline-offset-2"
                  href={`/user/${authorName}`}
                >
                  @{authorName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>
              Publicado hace {formatTimeToNow(new Date(post.createdAt))}{" "}
            </span>
          </div>
          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
              <div>
                <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
                  {post.title}
                </h1>
                <div
                  className="relative text-sm max-h-40 w-full overflow-clip"
                  ref={pRef}
                >
                  <EditorOutput content={post.content} />
                  {pRef.current?.clientHeight === 160 ? (
                    // blur bottom if content is too long
                    <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
                  ) : null}
                </div>
              </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                  <div className="max-w-md mx-auto">
                    <Drawer.Title className="font-medium text-xl mb-4">
                      Oferta {post.title}
                    </Drawer.Title>
                    <div>
                      <p className="text-gray-500 text-sm flex gap-4">
                        <ClockIcon className="h-4 w-4 inline-block" /> Publicado
                        hace {formatTimeToNow(new Date(post.createdAt))}{" "}
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

      <div className="bg-white sm:bg-gray-50 z-20 text-sm px-6 py-4 sm:px-6 flex justify-between">
        <div className="flex gap-6">
          <Link
            href={`@${authorName}/post/${post.id}`}
            className="w-fit flex items-center gap-2"
          >
            <ChatBubbleBottomCenterIcon className="h-5 w-5 mr-1" />
            <p className="text-center py-2 font-medium text-sm text-zinc-900">
              {commentAmt}
            </p>{" "}
            comentarios
          </Link>
          <PostVoteClient
            postId={`${post.id}`}
            initialVotesAmt={_votesAmt}
            initialVote={_currentVote?.type}
          />
        </div>
        <div>
          <PaperAirplaneIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
export default Post;
