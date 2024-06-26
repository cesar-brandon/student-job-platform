import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { ExtendedPostApply } from "@/types/db";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Submit from "../studio/submit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function PostEditModal({ post }: { post: ExtendedPostApply }) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!post}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Editar</TooltipContent>
      </Tooltip>

      <DialogContent className="h-[80%] max-w-[80%]">
        <Submit post={post} />
      </DialogContent>
    </Dialog>
  );
}
