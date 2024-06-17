import { Badge } from "@/components/ui/badge";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SelectSkills() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Elige tus mejores habilidades</h2>{" "}
      <p className="text-sm">
        Escriba sus habilidades de primer nivel o elija entre sugerencias.
      </p>
      <div className="flex flex-col gap-2">
        <FormField
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Escribe tus habilidades" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full h-[10rem] border rounded-md p-4 overflow-y-auto">
          {Array.from({ length: 20 }, (_, i) => (
            <Badge key={i} className="rounded-sm p-2 m-1">
              Ejemplo
              <X className="ml-2 w-4 h-4" />
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
