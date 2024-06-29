import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { CommentSectionClient } from "./comment-section-client";
import { ExtendedComment } from "@/types/comment";

interface CommentsSectionProps {
  postId: string;
  // comments: ExtendedComment[];
}

const CommentsSectionServer = async ({ postId }: CommentsSectionProps) => {
  const session = await getAuthSession();

  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyToId: null, // only fetch top-level comments
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  return (
    <CommentSectionClient
      comments={comments}
      postId={postId}
      userId={session?.user.id}
    />
  );
};

export default CommentsSectionServer;
