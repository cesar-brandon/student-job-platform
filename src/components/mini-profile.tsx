import CareerCard from "@/components/common/career-card";
import { user } from "@/types/next-auth";
import { UserProfileFallback } from "./profile/user-profile-fallback";
import BlurImage from "./common/blur-image";
import { simplifyName } from "@/lib/utils";

export default function MiniProfile({ user }: { user: user }) {
  if (!user) return <UserProfileFallback />;

  return (
    <CareerCard
      career={user.career || "ENTERPRISE"}
      className="min-h-[15rem] w-full rounded-b-2xl rounded-t-none items-start justify-start"
      classNameIcon="right-[-5rem] scale-125"
    >
      <div className="relative w-[10rem] h-full flex mt-12 rounded-lg gap-4 items-center overflow-hidden z-10">
        {user.image === null ? (
          <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center">
            <p className="mb-6 text-white">
              {simplifyName(user.name.toUpperCase())}
            </p>
          </div>
        ) : (
          <BlurImage
            src={user.image}
            className="bg-foreground"
            alt="avatar"
            fill
          />
        )}
        <div className="absolute bottom-0 text-white p-3 z-30">
          <h3 className="font-semibold line-clamp-1">{user.name}</h3>
          <p className="text-opacity-50 text-sm">@{user.username}</p>
        </div>
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-foreground dark:from-background to-transparent" />
      </div>
    </CareerCard>
  );
}
