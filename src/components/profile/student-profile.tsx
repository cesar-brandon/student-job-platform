import { simplifyName } from "@/lib/utils";
import CareerCard from "@/components/common/career-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileTabs } from "./profile-tabs";
import { StudentProfileFallback } from "./student-profile-fallback";
import { ExtendedStudent } from "@/types/student";

export function StudentProfile({ student }: { student: ExtendedStudent }) {
  if (!student) return <StudentProfileFallback />;

  return (
    <div className="flex flex-col gap-4">
      <CareerCard
        career={student.career || "ENTERPRISE"}
        className="min-h-[15rem] w-full px-8 rounded-3xl items-start justify-start"
        classNameIcon="right-[-5rem] scale-125"
      >
        <div className="flex mt-12 gap-4 items-center z-10">
          <Avatar className="w-36 h-36">
            <AvatarImage src={student.User.image || ""} alt="avatar" />
            <AvatarFallback>
              {simplifyName(student.User.name.toUpperCase())}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{student.User.name}</h3>
            <p className="text-muted-foreground text-opacity-50">
              @{student.User.username}
            </p>
          </div>
        </div>
      </CareerCard>
      <div className="flex items-start justify-between">
        <ProfileTabs />
      </div>
    </div>
  );
}
