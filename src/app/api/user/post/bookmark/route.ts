import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { PostBookmarkValidator } from "@/lib/validators/bookmark";
import { CachedPost } from "@/types/redis";
import { kv } from "@vercel/kv";
import { z } from "zod";

const CACHE_AFTER_BOOKMARKS = 1;

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId } = PostBookmarkValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // check if user has already bookmarked this post 
    const existingBookmark = await db.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        bookmarks: true,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    if (existingBookmark) {
      await db.bookmark.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });

      // Recount the bookmarks
      const bookmarksAmt = post.bookmarks.length

      if (bookmarksAmt >= CACHE_AFTER_BOOKMARKS) {
        const cachePayload: CachedPost = {
          authorUsername: post.author.username ?? "",
          content: JSON.stringify(post.content),
          id: post.id,
          title: post.title,
          createdAt: post.createdAt,
        }

        await kv.hset(`post:${postId}`, cachePayload);
      }

      return new Response("OK")
    }

    //if no existing bookmark, create a new bookmark
    await db.bookmark.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    // Recount the bookmarks
    const bookmarksAmt = post.bookmarks.length

    if (bookmarksAmt >= CACHE_AFTER_BOOKMARKS) {
      const cachePayload: CachedPost = {
        authorUsername: post.author.username ?? "",
        content: JSON.stringify(post.content),
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
      }

      await kv.hset(`post:${postId}`, cachePayload);
    }

    return new Response("OK")

  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
