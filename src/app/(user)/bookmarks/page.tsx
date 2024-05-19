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
    <div className="w-full h-full">
      <h1 className="font-bold text-xl">Guardados</h1>
      {bookmarks.length > 0 ? (
        <div className="flex flex-col gap-4 py-12">
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
    <div className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div>
        <Link
          href={`/${bookmark.post.author.username}/post/${bookmark.postId}`}
        >
          {bookmark.post.title}
        </Link>
        <p className="text-sm">{"J&R CRM SERVICES"}</p>
        <p className="text-sm dark:font-thin font-light">Lima,Lima</p>
      </div>
      <div className="relative w-6 h-6">
        <PostBookmarkServer
          postId={bookmark.postId}
          userId={bookmark.userId}
          showBookmarkAmt={false}
          // getData={async () => {
          //   return await db.post.findFirst({
          //     where: {
          //       id: bookmark.postId,
          //     },
          //     include: {
          //       bookmarks: true,
          //     },
          //   });
          // }}
        />
      </div>
    </div>
  );
}
