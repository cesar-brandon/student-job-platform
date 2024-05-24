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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileRequest, ProfileValidator } from "@/lib/validators/profile";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { User } from "@prisma/client";
import { SquarePlus } from "lucide-react";
import { simplifyName } from "@/lib/utils";

export function ProfileEditForm({ user }: { user: User }) {
  const form = useForm<ProfileRequest>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      image: "",
      presentation: "",
    },
  });

  const onSubmit = async (data: ProfileRequest) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Pefil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="group relative w-24 h-28 rounded-lg overflow-hidden">
                      {user.image === null ? (
                        <div className="w-full h-full bg-muted-foreground dark:bg-background flex items-center justify-center">
                          <p className="text-white">
                            {simplifyName(user.name.toUpperCase())}
                          </p>
                        </div>
                      ) : (
                        <Image
                          src={user.image}
                          alt="imagen de perfil"
                          className="object-cover w-full h-full"
                          width={100}
                          height={100}
                        />
                      )}
                      <div
                        className="absolute top-0 left-0 w-full h-full bg-background/50 backdrop-blur 
                        opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300"
                      >
                        <SquarePlus className="w-6 h-6 text-accent-foreground" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="presentation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presentación</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe una presentación corta sobre ti"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button variant="secondary" className="w-full">
            Listo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
