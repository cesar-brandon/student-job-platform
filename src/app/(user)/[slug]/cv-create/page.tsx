import ResumeCreateCard from "@/components/profile/resume/resume-create-card";
import getSession from "@/lib/getSession";

export default async function ResumeOptionsPage() {
  const session = await getSession();
  if (!session?.user) return null;

  return <ResumeCreateCard user={session.user} />;
}
