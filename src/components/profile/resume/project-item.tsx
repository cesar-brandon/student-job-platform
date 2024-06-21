import { Button } from "@/components/ui/button";
import { Project } from "./add-project";
import { Minus } from "lucide-react";
import Link from "next/link";

export function ProjectItem({
  project,
  remove,
}: {
  project: Project;
  remove?: () => void;
}) {
  return (
    <div className="flex flex-row items-center gap-4 border bg-accent/10 p-2 rounded-md">
      {remove && (
        <Button size="icon" type="button" variant="outline" onClick={remove}>
          <Minus className="h-4 w-4" />
        </Button>
      )}
      <Link href={project.url} className="w-[90%]" target="_blank">
        <div className="flex-1">
          <h3 className="text-lg font-bold line-clamp-1">{project.name}</h3>
          <p className="text-sm line-clamp-2">{project.description}</p>
        </div>
      </Link>
    </div>
  );
}
