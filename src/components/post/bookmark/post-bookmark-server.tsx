import type { Bookmark, Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { PostBookmarkClient } from "./post-bookmark-client";

interface BookmarsClientProps {
  postId: string;
  userId: string;
  initialBookmarksAmt?: number;
  initialBookmark?: boolean;
  getData?: () => Promise<(Post & { bookmarks: Bookmark[] }) | null>;
  showBookmarkAmt?: boolean;
}

export async function PostBookmarkServer({
  postId,
  userId,
  initialBookmarksAmt = 0,
  getData,
  showBookmarkAmt,
  initialBookmark,
}: BookmarsClientProps) {
  let _bookmarksAmt: number = 0;
  let _currentBookmark: boolean | undefined = false;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    _currentBookmark = post.bookmarks?.some(
      (bookmark) => bookmark.userId === userId,
    );
    if (_currentBookmark) {
      _bookmarksAmt = initialBookmarksAmt + 1;
    }
  } else {
    _bookmarksAmt = initialBookmarksAmt;
    _currentBookmark = initialBookmark;
  }

  return (
    <PostBookmarkClient
      postId={postId}
      userId={userId}
      initialBookmarksAmt={_bookmarksAmt}
      initialBookmark={_currentBookmark}
      showBookmarkAmt={showBookmarkAmt}
      className="h-12 px-4 py-2"
    />
  );
}
