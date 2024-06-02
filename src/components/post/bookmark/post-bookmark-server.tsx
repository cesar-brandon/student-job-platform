import type { Bookmark, Post } from "@prisma/client";
import { notFound } from "next/navigation";
import { PostBookmarkClient } from "./post-bookmark-client";

interface BookmarsClientProps {
  postId: string;
  userId: string;
  initialBookmarksAmt?: number;
  initialBookmark?: boolean;
  getData?: () => Promise<(Post & { bookmark: Bookmark }) | null>;
  showBookmarkAmt?: boolean;
}

export async function PostBookmarkServer({
  postId,
  userId,
  initialBookmarksAmt = 0,
  getData,
  showBookmarkAmt,
}: BookmarsClientProps) {
  let _bookmarksAmt: number = 0;
  let _currentBookmark: boolean = false;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();

    _currentBookmark = post.bookmark?.userId === userId;
    if (_currentBookmark) {
      _bookmarksAmt = initialBookmarksAmt + 1;
    }
  } else {
    _bookmarksAmt = initialBookmarksAmt;
    _currentBookmark = false;
  }

  return (
    <PostBookmarkClient
      postId={postId}
      userId={userId}
      initialBookmarksAmt={_bookmarksAmt}
      initialBookmark
      showBookmarkAmt={showBookmarkAmt}
    />
  );
}
