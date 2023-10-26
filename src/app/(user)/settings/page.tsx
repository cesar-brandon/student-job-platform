import UserNameForm from "@/components/username-form";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Ajustes',
  description: 'Ajustes de la cuenta',
}

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/login")
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Configuración</h1>
      <div className="max-w-4xl mx-auto py-12">
        <div className="grid gap-10">
          <UserNameForm user={{
            id: session.user.id,
            username: session.user.username || '',
          }} />
        </div>
      </div>
    </div>
  )
}

export default Page;
