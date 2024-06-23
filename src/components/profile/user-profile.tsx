import CareerCard from "@/components/common/career-card";
import { StudentProfileFallback } from "./student-profile-fallback";
import type { User } from "@prisma/client";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import BlurImage from "@/components/common/blur-image";
import { simplifyName } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight, LinkIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import {
  MetaIcon,
  LinkedinIcon,
  XTwitterIcon,
  YoutubeIcon,
  GithubIcon,
  InstagramIcon,
} from "@/components/common/brands-icons";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

const urlIconMappings = [
  {
    url: "linkedin.com",
    icon: <LinkedinIcon className="h-5 w-5 fill-orange" />,
  },
  {
    url: "x.com",
    icon: <XTwitterIcon className="h-5 w-5 fill-orange" />,
  },
  { url: "facebook.com", icon: <MetaIcon className="h-5 w-5 fill-orange" /> },
  {
    url: "instagram.com",
    icon: <InstagramIcon className="h-5 w-5 fill-orange" />,
  },
  { url: "youtube.com", icon: <YoutubeIcon className="h-5 w-5 fill-orange" /> },
  { url: "github.com", icon: <GithubIcon className="h-5 w-5 fill-orange" /> },
];

export async function UserProfile({
  user,
  isOwner,
}: {
  user: User;
  isOwner?: boolean;
}) {
  if (!user) return <StudentProfileFallback />;

  const enterprise = await db.enterprise.findFirst({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <CareerCard
        career={"ENTERPRISE"}
        className="min-h-[20rem] w-full px-4 rounded-3xl items-start justify-start"
        classNameIcon="right-[-5rem] scale-125"
      >
        <div className="w-full h-full flex items-center gap-4 z-10">
          <div className="relative rounded-lg w-[14rem] h-full overflow-hidden">
            {user.image === null ? (
              <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center">
                <p className="mb-6 text-white">
                  {simplifyName(user.name.toUpperCase())}
                </p>
              </div>
            ) : (
              <BlurImage
                src={user.image}
                className="w-full h-full bg-foreground"
                alt="avatar"
                fill
              />
            )}

            <div className="absolute bottom-0 text-white p-4 z-10">
              <h3 className="font-semibold">{user.name}</h3>
              <p>@{user.username}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-foreground dark:from-background to-transparent" />
          </div>
          <div className="h-full flex flex-col items-start gap-2">
            {enterprise &&
              enterprise.urls.map((url, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "icon",
                        }),
                        "border-none hover:bg-background dark:hover:hover:bg-accent",
                      )}
                    >
                      {urlIconMappings.find((mapping) =>
                        url.includes(mapping.url),
                      )?.icon ?? <LinkIcon className="h-5 w-5 stroke-orange" />}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{url}</TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>
      </CareerCard>
      {isOwner && (
        <Link
          href="/studio/settings"
          className={buttonVariants({ variant: "outline" })}
        >
          Editar perfil
          <ArrowUpRight className="h-4 w-4 ml-2" />
        </Link>
      )}
      <ProfileTabs enterprise={enterprise} userId={user.id} />
    </div>
  );
}
