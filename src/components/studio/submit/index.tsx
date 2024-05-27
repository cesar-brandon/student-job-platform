"use client";
import Editor from "@/components/editor/editor";
import PostFilters from "@/components/post/filters/post-filters";
import type { Filter } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Submit({ filters }: { filters: Filter[] }) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col items-start gap-6 p-10">
        <div className="w-full flex flex-col justify-end gap-4">
          <Editor filters={selectedFilters} />
        </div>
      </div>

      <div className="p-10">
        <PostFilters
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </div>
  );
}
