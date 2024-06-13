"use client";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DisplayNameRequest,
  DisplayNameValidator,
} from "@/lib/validators/username";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function DisplayNameForm({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  const router = useRouter();

  const form = useForm<DisplayNameRequest>({
    resolver: zodResolver(DisplayNameValidator),
    defaultValues: { name },
  });

  const { mutate: updateDisplayName, isLoading } = useMutation({
    mutationFn: async ({ name }: DisplayNameRequest) => {
      await axios.patch(`/api/user/${userId}/display-name`, { name });
    },
    onError: (err) => {
      return toast({
        title: "Algo salió mal.",
        description:
          "Error al actualizar el nombre de usuario. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Nombre actualizado",
        description: "Tu nombre ha sido actualizado con éxito.",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => updateDisplayName(data))}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Nombre para mostrar
            </CardTitle>
            <CardDescription>
              Ingrese su nombre completo o un nombre para mostrar con el que se
              sienta cómodo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
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
