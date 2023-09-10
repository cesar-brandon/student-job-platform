import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const HeaderFeed: React.FC = () => {
  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <div className="hidden lg:block"><h3 className="font-bold">Inicio</h3></div>
      <div className="flex items-center justify-between lg:hidden">
        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <BellIcon className="w-6 h-6" />
      </div>
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="w-full flex  justify-around">
          <TabsTrigger className="w-full" value="recommended">Recomendados</TabsTrigger>
          <TabsTrigger className="w-full" value="recent">Recientes</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended">
        </TabsContent>
        <TabsContent value="recent"></TabsContent>
      </Tabs>
    </div>
  );
};

export default HeaderFeed;
