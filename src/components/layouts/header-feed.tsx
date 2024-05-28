import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "@heroicons/react/24/outline";
import { getAuthSession } from "@/lib/auth";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn, simplifyName } from "@/lib/utils";
import SidebarNav from "./sidebar-nav";
import { IfvLoveIcon } from "../common/icons";
import { Link } from "next-view-transitions";

const HeaderFeed: React.FC<{ className?: string }> = async ({ className }) => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <div className={cn("w-full px-4 md:p-0 flex flex-col gap-4", className)}>
      <div className="hidden lg:block">
        <h1 className="font-bold text-xl">Inicio</h1>
      </div>
      <div className="flex items-center justify-between lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className="ml-2">
              <AvatarImage src={user.image} alt="avatar" />
              <AvatarFallback>
                {simplifyName(user.name.toUpperCase())}
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-4 pr-10">
            <div className="flex gap-4 items-center pl-4 border  rounded-lg p-2">
              <Avatar className="flex">
                <AvatarImage src={user.image} alt="avatar" />
                <AvatarFallback>
                  {simplifyName(user.name.toUpperCase())}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-52">
                <h3 className="truncate">{user.name}</h3>
                <p className="truncate font-light text-sm text-accent-foreground">
                  @{user.name}
                </p>
              </div>
            </div>
            <SidebarNav user={user} isSheet />
          </SheetContent>
        </Sheet>
        <Link href="/home">
          <IfvLoveIcon />
        </Link>
        <BellIcon className="w-6 h-6 stroke-muted-foreground" />
      </div>
    </div>
  );
};

export default HeaderFeed;
