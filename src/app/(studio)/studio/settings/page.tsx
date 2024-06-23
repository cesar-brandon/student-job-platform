import { DisplayNameForm } from "@/components/forms/display-name-form";
import { EnterpriseDescriptionForm } from "@/components/forms/enterprise-description-form";
import { EnterpriseUrlForm } from "@/components/forms/enterprise-url-form";
import { AvatarForm } from "@/components/studio/settings/avatar-form";
import { authOptions } from "@/lib/auth";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Configuración",
  description: "Página de configuración de cuenta",
};

export default async function Page() {
  const session = await getSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/login");
  }
  const enterprise = await db.enterprise.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="space-y-6 w-full">
      <AvatarForm user={session.user} />
      <DisplayNameForm userId={session.user.id} name={session.user.name} />
      {/* <ProfileForm /> */}
      {enterprise && (
        <>
          <EnterpriseDescriptionForm
            id={enterprise.id}
            description={enterprise.description}
          />
          <EnterpriseUrlForm id={enterprise.id} urls={enterprise.urls} />
        </>
      )}
    </div>
  );
}
