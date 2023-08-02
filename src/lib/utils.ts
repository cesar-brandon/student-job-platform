import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
