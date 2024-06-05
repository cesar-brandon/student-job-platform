import { cn } from "@/lib/utils";
import { LibraryBig } from "lucide-react";

interface Props {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

export function NoItems({ text, className, icon: Icon = LibraryBig }: Props) {
  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center mx-auto gap-2 text-accent",
        className,
      )}
    >
      <Icon className="h-20 w-20" />
      <p className="text-accent-foreground">{text}</p>
    </div>
  );
}
