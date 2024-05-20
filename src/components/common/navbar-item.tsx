import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  href: string;
  content: string;
}

const NavBarItem = ({ icon, href, content }: Props) => {
  const pathname = usePathname();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-6 h-6">
          <Link
            className={`${
              pathname === href
                ? "text-accent-foreground"
                : "text-gray-400 dark:text-gray-700"
            }
            w-6 h-6 focus:animate-click-pulse transition-all duration-300 ease-in-out outline-none`}
            href={href}
          >
            {icon}
          </Link>
        </div>
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default NavBarItem;
