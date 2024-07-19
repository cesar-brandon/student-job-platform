import AsideFeedHeader from "./aside-feed-header";
import { User } from "@prisma/client";
import { ProfileLink } from "@/components/profile/profile-link";
import { privateRoles, normalRoles } from "@/config";
import { db } from "@/lib/prisma";

//NOTE: Ver si podemos cachear esta lista junto a Explore Page
export const AsideFeed = async () => {
  const enterprises = await db.user.findMany({
    where: {
      role: {
        in: privateRoles,
      },
    },
  });
  const students = await db.user.findMany({
    where: {
      role: {
        in: normalRoles,
      },
    },
    take: 6,
  });

  return (
    <div className="w-[25%] p-4 hidden xl:flex flex-col gap-4">
      <AsideFeedHeader />
      <div className="bg-card rounded-xl mt-2 font-semibold border overflow-hidden">
        <p className="text-lg px-6 pt-6 pb-4">Empresas</p>
        {enterprises ? (
          enterprises.map((enterprise: User) => (
            <ProfileLink user={enterprise} key={enterprise.id} />
          ))
        ) : (
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-xs text-muted-foreground">
              No se encontraron resultados.
            </span>
          </div>
        )}
      </div>
      <div className="bg-card min-h-[30rem] rounded-xl mt-2 font-semibold border overflow-hidden">
        <p className="text-lg px-6 pt-6 pb-4">Estudiantes</p>
        {students ? (
          students.map((student: User) => (
            <ProfileLink user={student} key={student.id} />
          ))
        ) : (
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-xs text-muted-foreground">
              No se encontraron resultados.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
