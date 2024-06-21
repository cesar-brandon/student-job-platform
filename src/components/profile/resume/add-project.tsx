import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeRequest } from "@/lib/validators/resume";
import { useState } from "react";
import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { ProjectItem } from "./project-item";

export type Project = {
  name: string;
  description: string;
  url: string;
};

export function AddProject({ form }: { form: UseFormReturn<ResumeRequest> }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Proyectos y trabajos destacados</h2>
      <p className="text-sm">
        Agrega tus proyectos y trabajos destacados para que los empleadores
        sepan más sobre ti.
      </p>

      <ScrollArea className="h-[20rem]">
        <div className="flex flex-col gap-2">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              project={project}
              remove={() => {
                setProjects(projects.filter((_, i) => i !== index));
                remove(index);
              }}
            />
          ))}
        </div>

        {fields.map((field, index) => {
          if (index >= projects.length) {
            return (
              <div key={field.id} className="space-y-4 px-1 mt-2">
                <div className="w-full flex flex-col sm:flex-row gap-2">
                  <Button
                    size="icon"
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => remove(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <FormField
                    control={form.control}
                    name={`projects.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Título</FormLabel>
                        <FormControl>
                          <Input id="name" placeholder="Título" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`projects.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">URL</FormLabel>
                        <FormControl>
                          <Input id="url" placeholder="URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        Descripción del proyecto
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Descripción"
                          className="h-24 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          }
        })}
        <Button
          size="icon"
          type="button"
          variant="outline"
          className="mt-4"
          onClick={async () => {
            if (fields.length === 0) {
              return append({
                name: "",
                description: "",
                url: "",
              });
            }

            const isValid = await form.trigger(`projects.${fields.length - 1}`);
            if (isValid) {
              const newExperience = form.getValues(
                `projects.${fields.length - 1}`,
              );
              if (newExperience && projects.length < fields.length) {
                setProjects([
                  ...projects,
                  form.getValues(`projects.${fields.length - 1}`),
                ]);
                append({
                  name: "",
                  description: "",
                  url: "",
                });
              } else {
                append({
                  name: "",
                  description: "",
                  url: "",
                });
              }
            }
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </ScrollArea>
    </section>
  );
}
