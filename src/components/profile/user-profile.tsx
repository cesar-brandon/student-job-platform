import { simplifyName } from "@/lib/utils";
import CareerCard from "@/components/common/career-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileFallback } from "./user-profile-fallback";
import { User } from "@prisma/client";

export function UserProfile({ user }: { user: User }) {
  if (!user) return <UserProfileFallback />;

  return (
    <CareerCard
      career={"ENTERPRISE"}
      className="min-h-[15rem] w-full px-8 rounded-3xl items-start justify-start"
      classNameIcon="right-[-5rem] scale-125"
    >
      <div className="flex mt-12 gap-4 items-center z-10">
        <Avatar className="w-36 h-36">
          <AvatarImage src={user.image || ""} alt="avatar" />
          <AvatarFallback>
            {simplifyName(user.name.toUpperCase())}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-muted-foreground text-opacity-50">
            @{user.username}
          </p>
        </div>
      </div>
    </CareerCard>
  );
}
