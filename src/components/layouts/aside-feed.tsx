import { db } from "@/lib/prisma";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { simplifyName } from "@/lib/utils";
import { Button } from "../ui/button";
import AsideFeedHeader from "./aside-feed-header";

const AsideFeed = async () => {
  const enterprises = await db.user.findMany({
    where: {
      role: "ENTERPRISE",
    },
  });

  return (
    <div className="w-[25%] p-4 hidden xl:block">
      <AsideFeedHeader />
      <div className="bg-card min-h-[30rem] rounded-xl p-6 mt-2 font-semibold">
        <p className="text-lg">Empresas</p>
        {enterprises ? (
          enterprises.map((enterprise) => (
            <div
              key={enterprise.id}
              className="flex items-center justify-between gap-4 mt-4"
            >
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage
                    src={enterprise.image || ""}
                    alt={enterprise.name}
                  />
                  <AvatarFallback>
                    {simplifyName(enterprise.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-semibold line-clamp-1">
                    {enterprise.name}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    @{enterprise.username}
                  </span>
                </div>
              </div>
              <Button className="bg-primary h-8 p-4 rounded-full">
                <p className="text-sm font-semibold text-white">Seguir</p>
              </Button>
            </div>
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

export default AsideFeed;
