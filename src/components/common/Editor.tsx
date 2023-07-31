"use client";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";
import { toast } from "../../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";

type FormData = z.infer<typeof PostValidator>;

interface EditorProps {
  id?: string;
}

const Editor: React.FC<EditorProps> = (id) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      id: `${id}`,
      title: "",
      content: null,
    },
  });
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Empieza a escribir tu oferta...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/api/link`,
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  try {
                    const [res] = await uploadFiles({
                      endpoint: "imageUploader",
                      files: [file],
                    });
                    return {
                      success: 1,
                      file: {
                        url: res.fileUrl,
                      },
                    };
                  } catch (error: any) {
                    return {
                      success: 0,
                      error: error.message,
                    };
                  }
                },
              },
            },
          },
          list: List,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Algo salió mal",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };
    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, content, id }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        id: `${id}`,
        title,
        content,
      };
      const { data } = await axios.post("/api/user/post/create", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Algo salió mal",
        description:
          "Tu publicación no se publicó, inténtalo de nuevo más tarde",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push("/feed");

      router.refresh();

      return toast({
        description: "Tu oferta ha sido publicada.",
      });
    },
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();
    if (!blocks) return;
    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      id: `${id}`,
    };

    createPost(payload);
  }

  if (!isMounted) return null;

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
      <form
        id="enterprise-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Título"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Usa{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            para abrir el menú de comandos.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Editor;
