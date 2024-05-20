import { StudentProfile } from "@/components/profile/student-profile";
import { UserProfile } from "@/components/profile/user-profile";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { LibraryBig } from "lucide-react";

export const metadata = {
  title: "Profile",
  description: "User profile",
};

interface ProfilePageProps {
  params: {
    slug: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const session = await getSession();
  let user = session?.user;

  if (user.username !== params.slug) {
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

  return (
    <section className="flex flex-col gap-4">
      {user.role === "STUDENT" ? (
        <StudentProfile userId={user.id} />
      ) : (
        <UserProfile user={user} />
      )}
    </section>
  );
};

export default ProfilePage;
