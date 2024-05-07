import MiniProfile from "@/components/mini-profile";
import getSession from "@/lib/getSession";

const ProfilePage = async () => {
  const session = await getSession();
  const user = session?.user;
  return <MiniProfile user={user} />;
};

export default ProfilePage;
