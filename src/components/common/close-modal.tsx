"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface CloseModalProps {
  href: string;
}

const CloseModal: FC<CloseModalProps> = ({ href }: CloseModalProps) => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push(href)} size="icon">
      <X aria-label="close modal" className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
