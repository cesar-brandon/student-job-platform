import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, BookmarkIcon, Cog8ToothIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getAuthSession } from "@/lib/auth";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { simplifyName } from "@/lib/utils";
import ButtonLink from "./button-link";
import { ThemeToggle } from "./theme-toggle";

const HeaderFeed: React.FC = async () => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <div className="hidden lg:block">
        <h1 className="font-bold text-xl">Inicio</h1>
      </div>
      <div className="flex items-center justify-between lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar>
              <AvatarImage src={user.image} alt="avatar" />
              <AvatarFallback>
                {simplifyName(user.name.toUpperCase())}
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Avatar>
                  <AvatarImage src={user.image} alt="avatar" />
                  <AvatarFallback>
                    {simplifyName(user.name.toUpperCase())}
                  </AvatarFallback>
                </Avatar>
              </SheetTitle>
              <SheetDescription>
                <h3 className="font-bold">
                  {user.name}
                </h3>
                <p className="text-black text-opacity-50">
                  @{user.name}
                </p>
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <ButtonLink href="/bookmarks" text="Guardados" ariaLabel="Guardados" variant="ghost"
                className="hover:bg-gray-200 dark:hover:bg-slate-800 justify-start " icon={<BookmarkIcon className="w-6 h-6 order-first mr-4" />} />
            </SheetClose>
            <SheetClose asChild>
              <ButtonLink href="/notifications" text="Notificaciones" ariaLabel="Notificaciones" variant="ghost"
                className="hover:bg-gray-200 dark:hover:bg-slate-800 justify-start " icon={<BellIcon className="w-6 h-6 order-first mr-4" />} />
            </SheetClose>
            <SheetClose asChild>
              <ThemeToggle />
            </SheetClose>
            <SheetClose asChild>
              <ButtonLink href="/settings" text="Configuración" ariaLabel="Configuración" variant="ghost"
                className="hover:bg-gray-200 dark:hover:bg-slate-800 justify-start" icon={<Cog8ToothIcon className="w-6 h-6 order-first mr-4" />} />
            </SheetClose>
            {user.role === "ENTERPRISE" && (
              <ButtonLink href={`/${user.name}/submit`} text="Publicar oferta" ariaLabel="Publicar oferta" className="mt-8" />
            )}
          </SheetContent>
        </Sheet>
        <BellIcon className="w-6 h-6" />
      </div>
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="w-full flex  justify-around">
          <TabsTrigger className="w-full" value="recommended">Recomendados</TabsTrigger>
          <TabsTrigger className="w-full" value="recent">Recientes</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended">
        </TabsContent>
        <TabsContent value="recent">
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HeaderFeed;
