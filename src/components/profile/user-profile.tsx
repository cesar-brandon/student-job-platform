import CareerCard from "@/components/common/career-card";
import { StudentProfileFallback } from "./student-profile-fallback";
import { User } from "@prisma/client";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import BlurImage from "../common/blur-image";
import { simplifyName } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "../ui/button";

export function UserProfile({
  user,
  isOwner,
}: {
  user: User;
  isOwner?: boolean;
}) {
  if (!user) return <StudentProfileFallback />;

  return (
    <div className="flex flex-col gap-4">
      <CareerCard
        career={"ENTERPRISE"}
        className="min-h-[20rem] w-full px-4 rounded-3xl items-start justify-start"
        classNameIcon="right-[-5rem] scale-125"
      >
        <div className="w-full h-full flex items-center gap-4 z-10">
          <div className="relative rounded-lg w-[14rem] h-full overflow-hidden">
            {user.image === null ? (
              <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center">
                <p className="mb-6 text-white">
                  {simplifyName(user.name.toUpperCase())}
                </p>
              </div>
            ) : (
              <BlurImage
                src={user.image}
                className="w-full h-full bg-foreground"
                alt="avatar"
                fill
              />
            )}

            <div className="absolute bottom-0 text-white p-4 z-10">
              <h3 className="font-semibold">{user.name}</h3>
              <p>@{user.username}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-foreground dark:from-background to-transparent" />
          </div>
        </div>
      </CareerCard>
      {isOwner && (
        <Link
          href="/studio/settings"
          className={buttonVariants({ variant: "outline" })}
        >
          Editar perfil
          <ArrowUpRight className="h-4 w-4 ml-2" />
        </Link>
      )}
      <ProfileTabs userId={user.id} />
    </div>
  );
}
