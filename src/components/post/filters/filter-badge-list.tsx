"use client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filter";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import type { Filter } from "@prisma/client";
import { Accessibility, BriefcaseBusiness, Clock } from "lucide-react";
import { ComponentProps } from "react";

export type FilterOption = {
  id: string;
  label: string;
};

export type FilterBadge = {
  title: string;
  label: string;
};

function sortFilters(
  allFilterLabels: FilterBadge[],
  filterBadgeIcons: Record<string, { icon: JSX.Element; priority: number }>,
) {
  const includedFilters = new Set<string>();
  return allFilterLabels
    .filter((filter) => {
      if (
        filterBadgeIcons.hasOwnProperty(filter.title) &&
        !includedFilters.has(filter.title)
      ) {
        includedFilters.add(filter.title);
        return true;
      }
      return false;
    })
    .sort(
      (a, b) =>
        filterBadgeIcons[a.title].priority - filterBadgeIcons[b.title].priority,
    )
    .slice(0, 4);
}

export function FilterBadgeList({
  filterIds,
  className,
}: {
  filterIds: string[];
  className?: string;
}) {
  const { allFilters, isPending } = useFilterStore();

  const allFilterLabels = allFilters.flatMap((filter: Filter) => {
    const labels =
      Array.isArray(filter.options) &&
      (filter.options as Array<FilterOption>)
        .filter((option) => filterIds.includes(option.id))
        .map((option) => ({ title: filter.title, label: option.label }));
    return labels || [];
  });

  const filterBadgeIcons: {
    [key: string]: { icon: JSX.Element; priority: number };
  } = {
    "Modalidad de trabajo": {
      icon: <BriefcaseIcon className="mr-2 h-4 w-4" />,
      priority: 1,
    },
    "Nivel laboral": {
      icon: <BriefcaseBusiness className="mr-2 h-4 w-4" />,
      priority: 2,
    },
    "Carga horaria": { icon: <Clock className="mr-2 h-4 w-4" />, priority: 3 },
    "Postulantes con discapacidad": {
      icon: <Accessibility className="mr-2 h-4 w-4" />,
      priority: 4,
    },
  };

  const filterLabels = sortFilters(allFilterLabels, filterBadgeIcons);

  return (
    <div className={cn("flex flex-wrap gap-2 pt-5", className)}>
      {isPending
        ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-5 w-24" />)
        : filterLabels.map((filter: FilterBadge) => (
            <Badge
              key={filter.label}
              variant={getBadgeVariantFromLabel(filter.title)}
              className="font-normal"
            >
              {filterBadgeIcons[filter.title].icon}
              <p>{filter.label}</p>
            </Badge>
          ))}
    </div>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["Modalidad de trabajo"].includes(label)) {
    return "default";
  }

  if (["Nivel laboral"].includes(label)) {
    return "secondary";
  }

  return "secondary";
}
