import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn, simplifyName } from "@/lib/utils";
import { HoverProfile } from "@/components/profile/hover-profile";
import { Link } from "next-view-transitions";
import { User } from "@prisma/client";

export function ProfileLink({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <Link
      href={`/${user.username}`}
      className={cn(
        "flex items-center justify-between hover:bg-border gap-4 px-6 py-3 cursor-pointer",
        className,
      )}
    >
      <div className="flex justify-between space-x-4">
        <HoverProfile user={user}>
          <Avatar>
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{simplifyName(user.name)}</AvatarFallback>
          </Avatar>
        </HoverProfile>

        <div className="space-y-1">
          <p className="text-sm font-semibold line-clamp-1">{user.name}</p>
          <HoverProfile user={user}>
            <span className="text-xs text-muted-foreground leading-none tracking-tight hover:underline">
              @{user.username}
            </span>
          </HoverProfile>
        </div>
      </div>
      {/* <Button className="bg-primary h-8 p-4 rounded-full"> */}
      {/*   <p className="text-sm font-semibold text-white">Seguir</p> */}
      {/* </Button> */}
    </Link>
  );
}
