import CommentsSectionServer from "@/components/post/comment/comments-section-server";
import EditorOutput from "@/components/editor/editor-output";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Bookmark, PostStatus } from "@prisma/client";
import { Suspense } from "react";
import { kv } from "@/lib/redis";
import { ArrowLeft, CircleMinusIcon, LibraryBig, Loader2 } from "lucide-react";
import Link from "next/link";
import { HoverProfile } from "@/components/profile/hover-profile";
import { FilterBadgeList } from "@/components/post/filters/filter-badge-list";
import { PostBookmarkServer } from "@/components/post/bookmark/post-bookmark-server";
import getSession from "@/lib/getSession";
import PostApplyServer from "@/components/post/apply/post-apply-server";

interface PostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PostPage = async ({ params }: PostPageProps) => {
  const cachedPost = (await kv.hgetall(`post:${params.postId}`)) as CachedPost;
  const session = await getSession();

  let post: (Post & { bookmarks: Bookmark[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        author: true,
        bookmarks: true,
      },
    });
  }

  if (!post && !cachedPost) {
    return (
      <div className="h-full flex flex-col items-center justify-center mx-auto gap-2 text-accent">
        <LibraryBig className="h-20 w-20" />
        <p className="text-accent-foreground">Este post fue eliminado</p>
      </div>
    );
  }

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

            {post?.author && (
              <p className="flex items-center gap-1 max-h-40 mt-1 truncate text-xs text-muted-foreground">
                Publicado por
                <HoverProfile user={post?.author}>
                  <span className="text-xs text-primary leading-none tracking-tight hover:underline cursor-default">
                    @{post?.author.username ?? cachedPost.authorUsername}
                  </span>
                </HoverProfile>
                {formatTimeToNow(
                  new Date(post?.createdAt ?? cachedPost.createdAt),
                )}
              </p>
            )}
          </div>

          <h1 className="text-xl font-semibold py-2 leading-6 text-foreground">
            {post?.title ?? cachedPost.title}
          </h1>

          {post?.filters && post?.filters.length > 0 ? (
            <div className="w-full flex gap-2 mb-6">
              <FilterBadgeList filterIds={post?.filters} />
            </div>
          ) : null}

          <div className="flex justify-between gap-2 pt-2">
            <Suspense fallback={<PostButtonShell />}>
              {post?.status === PostStatus.CLOSED ? (
                <div className="flex gap-2 items-center mr-2 text-destructive">
                  <CircleMinusIcon className="w-4 h-4 ml-2" />
                  Ya no se aceptan solicitudes
                </div>
              ) : (
                <PostApplyServer
                  postId={post?.id ?? cachedPost.id}
                  userId={session?.user?.id}
                  getData={async () => {
                    return await db.post.findUnique({
                      where: {
                        id: params.postId,
                      },
                      include: {
                        applies: true,
                      },
                    });
                  }}
                />
              )}
            </Suspense>
            <Suspense fallback={<PostButtonShell />}>
              <PostBookmarkServer
                postId={post?.id ?? cachedPost.id}
                userId={session?.user?.id}
                getData={async () => {
                  return await db.post.findUnique({
                    where: {
                      id: params.postId,
                    },
                    include: {
                      bookmarks: true,
                    },
                  });
                }}
                showBookmarkAmt={false}
              />
            </Suspense>
          </div>

          <EditorOutput content={post?.content ?? cachedPost.content} />
          <Suspense fallback={<PostCommentShell />}>
            <CommentsSectionServer postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

function PostButtonShell() {
  return (
    <Button variant="outline">
      <Loader2 className="animate-spin h-5 w-5" />
    </Button>
  );
}

function PostCommentShell() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="animate-spin h-5 w-5" />
      <p className="text-accent-foreground">Cargando comentarios...</p>
    </div>
  );
}

export default PostPage;
