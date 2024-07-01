import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "@heroicons/react/24/outline";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn, simplifyName } from "@/lib/utils";
import SidebarNav from "./sidebar-nav";
import { IfvLoveIcon } from "../common/icons";
import { Link } from "next-view-transitions";
import getSession from "@/lib/getSession";
import { MessageCircleQuestion } from "lucide-react";

const HeaderFeed: React.FC<{ className?: string }> = async ({ className }) => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div
      className={cn(
        "w-full px-4 sm:px-10 md:px-4 md:p-0 flex flex-col gap-4",
        className,
      )}
    >
      {/* <div className="hidden lg:block"> */}
      {/*   <h1 className="font-bold text-xl">Inicio</h1> */}
      {/* </div> */}
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
          <SheetContent side="left" className="flex flex-col gap-4 pr-10">
            <div className="flex gap-4 items-center pl-4 border rounded-lg p-2 overflow-hidden">
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
        {/* <BellIcon className="w-6 h-6 stroke-muted-foreground" /> */}
        <Link href="https://forms.gle/tTAjZapLnk3bL7vs5" target="_blank">
          <MessageCircleQuestion className="w-6 h-6 stroke-muted-foreground stroke-[1.5]" />
        </Link>
        {/* <span className="w-6 h-6" /> */}
      </div>
    </div>
  );
};

export default HeaderFeed;
