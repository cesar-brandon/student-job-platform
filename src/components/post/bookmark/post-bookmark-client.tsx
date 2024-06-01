"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PostBookmarkRequest } from "@/lib/validators/bookmark";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookmarsClientProps {
  postId: string;
  initialBookmarksAmt: number;
  initialBookmark?: boolean;
  showBookmarkAmt?: boolean;
  className?: string;
}

export function PostBookmarkClient({
  postId,
  initialBookmarksAmt,
  initialBookmark,
  showBookmarkAmt = true,
  className,
}: BookmarsClientProps) {
  const [bookmarksAmt, setBookmarksAmt] = useState<number>(initialBookmarksAmt);
  const [currentBookmark, setCurrentBookmark] = useState(initialBookmark);
  const prevBookmark = usePrevious(currentBookmark);

  useEffect(() => {
    setCurrentBookmark(initialBookmark);
  }, [initialBookmark, currentBookmark]);

  const { mutate: bookmark } = useMutation({
    mutationFn: async () => {
      const payload: PostBookmarkRequest = { postId };
      await axios.patch(`/api/user/post/bookmark`, payload);
    },
    onError: (err) => {
      setBookmarksAmt((prev) => prev - 1);

      setCurrentBookmark(prevBookmark);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          toast({
            title: "Algo salió mal.",
            description: "Debe iniciar sesión para votar.",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "Algo salió mal.",
        description: "Su voto no fue registrado. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
    onMutate: () => {
      if (currentBookmark) {
        setBookmarksAmt((prev) => prev - 1);
      } else {
        setBookmarksAmt((prev) => prev + 1);
      }
    },
  });

  return (
    <Button
      className={cn(
        "group w-auto px-3 gap-2 hover:bg-amber-500/20 hover:border-amber-500/30",
        className,
      )}
      size="icon"
      variant="outline"
      onClick={() => bookmark()}
    >
      <div
        className={cn(
          "group w-4 h-4 relative flex items-center justify-center group-hover:text-amber-600",
          currentBookmark && "text-amber-400",
        )}
      >
        <BookmarkIcon className="absolute" />
        <BookmarkIconSolid
          className={`absolute ${
            currentBookmark ? "animate-svg-filled" : "hidden"
          }`}
        />
        <svg
          className={`absolute ${
            currentBookmark ? "animate-svg-celebrate" : "hidden"
          } opacity-0`}
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon className="stroke-amber-500" points="10,10 20,20"></polygon>
          <polygon className="stroke-amber-500" points="10,50 20,50"></polygon>
          <polygon className="stroke-amber-500" points="20,80 30,70"></polygon>
          <polygon className="stroke-amber-500" points="90,10 80,20"></polygon>
          <polygon className="stroke-amber-500" points="90,50 80,50"></polygon>
          <polygon className="stroke-amber-500" points="80,80 70,70"></polygon>
        </svg>
      </div>
      {showBookmarkAmt && bookmarksAmt > 0 ? bookmarksAmt : ""}
    </Button>
  );
}
