"use client";

import { UserNameRequest, UserNameValidator } from "@/lib/validators/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: Pick<User, "id" | "username">;
}

const UserNameForm: FC<Props> = ({ user }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserNameRequest>({
    resolver: zodResolver(UserNameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { mutate: updateUserName, isLoading } = useMutation({
    mutationFn: async ({ name }: UserNameRequest) => {
      const payload: UserNameRequest = { name };

      const { data } = await axios.patch("/api/username", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Nombre de usuario ya tomado",
            description: "Por favor elige otro nombre de usuario.",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Algo salió mal.",
        description:
          "Su nombre de usuario no fue actualizado. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Su nombre de usuario ha sido actualizado.",
      });
      router.refresh();
    },
  });

  return (
    <form onSubmit={handleSubmit((e) => updateUserName(e))}>
      <Card>
        <CardHeader>
          <CardTitle>Cambiar nombre de usuario</CardTitle>
          <CardDescription>
            Ingrese un nombre de usuario con el que se sienta cómodo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-muted-foreground">@</span>
            </div>
          </div>
          <Label className="sr-only" htmlFor="name">
            Nombre
          </Label>
          <Input
            id="name"
            className="sm:w-[400px] pl-6"
            size={32}
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 pt-2 text-xs text-red-600">
              {errors.name.type === "too_small"
                ? "El nombre de usuario debe tener al menos 3 caracteres."
                : errors.name.type === "too_big"
                  ? "El nombre de usuario no puede tener más de 15 caracteres."
                  : errors.name.type === "invalid_string"
                    ? "El nombre de usuario solo puede contener letras, números y guiones bajos."
                    : "El nombre de usuario es requerido."}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" isLoading={isLoading}>
            Cambiar nombre
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
