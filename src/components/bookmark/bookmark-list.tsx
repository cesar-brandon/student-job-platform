"use client";
import { PostBookmarkServer } from "@/components/post/bookmark/post-bookmark-server";
import { ExtendedBookmark } from "@/types/db";
import { LibraryBig } from "lucide-react";
import { Link } from "next-view-transitions";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBookmarks = async (userId: string) => {
  try {
    const { data } = await axios.get(`/api/user/${userId}/bookmark`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function BookmarksList({ userId }: { userId: string }) {
  const { data: bookmarks, isLoading } = useQuery(["bookmarks", userId], () =>
    getBookmarks(userId),
  );

  return (
    <>
      {bookmarks && bookmarks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {bookmarks.map((bookmark: ExtendedBookmark) => (
            <BookmarkItem key={bookmark.postId} bookmark={bookmark} />
          ))}
        </div>
      ) : isLoading ? (
        <div className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="w-full p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="m-4">
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center mx-auto gap-2 text-accent">
          <LibraryBig className="h-20 w-20" />
          <p className="text-accent-foreground">No tienes guardados</p>
        </div>
      )}
    </>
  );
}

function BookmarkItem({ bookmark }: { bookmark: ExtendedBookmark }) {
  return (
    <div className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm">
      <Link
        href={`/${bookmark.post.author.username}/post/${bookmark.postId}`}
        className="w-full p-4"
      >
        {bookmark.post.title}
        <p className="text-sm">{"J&R CRM SERVICES"}</p>
        <p className="text-sm dark:font-thin font-light">Lima,Lima</p>
      </Link>
      <div className="m-4">
        <PostBookmarkServer
          postId={bookmark.postId}
          userId={bookmark.userId}
          showBookmarkAmt={false}
          initialBookmark
        />
      </div>
    </div>
  );
}
