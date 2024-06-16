"use client";
import { useRef, useEffect } from "react";
import CloseModal from "@/components/common/close-modal";
import { usePathname, useRouter } from "next/navigation";
export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const router = useRouter();
  const username = usePathname().split("/")[1];

  useEffect(() => {
    const back = (e: KeyboardEvent) =>
      e.key === "Escape" && router.push(`/${username}`);
    document.addEventListener("keydown", back);
    return () => document.removeEventListener("keydown", back);
  }, [router, username]);

  return (
    <div
      ref={overlay}
      onClick={(e) =>
        e.target === overlay.current && router.push(`/${username}`)
      }
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-transparent w-full h-fit py-14">
          <div className="absolute top-0 right-0">
            <CloseModal href={`/${username}`} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
