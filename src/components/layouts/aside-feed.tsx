import AsideFeedHeader from "./aside-feed-header";
import { User } from "@prisma/client";
import { ProfileLink } from "@/components/profile/profile-link";
import getUsers from "@/lib/data/getUsers";
import { privateRoles, normalRoles } from "@/config";

export const AsideFeed = async () => {
  const users = await getUsers();

  const enterprises = users.filter((user: User) =>
    privateRoles.includes(user.role),
  );
  const students = users.filter((user: User) =>
    normalRoles.includes(user.role),
  );

  return (
    <div className="w-[25%] p-4 hidden xl:flex flex-col gap-4">
      <AsideFeedHeader />
      <div className="bg-card rounded-xl mt-2 font-semibold border">
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
      <div className="bg-card min-h-[30rem] rounded-xl mt-2 font-semibold border">
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
