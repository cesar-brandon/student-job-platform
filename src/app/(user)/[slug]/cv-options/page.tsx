import ResumeOptionsCard from "@/components/profile/resume/resume-options-card";
import getSession from "@/lib/getSession";

export default async function ResumeOptionsPage() {
  const session = await getSession();
  if (!session?.user) return null;

  return <ResumeOptionsCard user={session.user} />;
}
