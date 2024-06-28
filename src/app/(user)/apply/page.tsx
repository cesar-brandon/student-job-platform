import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import ApplyList from "@/components/apply/apply-list";

export const metadata = {
  title: "Aplicados",
  description: "Pagina de puestos aplicados",
};

export default async function AppliedPage() {
  const session = await getSession();
  if (!session) return null;

  const applyCount = await db.apply.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <h1 className="hidden lg:block font-bold text-xl">Puestos aplicados</h1>
      <Suspense fallback={<ApplySkeleton count={applyCount} />}>
        <ApplyList userId={session.user.id} />
      </Suspense>
    </div>
  );
}

function ApplySkeleton({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="w-full p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="m-4">
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
