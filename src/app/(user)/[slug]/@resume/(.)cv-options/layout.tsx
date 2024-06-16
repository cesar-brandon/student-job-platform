"use client";

import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname.startsWith("/cesar/") ? children : null;
}
