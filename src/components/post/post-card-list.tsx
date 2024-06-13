import { db } from "@/lib/prisma";
import { NoItems } from "../common/no-items";
import { Link } from "next-view-transitions";
import type { Post, User } from "@prisma/client";

export async function PostCardList({ userId }: { userId: string }) {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
    where: {
      authorId: userId,
    },
  });

  return (
    <div>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <NoItems text="No hay ofertas actualmente" />
      )}
    </div>
  );
}

function PostCard({
  post,
}: {
  post: Post & {
    author: User;
  };
}) {
  return (
    <Link
      href={`/${post.author.username}/post/${post.id}`}
      className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="w-full p-4">
        <p className="text-lg font-medium"> {post.title}</p>
        <p className="text-sm">{post.author.name}</p>
        <p className="text-sm dark:font-thin font-light">
          pubicado el {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
