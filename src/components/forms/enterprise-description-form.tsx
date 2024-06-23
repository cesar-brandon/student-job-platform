"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function EnterpriseDescriptionForm({
  id,
  description,
}: {
  id: string;
  description: any;
}) {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const router = useRouter();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor-enterprise-description",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Escribe la descripción de tu empresa...",
        inlineToolbar: true,
        data: description,
      });
    }
  }, [description]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: updateDesciption, isLoading } = useMutation({
    mutationFn: async () => {
      const description = await ref.current?.save();
      if (!description) throw new Error("No description");

      return axios.patch(`/api/enterprise/${id}`, { description });
    },
    onError: () => {
      return toast({
        title: "Algo salió mal",
        description: "Error al guardar la descripción de la empresa.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        description: "Descripción actualizada",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Descripción de la empresa
        </CardTitle>
        <CardDescription>
          Añade una descripción de tu empresa para que los candidatos sepan más
          sobre ti.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-48">
        {isMounted && (
          <div
            id="editor-enterprise-description"
            className="h-full border rounded-md overflow-hidden overflow-y-auto px-4 py-1"
          />
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => updateDesciption()} isLoading={isLoading}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
