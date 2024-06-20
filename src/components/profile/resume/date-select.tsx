import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResumeRequest } from "@/lib/validators/resume";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function DateSelect({
  form,
  fieldName,
}: {
  form: UseFormReturn<ResumeRequest>;
  fieldName: `experience.${number}.startDate` | `experience.${number}.endDate`;
}) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    if (selectedMonth !== null && selectedYear !== null) {
      const startDate = new Date(selectedYear, selectedMonth - 1, 1);
      form.setValue(fieldName, startDate.toString());
    }
  }, [selectedMonth, selectedYear, form, fieldName]);

  return (
    <div className="flex items-center gap-2">
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => setSelectedMonth(Number(value))}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="gap-2">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectGroup>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={`${index + 1}`}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => setSelectedYear(Number(value))}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="gap-2">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {years.map((year, index) => (
                    <SelectItem key={index} value={`${year}`}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
