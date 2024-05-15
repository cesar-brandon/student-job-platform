import { ProfileTabs } from "@/components/profile/profile-tabs";
import { UserProfile } from "@/components/profile/user-profile";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="flex flex-col gap-4">
      <UserProfile user={user} />
      <div className="flex items-center justify-between">
        <ProfileTabs />
        <Button variant="outline">Editar Pefil</Button>
      </div>
    </section>
  );
};

export default ProfilePage;
