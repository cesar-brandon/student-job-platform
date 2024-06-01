import { PostBookmarkServer } from "@/components/post/bookmark/post-bookmark-server";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { ExtendedBookmark } from "@/types/db";
import { LibraryBig } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Guardados",
  description: "Guardados",
};

export default async function BookmarksPage() {
  const session = await getSession();
  if (!session?.user) return null;

  const bookmarks = await db.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      post: {
        include: {
          author: true,
        },
      },
    },
  });

  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <h1 className="hidden lg:block font-bold text-xl">Guardados</h1>
      {bookmarks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {bookmarks.map((bookmark: ExtendedBookmark) => (
            <BookmarkItem key={bookmark.postId} bookmark={bookmark} />
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center mx-auto gap-2 text-accent">
          <LibraryBig className="h-20 w-20" />
          <p className="text-accent-foreground">No tienes guardados</p>
        </div>
      )}
    </div>
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
