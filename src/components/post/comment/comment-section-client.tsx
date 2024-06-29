import CreateComment from "@/components/post/comment/create-comment";
import PostComment from "@/components/post/comment/post-comment";
import { ExtendedComment } from "@/types/comment";

export function CommentSectionClient({
  comments,
  postId,
  userId,
}: {
  comments: ExtendedComment[];
  postId: string;
  userId: string;
}) {
  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />

      <CreateComment postId={postId} />

      <CommentList comments={comments} postId={postId} userId={userId} />
    </div>
  );
}

export function CommentList({
  comments,
  postId,
  userId,
  fromStudio,
}: {
  comments: ExtendedComment[];
  postId: string;
  userId: string;
  fromStudio?: boolean;
}) {
  return (
    <div className="flex flex-col gap-y-4 my-4">
      {comments &&
        comments
          .filter((comment) => !comment.replyToId)
          .map((topLevelComment) => {
            const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === "UP") return acc + 1;
                return acc;
              },
              0,
            );

            const topLevelCommentVote = topLevelComment.votes.find(
              (vote) => vote.userId === userId,
            );

            return (
              <div
                key={topLevelComment.id}
                className="flex flex-col border rounded-md p-3"
              >
                <div className="mb-2">
                  <PostComment
                    comment={topLevelComment as ExtendedComment}
                    currentVote={topLevelCommentVote}
                    votesAmt={topLevelCommentVotesAmt}
                    postId={postId}
                    fromStudio={fromStudio}
                  />
                </div>

                {/* Render replies */}
                {topLevelComment.replies
                  .sort((a, b) => b.votes.length - a.votes.length) // Sort replies by most liked
                  .map((reply) => {
                    const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                      if (vote.type === "UP") return acc + 1;
                      return acc;
                    }, 0);

                    const replyVote = reply.votes.find(
                      (vote) => vote.userId === userId,
                    );

                    return (
                      <div key={reply.id} className="ml-2 py-2 pl-4 border-l-2">
                        <PostComment
                          comment={reply as ExtendedComment}
                          currentVote={replyVote}
                          votesAmt={replyVotesAmt}
                          postId={postId}
                          fromStudio={fromStudio}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
    </div>
  );
}
