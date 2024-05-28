import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { SheetClose } from "../ui/sheet";

interface Props {
  href: string;
  text?: string;
  ariaLabel: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "subtle"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  icon?: React.ReactNode;
  isSheet?: boolean;
}

const ButtonLink: React.FC<Props> = ({
  href,
  text,
  className,
  icon,
  ariaLabel,
  variant,
  isSheet = false,
}) => {
  if (isSheet) {
    return (
      <SheetClose asChild>
        <Link
          href={href}
          aria-label={ariaLabel}
          className={cn(buttonVariants({ variant }), "rounded-full", className)}
        >
          {text}
          {icon}
        </Link>
      </SheetClose>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(buttonVariants({ variant }), "rounded-full", className)}
    >
      {text}
      {icon}
    </Link>
  );
};

export default ButtonLink;
