"use client";
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { toast } from "../../hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "../common/icons";
import { useUploadThing } from "@/lib/uploadthing";

interface PostFormProps {
  id?: string;
  content?: {
    title: string;
    description: any;
  };
  filters: string[];
}

//NOTE: controlar mejor los errores

const PostForm: React.FC<PostFormProps> = ({ id, content, filters }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      id: id ?? "",
      title: content?.title ?? "",
      content: null,
      filters: filters ?? [],
    },
  });
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const { startUpload } = useUploadThing("imageUploader");

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Empieza a escribir tu oferta...",
        inlineToolbar: true,
        data: content?.description ?? {},
        tools: {
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
                    const res = await startUpload([file]);
                    if (!res) {
                      return;
                    }
                    return {
                      success: 1,
                      file: {
                        url: res[0].url,
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
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [startUpload, content]);

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

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (post: PostCreationRequest) => {
      const blocks = await ref.current?.save();
      if (!blocks) throw new Error("No se pudo guardar el contenido");

      const payload: PostCreationRequest = {
        id: `${id}`,
        title: post.title,
        content: blocks,
        filters,
      };
      const { data } = await axios.patch(`/api/user/post/${id}`, payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof Error) {
        return toast({
          title: "Algo salió mal",
          description: error.message,
          variant: "destructive",
        });
      }
      return toast({
        title: "Algo salió mal",
        description:
          "Tu publicación no se publicó, inténtalo de nuevo más tarde",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      if (pathname !== "/studio") {
        router.push("/studio");
      }
      queryClient.invalidateQueries(["studio-posts"]);

      return toast({
        description: "Tu oferta ha sido publicada.",
      });
    },
  });

  if (!isMounted) return null;

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-card rounded-lg border">
      <form
        id="enterprise-post-form"
        className="w-full"
        onSubmit={handleSubmit((data) => createPost(data))}
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
          <div id="editor" className="p-0" />
          {/* <p className="text-sm text-gray-500"> */}
          {/*   Usa{" "} */}
          {/*   <kbd className="rounded-md border bg-muted px-1 text-xs uppercase"> */}
          {/*     Tab */}
          {/*   </kbd>{" "} */}
          {/*   para abrir el menú de comandos. */}
          {/* </p> */}
        </div>
        <Button
          type="submit"
          className="w-full rounded-[0.5rem]"
          form="enterprise-post-form"
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircleIcon /> : "Publicar"}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
