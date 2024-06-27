import type { Post, Apply } from "@prisma/client";
import { PostApplyClient } from "./post-apply-client";
import { notFound } from "next/navigation";

interface PostApplyServerProps {
  postId: string;
  userId: string;
  initialApply?: Apply["status"] | null;
  getData?: () => Promise<(Post & { applies: Apply[] }) | null>;
}

export default async function PostApplyServer({
  postId,
  userId,
  initialApply,
  getData,
}: PostApplyServerProps) {
  let _currentApply: Apply["status"] | null | undefined = undefined;

  if (getData) {
    const post = await getData();
    if (!post) return notFound();
    _currentApply = post.applies.find((apply) => apply.userId === userId)
      ?.status;
  } else {
    _currentApply = initialApply;
  }

  return <PostApplyClient postId={postId} initialApply={_currentApply} />;
}
