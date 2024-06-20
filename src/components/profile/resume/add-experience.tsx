import { DateSelect } from "@/components/profile/resume/date-select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ResumeRequest } from "@/lib/validators/resume";
import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form";

type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export function AddExperience({
  form,
}: {
  form: UseFormReturn<ResumeRequest>;
}) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    console.log(fields.length);
  }, [fields]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Experiencia laboral</h2>
      <p className="text-sm">
        Agrega tu experiencia laboral para que los empleadores sepan más sobre
        ti.
      </p>

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
        if (index === 0) {
          return (
            <div key={index} className="space-y-4 px-1">
              <div className="flex flex-col sm:flex-row gap-2">
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
                        <Input id="company" placeholder="Empresa" {...field} />
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
                      <Input id="location" placeholder="Ubicación" {...field} />
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
                <Separator className="w-20" />
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

      <div className="flex gap-2">
        {!form.formState.errors.experience && (
          <Button
            size="icon"
            type="button"
            variant="checked"
            className={fields.length > 0 ? "" : "hidden"}
            onClick={async () => {
              const isValid = await form.trigger(
                `experience.${fields.length - 1}`,
              );
              if (fields.length < 0) return;

              if (isValid) {
                setExperiences([
                  ...experiences,
                  form.getValues(`experience.${fields.length - 1}`),
                ]);
                remove(fields.length - 1);
              }
            }}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button
          size="icon"
          type="button"
          variant="outline"
          onClick={() => {
            append({
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
            });
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function ExperienceItem({
  experience,
  index,
  remove,
}: {
  experience: Experience;
  index: number;
  remove: () => void;
}) {
  function convertDate(inputFormat: string): string {
    let date = new Date(inputFormat);
    let month = date.getMonth() + 1;
    let year = date.getFullYear().toString().slice(-2);
    return `${month.toString().padStart(2, "0")}/${year}`;
  }
  const experienceSlug = experience.title.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="flex items-center gap-2">
      <AccordionItem
        value={`experience-${index}-${experienceSlug}`}
        className="w-full bg-accent/40 border rounded-md px-4 mt-4"
      >
        <AccordionTrigger>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{experience.title}</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <p className="text-md font-normal text-muted-foreground">
                {experience.company} - {experience.location}
              </p>
              <p className="text-md font-normal text-muted-foreground">
                {convertDate(experience.startDate)} -
                {convertDate(experience.endDate)}
              </p>
            </div>
            <p className="text-md font-normal py-2">{experience.description}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <Button
        size="icon"
        type="button"
        variant="outline"
        className="mt-4"
        onClick={remove}
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}
