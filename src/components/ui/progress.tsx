"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { careerData, cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const hasCareerClass = className?.includes("career-");
  let indicatorColor: string = "bg-primary";

  if (hasCareerClass) {
    const careerClass = className?.split(" ").find((cls) => cls.startsWith("career-"));

    if (careerClass) {
      const career = careerData[careerClass.slice("career-".length)];

      if (career) {
        indicatorColor = career.color || "bg-primary";
      }
    }
  }


  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 ${indicatorColor} transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
