import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const simplifyName = (fullName: string): string => {
  const words = fullName.split(" ");

  const simplifiedName = words.map((word) => word.charAt(0)).join("");

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
