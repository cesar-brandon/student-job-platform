"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordValidator, PasswordRequest } from "@/lib/validators/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function NewPasswordForm({ userId }: { userId: string }) {
  const form = useForm<PasswordRequest>({
    resolver: zodResolver(PasswordValidator),
    defaultValues: {
      newPassword: "",
      verifyPassword: "",
    },
  });

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: async ({ newPassword, verifyPassword }: PasswordRequest) => {
      await axios.patch(`/api/user/${userId}/password`, {
        newPassword,
        verifyPassword,
      });
    },
    onError: (err) => {
      return toast({
        title: "Algo salió mal.",
        description:
          "Error al actualizar la contraseña. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      return toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada con éxito.",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => updatePassword(data))}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Cambia tu contraseña
            </CardTitle>
            <CardDescription>
              Por favor, introduce tu nueva contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Nueva contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="verifyPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder="Repite tu contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" isLoading={isLoading}>
              Guardar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

function PasswordInput(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className="sm:w-[400px] pl-6"
        {...props}
      />
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
