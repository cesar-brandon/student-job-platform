"use client";

import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const username = pathname.split("/")[1];
  return pathname.startsWith(`/${username}/`) ? children : null;
}
