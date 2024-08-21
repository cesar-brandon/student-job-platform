import { NoItems } from "@/components/common/no-items";
import { NotificationCard } from "@/components/notify/card";
import { Skeleton } from "@/components/ui/skeleton";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Notificaciones",
  description: "Notificaciones de empleo",
};

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session?.user) return null;

  const notifications = await db.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <h1 className="hidden lg:block font-bold text-xl">Notificaciones</h1>
      {notifications ? (
        notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <NoItems text="No tienes notificaciones" />
        )
      ) : (
        <NotificationSkeleton count={1} />
      )}
    </div>
  );
}

function NotificationSkeleton({ count }: { count: number }) {
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
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
