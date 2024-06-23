"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const UrlValidator = z.object({
  urls: z
    .array(z.object({ url: z.string().url({ message: "URL inválida" }) }))
    .max(5, {
      message: "Máximo 5 URLs",
    }),
});

export function EnterpriseUrlForm({
  id,
  urls,
}: {
  id: string;
  urls: string[];
}) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UrlValidator),
    defaultValues: {
      urls: urls.map((url) => ({ url })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  const { mutate: updateUrls, isLoading } = useMutation({
    mutationFn: async (urls: { url: string }[]) => {
      await axios.patch(`/api/enterprise/${id}`, {
        urls: urls.map((url) => url.url),
      });
    },
    onError: (err) => {
      return toast({
        title: "Algo salió mal.",
        description:
          "Error al actualizar las URLs de la empresa. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        description: "URLs actualizadas",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          URLs de la empresa
        </CardTitle>
        <CardDescription>
          Añade las URLs de tu empresa para que los usuarios puedan visitar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="enterprise-url-form"
            onSubmit={form.handleSubmit((data) => updateUrls(data.urls))}
          >
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`urls.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">URL {index + 1}</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input {...field} placeholder="https://example.com" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="hover:bg-destructive/10"
                        onClick={() => remove(index)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {form.formState.errors.urls && (
              <FormMessage className="mt-2">
                {form.formState.errors.urls.message}
              </FormMessage>
            )}
            <FormMessage />
          </form>
        </Form>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => append({ url: "" })}
        >
          Añadir URL
        </Button>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="enterprise-url-form"
          isLoading={isLoading}
          disabled={fields.length === 0 || isLoading}
        >
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
