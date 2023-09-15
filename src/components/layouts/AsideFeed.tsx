import { db } from "@/lib/prisma";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PlusIcon } from "@heroicons/react/24/outline";
import { simplifyName } from "@/lib/utils";
import { Button } from "../ui/button";
import AsideFeedHeader from "../common/AsideFeedHeader";

const AsideFeed = async () => {
  const enterprises = await db.user.findMany({
    where: {
      role: "ENTERPRISE",
    },
    include: {
      Enterprise: {
        select: {
          name: true
        }
      }
    }
  });


  return (
    <div className="w-[25%] p-4 hidden xl:block">
      <AsideFeedHeader />
      <div className="bg-white min-h-[30rem] rounded-xl p-6 mt-2 font-semibold">
        <p className="text-lg">Empresas</p>
        {
          enterprises ? enterprises.map((enterprise) => (
            <div key={enterprise.id} className="flex items-center justify-between gap-4 mt-4">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={enterprise.image || ""} alt={enterprise.name} />
                  <AvatarFallback>{simplifyName(enterprise.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{enterprise.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    @{enterprise.Enterprise[0]?.name}
                  </span>
                </div>
              </div>
              <Button className="w-8 h-8 bg-gray-400 hover:bg-gray-300">
                <PlusIcon className="h-full" aria-hidden="true" />
              </Button>
            </div>
          ))
            : (
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="text-xs text-muted-foreground">No se encontraron resultados.</span>
              </div>
            )
        }
      </div>
    </div>
  );
};

export default AsideFeed;
