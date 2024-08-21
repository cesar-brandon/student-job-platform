"use client";
import { markNotificationAsRead } from "@/actions/notification/marked-as-read";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Notification } from "@prisma/client";
import {
  CircleCheckIcon,
  InfoIcon,
  SquareXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";

const classNameDefault =
  "w-10 h-10 flex items-center justify-center rounded-md";

const notificationVariants: {
  [key: string]: {
    variant: string;
    icon: JSX.Element;
  };
} = {
  INFO: {
    variant: "info",
    icon: (
      <div className={classNameDefault + " bg-info/30"}>
        <InfoIcon className="text-info" />
      </div>
    ),
  },
  SUCCESS: {
    variant: "success",
    icon: (
      <div className={classNameDefault + " bg-success/30"}>
        <CircleCheckIcon className="text-success" />
      </div>
    ),
  },
  WARNING: {
    variant: "warning",
    icon: (
      <div className={classNameDefault + " bg-warning/30"}>
        <TriangleAlertIcon className="text-warning" />
      </div>
    ),
  },
  ERROR: {
    variant: "error",
    icon: (
      <div className={classNameDefault + " bg-error/30"}>
        <SquareXIcon className="text-error" />,
      </div>
    ),
  },
};

export function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <Link
      className={cn(
        "flex gap-4 rounded-lg border bg-background hover:bg-card text-card-foreground shadow-sm p-6 cursor-auto",
        notification.url && "cursor-pointer",
      )}
      href={notification.url || "#"}
      onClick={async () => {
        if (!notification.read) {
          await markNotificationAsRead(notification.id);
        }
      }}
    >
      {notificationVariants[notification.variant].icon}
      <div className="w-full">
        <div className="flex items-center gap-2">
          {notification.title && (
            <h4 className="font-bold text-lg">{notification.title}</h4>
          )}
          {!notification.read && (
            <span className="flex min-w-2 h-2 w-2 rounded-full bg-primary" />
          )}
        </div>

        <p>{notification.message}</p>
        <p className="flex items-center gap-2 font-light text-sm mt-2">
          Hace {formatTimeToNow(new Date(notification.createdAt))}
        </p>
      </div>
    </Link>
  );
}
