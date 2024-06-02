import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { LibraryBig } from "lucide-react";
import { Link } from "next-view-transitions";
import { ExtendedApplyPost } from "@/types/db";
import { applyStatusColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Aplicados",
  description: "Pagina de puestos aplicados",
};

export default async function AppliedPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const myAppliedJobs = await db.apply.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      Post: {
        include: {
          author: true,
        },
      },
    },
  });

  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <h1 className="hidden lg:block font-bold text-xl">Puestos aplicados</h1>
      {myAppliedJobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {myAppliedJobs.map((apply) => (
            <AppliedItem key={apply.postId} apply={apply} />
          ))}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center mx-auto gap-2 text-accent">
          <LibraryBig className="h-20 w-20" />
          <p className="text-accent-foreground">No tienes puestos aplicados</p>
        </div>
      )}
    </div>
  );
}

function AppliedItem({ apply }: { apply: ExtendedApplyPost }) {
  return (
    <Link
      href={`/${apply.Post.author.username}/post/${apply.postId}`}
      className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="w-full p-4">
        {apply.Post.title}
        <p className="text-sm">{apply.Post.author.name}</p>
        <p className="text-sm dark:font-thin font-light">
          Aplicado el {new Date(apply.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Badge
        variant={applyStatusColor[apply.status].variant}
        className="m-4 flex"
      >
        {applyStatusColor[apply.status].name}
      </Badge>
    </Link>
  );
}
