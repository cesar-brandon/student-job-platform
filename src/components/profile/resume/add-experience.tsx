import { DateSelect } from "@/components/profile/resume/date-select";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeRequest } from "@/lib/validators/resume";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form";
import { ExperienceItem } from "./experience-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

//NOTE: mostrar en una sola linea el mensaje de error de las fechas

export function AddExperience({
  form,
}: {
  form: UseFormReturn<ResumeRequest>;
}) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Experiencia laboral</h2>
      <p className="text-sm">
        Agrega tu experiencia laboral para que los empleadores sepan más sobre
        ti.
      </p>

      <ScrollArea className="h-[20rem]">
        <Accordion type="multiple">
          {experiences.map((item, index) => (
            <ExperienceItem
              key={index}
              experience={item}
              index={index}
              remove={() => {
                setExperiences(experiences.filter((_, i) => i !== index));
                remove(index);
              }}
            />
          ))}
        </Accordion>

        {fields.map((field, index) => {
          if (index >= experiences.length) {
            return (
              <div key={index} className="space-y-4 px-1 mt-2">
                <div className="flex flex-col sm:flex-row gap-2">
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
                    name={`experience.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Rol</FormLabel>
                        <FormControl>
                          <Input id="title" placeholder="Rol" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Empresa</FormLabel>
                        <FormControl>
                          <Input
                            id="company"
                            placeholder="Empresa"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`experience.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Ubicación</FormLabel>
                      <FormControl>
                        <Input
                          id="location"
                          placeholder="Ubicación"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                  <DateSelect
                    form={form}
                    fieldName={`experience.${index}.startDate`}
                  />
                  <div className="w-full border-b" />
                  <DateSelect
                    form={form}
                    fieldName={`experience.${index}.endDate`}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`experience.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Descripción"
                          className="resize-none"
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
                title: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              });
            }

            const isValid = await form.trigger(
              `experience.${fields.length - 1}`,
            );
            if (isValid) {
              const newExperience = form.getValues(
                `experience.${fields.length - 1}`,
              );
              if (newExperience && experiences.length < fields.length) {
                setExperiences([
                  ...experiences,
                  form.getValues(`experience.${fields.length - 1}`),
                ]);
                append({
                  title: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                });
              } else {
                append({
                  title: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
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
