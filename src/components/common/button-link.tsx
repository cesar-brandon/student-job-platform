import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Props {
  href: string
  text: string
  ariaLabel: string
  variant?: "default" | "destructive" | "outline" | "subtle" | "secondary" | "ghost" | "link"
  className?: string
  icon?: React.ReactNode
}

const ButtonLink: React.FC<Props> = ({ href, text, className, icon, ariaLabel, variant }) => {
  return (
    <Button className={cn("rounded-full px-6 py-4", className)} variant={variant}>
      <Link href={href} aria-label={ariaLabel} className="flex items-center">{text}{icon}</Link>
    </Button>
  )
}

export default ButtonLink
