import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

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
}

const ButtonLink: React.FC<Props> = ({
  href,
  text,
  className,
  icon,
  ariaLabel,
  variant,
}) => {
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
