import CareerCard from "@/components/common/career-card";
import { ProfileTabs } from "./profile-tabs";
import { StudentProfileFallback } from "./student-profile-fallback";
import BlurImage from "../common/blur-image";
import { ExtendedStudent } from "@/types/student";
import { ProfileEditForm } from "./profile-edit-form";

export function StudentProfile({
  student,
  isOwner = false,
}: {
  student: ExtendedStudent | null;
  isOwner?: boolean;
}) {
  if (!student) return <StudentProfileFallback />;

  return (
    <div className="flex flex-col gap-4">
      <CareerCard
        career={student.career || "ENTERPRISE"}
        className="min-h-[20rem] w-full flex flex-row items-start gap-4 px-4 rounded-3xl"
        classNameIcon="right-[-5rem] scale-125"
      >
        <div className="w-[14rem] h-full flex items-center gap-4 z-10">
          <div className="relative rounded-lg w-[14rem] h-full overflow-hidden">
            <BlurImage
              src={student.User.image || ""}
              className="w-full h-full bg-foreground"
              alt="avatar"
              fill
            />
            <div className="absolute bottom-0 text-white p-4 z-10">
              <h3 className="font-semibold">{student.User.name}</h3>
              <p>@{student.User.username}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-foreground dark:from-background to-transparent" />
          </div>
        </div>

        <div className="w-full h-full flex items-end text-right p-2">
          <i className="text-white font-semibold text-lg">
            &quot;Si te caes siete veces, levántate ocho.&quot;
          </i>
        </div>
      </CareerCard>
      <div className="flex items-start justify-between">
        <ProfileTabs />
        {isOwner && <ProfileEditForm user={student.User} />}
      </div>
    </div>
  );
}
