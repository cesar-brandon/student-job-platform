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
import { simplifyName } from "@/lib/utils";

interface UserStackProps {
  applies: ExtendedApply[];
  setDisplay: (display: displayType) => void;
}

export function UserStack({ applies, setDisplay }: UserStackProps) {
  if (!applies) return null;
  if (applies.length === 0) return <p>No hay postulantes</p>;

  return (
    <div className="flex items-center gap-2">
      <div className="h-full flex -space-x-2 overflow-hidden">
        {applies.map((apply) => (
          <Avatar key={apply.userId}>
            <AvatarImage
              className="ring-2 ring-white"
              src={apply.user.image || ""}
              alt="avatar"
            />
            <AvatarFallback>
              {apply && simplifyName(apply.user.name)}
            </AvatarFallback>
          </Avatar>
        ))}
        {applies.length > 3 && (
          <div className="flex items-center justify-center h-10 w-10 rounded-full ring bg-muted z-20">
            +{applies.length - 3}
          </div>
        )}
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
