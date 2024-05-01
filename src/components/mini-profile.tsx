import { simplifyName } from "@/lib/utils";
import CareerCard from "@/components/common/career-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { user } from "@/types/next-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function MiniProfile({ user }: { user: user }) {
  if (!user) return <MiniProfileFallback />;

  return (
    <CareerCard
      career={user.career || "ENTERPRISE"}
      className="min-h-[15rem] w-full px-8 rounded-b-xl rounded-t-none items-start justify-start"
      classNameIcon="right-[-5rem] scale-125"
    >
      <div className="flex mt-12 gap-4 items-center z-10">
        <Avatar>
          <AvatarImage src={user.image} alt="avatar" />
          <AvatarFallback>
            {simplifyName(user.name.toUpperCase())}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-black text-opacity-50">@{user.username}</p>
        </div>
      </div>
    </CareerCard>
  );
}

function MiniProfileFallback() {
  return (
    <Skeleton className="h-[15rem] w-full flex px-8 pb-10 items-center justify-start gap-6">
      <Skeleton className="bg-border w-16 h-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="bg-border h-4 w-40" />
        <Skeleton className="bg-border h-4 w-20" />
      </div>
    </Skeleton>
  );
}
