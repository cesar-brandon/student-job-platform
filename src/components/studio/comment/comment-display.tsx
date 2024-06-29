import { CommentList } from "@/components/post/comment/comment-section-client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function CommentDisplay({
  postId,
  userId,
  commentCount,
}: {
  postId: string;
  userId: string;
  commentCount: number;
}) {
  const { data: comments, isLoading } = useQuery(
    ["comments", postId],
    async () => {
      const { data } = await axios.get(`/api/post/${postId}/comment`);
      return data;
    },
  );

  return isLoading ? (
    <div className="flex flex-col gap-y-4 my-4">
      {Array.from({ length: commentCount }).map((_, index) => (
        <div
          key={index}
          className="w-full flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="w-[40%]">
            <Skeleton className="h-4 w-2/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <CommentList
      comments={comments}
      postId={postId}
      userId={userId}
      fromStudio
    />
  );
}
