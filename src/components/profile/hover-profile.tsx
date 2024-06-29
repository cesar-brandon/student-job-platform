import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, simplifyName } from "@/lib/utils";
import type { User } from "@prisma/client";

export function HoverProfile({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  if (!user) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 overflow-hidden">
        {" "}
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.image || ""} alt="avatar" />
            <AvatarFallback>
              {simplifyName(user.name.toUpperCase())}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{user.name}</h4>
            <p className="w-full font-normal text-sm break-all line-clamp-3">
              {user.bio}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Se unió el {formatDate(`${new Date(user.createdAt)}`)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
