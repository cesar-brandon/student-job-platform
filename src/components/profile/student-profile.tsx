import CareerCard from "@/components/common/career-card";
import { StudentProfileFallback } from "./student-profile-fallback";
import BlurImage from "../common/blur-image";
import { ExtendedStudent } from "@/types/student";
import { ProfileEditModal } from "./profile-edit-modal";
import { cn, simplifyName } from "@/lib/utils";
import { StudentProfileTabs } from "./student-profile-tabs";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { EyeIcon } from "lucide-react";

export function StudentProfile({
  student,
  isOwner = false,
}: {
  student: ExtendedStudent | null;
  isOwner?: boolean;
}) {
  if (!student) return <StudentProfileFallback />;

  return (
    <div className="flex flex-col gap-4 px-2">
      <CareerCard
        career={student.career || "ENTERPRISE"}
        className="relative min-h-[13rem] sm:min-h-[20rem] w-full flex flex-row items-start gap-4 px-4 rounded-3xl"
        classNameIcon="right-[-5rem] scale-125"
      >
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-[10rem] sm:w-[14rem] h-full flex items-center gap-4 z-10">
              <div className="relative rounded-lg w-[14rem] h-full overflow-hidden">
                {student.User.image === null ? (
                  <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center">
                    <p className="mb-6 text-white">
                      {simplifyName(student.User.name.toUpperCase())}
                    </p>
                  </div>
                ) : (
                  <BlurImage
                    src={student.User.image}
                    className="w-full h-full bg-foreground"
                    alt="avatar"
                    fill
                  />
                )}
                <div className="absolute bottom-0 text-white p-4 z-10">
                  <h3 className="font-semibold">{student.User.name}</h3>
                  <p>@{student.User.username}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-foreground dark:from-background to-transparent" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="flex items-center justify-center bg-transparent border-none shadow-none">
            {student.User.image === null ? (
              <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center">
                <p className="mb-6 text-white">
                  {simplifyName(student.User.name.toUpperCase())}
                </p>
              </div>
            ) : (
              <img src={student.User.image} alt="foto de perfil" />
            )}
          </DialogContent>
        </Dialog>

        <div className="w-full h-full flex items-end text-right p-2">
          <i className="text-white font-semibold hidden min-[480px]:flex text-sm md:text-lg">
            {student.User.bio}
          </i>
        </div>
        <div className="absolute flex flex-col gap-4 right-5 top-5 z-10">
          {isOwner && (
            <ProfileEditModal
              user={student.User}
              className="bg-background/70 hover:bg-background backdrop-blur-md h-10"
            />
          )}
          {student.resumeUrl && (
            <>
              <Link
                href={student.resumeUrl}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "hidden md:flex bg-background/70 hover:bg-background backdrop-blur-md h-10",
                )}
              >
                Ver CV
              </Link>
              <Link
                href={student.resumeUrl}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "md:hidden bg-background/70 hover:bg-background backdrop-blur-md h-10",
                )}
              >
                <EyeIcon className="h-5 w-5" />
              </Link>
            </>
          )}
        </div>
      </CareerCard>
      {isOwner && (
        <Link
          href={`/${student.User.username}/cv-options`}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Enviar CV
        </Link>
      )}
      <StudentProfileTabs student={student} />
    </div>
  );
}
