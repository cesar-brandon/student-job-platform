"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CommentRequest } from "@/lib/validators/comment";

import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
  isOwner?: boolean;
  fromStudio?: boolean;
}

const CreateComment: FC<CreateCommentProps> = ({
  postId,
  replyToId,
  isOwner,
  fromStudio,
}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const queryClient = useQueryClient();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch(`/api/user/post/comment/`, payload);
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Algo salió mal.",
        description:
          "El comentario no se ha creado correctamente. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      if (fromStudio) {
        queryClient.invalidateQueries(["comments", postId]);
      } else {
        router.refresh();
      }
      setInput("");
    },
  });

  return (
    <div className="grid w-full gap-4">
      <Textarea
        id="comment"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        placeholder="Comentar en este puesto..."
        className={fromStudio ? "resize-none" : ""}
      />

      <div className="flex items-center">
        {/* {isOwner && ( */}
        {/*   <Label */}
        {/*     htmlFor="mute" */}
        {/*     className="flex items-center gap-2 text-xs font-normal" */}
        {/*   > */}
        {/*     <Switch id="mute" aria-label="Silenciar hilo" /> */}
        {/*     Desactivar mensajes */}
        {/*   </Label> */}
        {/* )} */}

        <Button
          className="ml-auto"
          isLoading={isLoading}
          disabled={input.length === 0 || isLoading}
          onClick={() => comment({ postId, text: input, replyToId })}
        >
          Comentar
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;
