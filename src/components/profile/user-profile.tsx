import CareerCard from "@/components/common/career-card";
import { StudentProfileFallback } from "./student-profile-fallback";
import { User } from "@prisma/client";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { Button } from "@/components/ui/button";
import BlurImage from "../common/blur-image";

export function UserProfile({ user }: { user: User }) {
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
            <BlurImage
              src={user.image || ""}
              className="w-full h-full bg-foreground"
              alt="avatar"
              fill
            />
            <div className="absolute bottom-0 text-white p-4 z-10">
              <h3 className="font-semibold">{user.name}</h3>
              <p>@{user.username}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-foreground dark:from-background to-transparent" />
          </div>
        </div>
      </CareerCard>
      <div className="flex items-start justify-between">
        <ProfileTabs />
        <Button variant="outline">Editar Pefil</Button>
      </div>
    </div>
  );
}
