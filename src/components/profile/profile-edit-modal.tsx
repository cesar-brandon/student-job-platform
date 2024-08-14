"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { useState } from "react";
import { ProfileEditForm } from "./profile-edit-form";
import { useMediaQuery } from "@mantine/hooks";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { PencilIcon } from "lucide-react";

export function ProfileEditModal({
  user,
  className,
}: {
  user: User;
  className: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="lg" className={className}>
            Editar Pefil
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>

          <ProfileEditForm
            user={user}
            setIsLoading={setIsLoading}
            setOpen={setOpen}
          />

          <DialogFooter>
            <Button
              type="submit"
              form="profile-edit-form"
              variant="secondary"
              className="w-full"
              isLoading={isLoading}
            >
              Listo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <PencilIcon className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar Perfil</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <ProfileEditForm
            user={user}
            setIsLoading={setIsLoading}
            setOpen={setOpen}
          />
        </div>
        <DrawerFooter>
          <Button
            type="submit"
            form="profile-edit-form"
            variant="secondary"
            className="w-full"
            isLoading={isLoading}
          >
            Listo
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
