"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { PostApplyRequest } from "@/lib/validators/apply";
import { usePrevious } from "@mantine/hooks";
import { ApplyStatus } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PostApplyClientProps {
  postId: string;
  initialApply?: ApplyStatus | null;
}

export function PostApplyClient({
  postId,
  initialApply,
}: PostApplyClientProps) {
  const [currentApply, setCurrentApply] = useState(initialApply);
  const prevApply = usePrevious(currentApply);

  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrentApply(initialApply);
  }, [initialApply]);

  const {
    mutate: apply,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const payload: PostApplyRequest = { postId };
      await axios.patch("/api/user/post/apply", payload);
    },
    onError: (err) => {
      setCurrentApply(prevApply);

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
        description: "No se pudo aplicar al post.",
        variant: "destructive",
      });
    },
    onMutate: () => {
      if (currentApply === ApplyStatus.APPLIED) {
        setCurrentApply(undefined);
      } else {
        setCurrentApply(ApplyStatus.APPLIED);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applies", postId]);
      toast({
        title: "Postulación exitosa.",
        description: "Se ha postulado al post.",
      });
    },
  });

  return (
    <Button
      onClick={() => apply()}
      variant={currentApply === "APPLIED" ? "checked" : "default"}
    >
      {currentApply === "APPLIED" ? "Solicitado" : "Solicitar"}
      {isLoading ? (
        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
      ) : currentApply === "APPLIED" ? (
        <Check className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpRight className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
