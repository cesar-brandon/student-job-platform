import { NewPasswordForm } from "@/components/new-password-form";
import UserNameForm from "@/components/username-form";
import { authOptions } from "@/lib/auth";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Ajustes",
  description: "Ajustes de la cuenta",
};

const Page = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <h1 className="font-bold text-xl hidden sm:flex">Configuración</h1>
      <div className="grid gap-10">
        <UserNameForm
          user={{
            id: session.user.id,
            username: session.user.username || "",
          }}
        />
        <NewPasswordForm userId={session.user.id} />
      </div>
    </div>
  );
};

export default Page;
