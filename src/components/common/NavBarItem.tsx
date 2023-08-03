import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  href: string;
  content: string;
  onClick?: () => void;
  isFocus?: boolean;
}

const NavBarItem = ({ icon, href, content, onClick, isFocus }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={`
								${isFocus ? "text-gray-800" : "text-gray-500"}
hover:text-gray-800 focus:text-gray-800 text-gray-500
						w-6 h-6 focus:w-8 focus:h-8 hover:w-8 hover:h-8 transition-all duration-300 ease-in-out outline-none
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
