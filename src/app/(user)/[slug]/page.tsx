import { StudentProfile } from "@/components/profile/student-profile";
import { UserProfile } from "@/components/profile/user-profile";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { LibraryBig } from "lucide-react";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Perfil",
  description: "Página de perfil de usuario",
};

interface ProfilePageProps {
  params: {
    slug: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await getSession();
  let user = session?.user;
  const isOwner = user?.username === params.slug;

  if (!isOwner) {
    user = await db.user.findUnique({
      where: {
        username: params.slug,
      },
    });
  }
  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center mx-auto gap-2 text-accent">
        <LibraryBig className="h-20 w-20" />
        <p className="text-accent-foreground">Este usuario no existe</p>
      </div>
    );
  }
  if (user.role === "STUDENT") {
    const student = await db.student.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        User: {
          select: {
            id: true,
            image: true,
            username: true,
            name: true,
            bio: true,
          },
        },
      },
    });

    return <StudentProfile student={student} isOwner={isOwner} />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile user={user} isOwner={isOwner} />
    </Suspense>
  );
};

export default ProfilePage;
