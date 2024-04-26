import CommentsSection from "@/components/post/comments-section";
import EditorOutput from "@/components/editor/editor-output";
import { LoaderCircleIcon } from "@/components/common/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Post, User, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { kv } from "@/lib/redis";
import { ArrowLeft, ClockIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface SubRedditPostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SubRedditPostPage = async ({ params }: SubRedditPostPageProps) => {
  const cachedPost = (await kv.hgetall(`post:${params.postId}`)) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        {/* <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              })
            }}
          />
        </Suspense> */}

        <div className="sm:w-0 w-full flex-1 p-4 sm:border rounded-xl">
          <div className="w-full flex justify-between items-center">
            <Link href="/home">
              <Button variant="ghost" size="icon">
                <ArrowLeft />
              </Button>
            </Link>

            <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
              Publicado por @{post?.author.name ?? cachedPost.authorUsername}{" "}
              {formatTimeToNow(
                new Date(post?.createdAt ?? cachedPost.createdAt)
              )}
            </p>
          </div>

          <h1 className="text-xl font-semibold py-2 leading-6 text-foreground">
            {post?.title ?? cachedPost.title}
          </h1>

          <div className="w-full flex gap-2">
            <Badge
              className="gap-2 text-muted-foreground py-1"
              variant="secondary"
            >
              <MapPinIcon className="h-4 w-4" />
              Direccion de ejemplo
            </Badge>
            <Badge
              className="gap-2 text-muted-foreground py-1"
              variant="secondary"
            >
              <ClockIcon className="h-4 w-4" />
              Full Time
            </Badge>
          </div>

          <EditorOutput content={post?.content ?? cachedPost.content} />
          <Suspense fallback={<LoaderCircleIcon />}>
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      {/* upvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <HandThumbUpIcon className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <LoaderCircleIcon />
      </div>
    </div>
  );
}

export default SubRedditPostPage;
