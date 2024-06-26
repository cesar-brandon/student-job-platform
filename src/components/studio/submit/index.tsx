"use client";
import PostForm from "@/components/post/form";
import PostFilters from "@/components/post/filters/post-filters";
import type { Post } from "@prisma/client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Submit({ post }: { post?: Post }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    post ? post.filters : [],
  );

  return (
    <ScrollArea className={post ? "h-full" : "h-[94vh]"}>
      <div className="w-full grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-start gap-6 p-10">
          <div className="w-full flex flex-col justify-end gap-4">
            {post ? (
              <PostForm
                id={post.id}
                content={{
                  title: post.title,
                  description: post.content,
                }}
                filters={selectedFilters}
              />
            ) : (
              <PostForm filters={selectedFilters} />
            )}
          </div>
        </div>

        <div className="p-10">
          <PostFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
    </ScrollArea>
  );
}
