import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  href: string;
  content: string;
  onClick?: () => void;
  isFocus?: boolean;
}

const NavBarItem = ({ icon, href, content, onClick, isFocus }: Props) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={`
								${isFocus ? "text-gray-800" : "text-gray-500"}
            click:text-gray-800 focus:text-gray-800 text-gray-500
						w-6 h-6 focus:animate-click-pulse transition-all duration-300 ease-in-out outline-none
					`}
            href={href}
            onClick={onClick}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavBarItem;
