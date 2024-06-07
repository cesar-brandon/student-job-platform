import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  EnterpriseCreationRequest,
  EnterpriseValidator,
} from "@/lib/validators/enterprise";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Enterprise } from "@prisma/client";

interface EnterpriseFormProps {
  item?: Enterprise;
  setOpen: (open: boolean) => void;
}

export default function EnterpriseForm({ item, setOpen }: EnterpriseFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<EnterpriseCreationRequest>({
    resolver: zodResolver(EnterpriseValidator),
    defaultValues: {
      name: item?.name ?? "",
      email: item?.email ?? "",
      address: item?.address ?? "",
      phone: item?.phone ?? "",
    },
  });

  const onSubmit = async (data: EnterpriseCreationRequest) => {
    setIsLoading(true);
    try {
      if (item) {
        await axios.put("/api/enterprise/" + item.id, data);
      } else {
        await axios.post("/api/enterprise", data);
      }
      queryClient.invalidateQueries(["enterprises"]);

      toast({
        title: "Empresa guardada",
        description: `La empresa ha sido ${
          item ? "editada" : "creada"
        } con éxito`,
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Hubo un error al ${item ? "editar" : "crear"} la empresa`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          id="enterprise-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la empresa</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ej. Mi empresa" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ej. correo@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="ej. Calle 123" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    onInput={(e) =>
                      (e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9.]/g,
                        "",
                      ))
                    }
                    {...field}
                    placeholder="ej. 1234567890"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" form="enterprise-form" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Guardar"}
        </Button>
      </DialogFooter>
    </>
  );
}
