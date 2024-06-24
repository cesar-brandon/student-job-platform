import { Badge } from "@/components/ui/badge";
import type { Filter } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Accessibility, Book, BriefcaseBusiness, Clock } from "lucide-react";
import { ComponentProps } from "react";

type FilterOption = {
  id: string;
  label: string;
};

type FilterBadge = {
  title: string;
  label: string;
};

export function FilterBadgeList({ filterIds }: { filterIds: string[] }) {
  const { data: allFilters, isLoading } = useQuery(
    ["filter-badges"],
    async () => {
      const { data } = await axios.get("/api/filter");
      const filterLabels = data.flatMap((filter: Filter) => {
        const labels =
          Array.isArray(filter.options) &&
          (filter.options as Array<FilterOption>)
            .filter((option) => filterIds.includes(option.id))
            .map((option) => ({ title: filter.title, label: option.label }));
        return labels;
      });
      return filterLabels;
    },
  );

  const filterBadgeIcons: {
    [key: string]: JSX.Element;
  } = {
    Especialidad: <Book className="h-4 w-4" />,
    "Modalidad de trabajo": <Book className="h-4 w-4" />,
    "Nivel laboral": <BriefcaseBusiness className="h-4 w-4" />,
    "Carga horaria": <Clock className="h-4 w-4" />,
    "Postulantes con discapacidad": <Accessibility className="h-4 w-4" />,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allFilters &&
        allFilters.map((filter: FilterBadge) => (
          <Badge
            key={filter.label}
            variant={getBadgeVariantFromLabel(filter.label)}
            className="gap-2 py-2"
          >
            {filterBadgeIcons[filter.title as keyof typeof filterBadgeIcons]}
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

  return "outline";
}
