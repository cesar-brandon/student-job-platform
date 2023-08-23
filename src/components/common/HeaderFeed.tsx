import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const HeaderFeed: React.FC = () => {
  return (
    <div className="w-full px-4 flex flex-col gap-4">
      <div className="flex items-center justify-between ">
        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <BellIcon className="w-6 h-6" />
      </div>
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="recommended">Recomendados</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended">
        </TabsContent>
        <TabsContent value="recent"></TabsContent>
      </Tabs>
    </div>
  );
};

export default HeaderFeed;
