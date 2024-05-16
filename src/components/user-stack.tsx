import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CornerUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { displayType } from "./studio/post-display";
import { ExtendedApply } from "@/types/db";

interface UserStackProps {
  applies: ExtendedApply[];
  setDisplay: (display: displayType) => void;
}

export function UserStack({ applies, setDisplay }: UserStackProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-full flex -space-x-2 overflow-hidden p-2">
        {applies &&
          applies.map((apply) => (
            <Avatar key={apply.userId}>
              <AvatarImage
                className="ring-2 ring-white"
                src={""}
                alt="avatar"
              />
              <AvatarFallback>
                {apply &&
                  apply.user.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        <div className="flex items-center justify-center h-10 w-10 rounded-full ring bg-muted z-20">
          +3
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDisplay("apply")}
          >
            <CornerUpRight className="h-4 w-4" />
            <span className="sr-only">Postulantes</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Postulantes</TooltipContent>
      </Tooltip>
    </div>
  );
}
