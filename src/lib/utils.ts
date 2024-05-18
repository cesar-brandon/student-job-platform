import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const simplifyName = (fullName: string): string => {
  const words = fullName.split(" ");
  let simplifiedName = "";
  if (words.length >= 2) {
    simplifiedName = words
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("");
  } else {
    simplifiedName = words[0].charAt(0);
  }
  return simplifiedName;
};

export const formatDate = (createdAt: string): string => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  return formattedDate;
};

const formatDistanceLocale = {
  lessThanXSeconds: "justo ahora",
  xSeconds: "justo ahora",
  halfAMinute: "justo ahora",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}s",
  xWeeks: "{{count}}s",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}a",
  xYears: "{{count}}a",
  overXYears: "{{count}}a",
  almostXYears: "{{count}}a",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    locale: {
      ...formatDistanceLocale,
      formatDistance,
    },
  });
}

export const careerData: {
  [key: string]: { name: string; color: string };
} = {
  ET: {
    name: "Enfermería Técnica",
    color: "bg-emerald-500",
  },
  FT: {
    name: "Farmacia Técnica",
    color: "bg-sky-400",
  },
  AE: {
    name: "Administración Empresas",
    color: "bg-indigo-400",
  },
  CF: {
    name: "Contabilidad con Mención en Finanzas",
    color: "bg-red-500",
  },
  DS: {
    name: "Desarrollo de Sistemas de Información",
    color: "bg-yellow-400",
  },
  ENTERPRISE: {
    name: "Empresa",
    color: "bg-[#fba124]",
  },
};

export const generateCode = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export const applyStatusColor: {
  [key: string]: {
    name: string;
    variant: BadgeVariant;
  };
} = {
  APPLIED: {
    name: "Aplicado",
    variant: "info",
  },
  VIEWED: {
    name: "Visto",
    variant: "outline",
  },
  PENDING: {
    name: "Pendiente",
    variant: "warning",
  },
  ACCEPTED: {
    name: "Aceptado",
    variant: "success",
  },
  REJECTED: {
    name: "Rechazado",
    variant: "error",
  },
};
