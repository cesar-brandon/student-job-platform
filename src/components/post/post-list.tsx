import { ExtendedPost } from "@/types/db";
import Post from "./post";
import { Skeleton } from "../ui/skeleton";
import { user } from "@/types/next-auth";
import { NoItems } from "../common/no-items";
import { forwardRef } from "react";

const PostList = forwardRef<
  HTMLLIElement,
  {
    posts: ExtendedPost[];
    user: user;
    isFetchingNextPage: boolean;
  }
>(({ posts, user, isFetchingNextPage }, ref) => {
  if (!posts) return <NoItems text="No hay ofertas actualmente" />;
  if (posts.length === 0) return <NoItems text="No hay ofertas actualmente" />;

  return (
    <ul className="flex flex-col col-span-2 space-y-0 sm:space-y-6 ">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => vote.userId === user?.id);

        const bookmarkAmt = post.bookmarks ? post.bookmarks.length : 0;

        const currentBookmark = post.bookmarks?.some(
          (bookmark) => bookmark.userId === user?.id,
        );

        const currentApply = post.applies?.find(
          (apply) => apply.userId === user?.id,
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                votesAmt={votesAmt}
                currentVote={currentVote}
                bookmarkAmt={bookmarkAmt}
                currentBookmark={currentBookmark}
                currentApply={currentApply}
              />
            </li>
          );
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              votesAmt={votesAmt}
              currentVote={currentVote}
              bookmarkAmt={bookmarkAmt}
              currentBookmark={currentBookmark}
              currentApply={currentApply}
            />
          );
        }
      })}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <div
            className="w-full flex flex-col justify-between items-center gap-3 
          rounded-lg border bg-card text-card-foreground shadow-sm p-6"
          >
            <div className="w-full flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <Skeleton className="h-6 w-1/3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
});

PostList.displayName = "PostList";

export default PostList;
