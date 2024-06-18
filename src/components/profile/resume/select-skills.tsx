import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { studentSkills } from "./mock-skills";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  ScrollArea,
  ScrollBar,
  ScrollThumb,
} from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function SelectSkills({ form, career }: { form: any; career: string }) {
  const [open, setOpen] = useState(false);
  const [commandValue, setCommandValue] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const data = studentSkills[career].skills;

  const handleSelect = (selectedValue: string) => {
    const newValue = [...skills];
    const index = newValue.indexOf(selectedValue);
    if (index === -1) {
      newValue.push(selectedValue);
    } else {
      newValue.splice(index, 1);
    }
    setSkills(newValue);
    form.setValue("skills", newValue);
  };

  const handlePopoverToggle = () => {
    setOpen(!open);
  };

  const selectedLabels = skills.map(
    (value) => data.find((item: string) => item === value) || "",
  );

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Elige tus mejores habilidades</h2>{" "}
      <p className="text-sm">
        Escriba sus habilidades de primer nivel o elija entre sugerencias.
      </p>
      <div className="flex flex-col gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                onClick={handlePopoverToggle}
              >
                {selectedLabels.length > 0
                  ? `${selectedLabels.length} elementos seleccionados`
                  : "Selecciona los elementos..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="sm:w-[20rem] p-0">
            <Command>
              <CommandInput
                placeholder="Busca los elementos..."
                isLoading={false}
                value={commandValue}
                onValueChange={setCommandValue}
              />
              <CommandEmpty className="p-1 text-foreground h-40">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start px-2 py-1.5"
                  onClick={() => {
                    data.push(commandValue);
                    handleSelect(commandValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      skills.includes(commandValue)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <span className="text-sm truncate font-normal">
                    {commandValue}
                  </span>
                </Button>
                {/* <CommandItem */}
                {/*   value={commandValue} */}
                {/*   onSelect={() => handleSelect(commandValue)} */}
                {/* > */}
                {/*   <Check */}
                {/*     className={cn( */}
                {/*       "mr-2 h-4 w-4", */}
                {/*       skills.includes(commandValue) */}
                {/*         ? "opacity-100" */}
                {/*         : "opacity-0", */}
                {/*     )} */}
                {/*   /> */}
                {/*   <span className="text-truncate">{commandValue}</span> */}
                {/* </CommandItem> */}
              </CommandEmpty>
              <CommandGroup className="h-40">
                <ScrollArea className="w-full h-40">
                  <ScrollBar>
                    <ScrollThumb className="bg-accent-foreground/20 z-10" />
                  </ScrollBar>
                  {data &&
                    data.map((item: string) => (
                      <CommandItem
                        key={item}
                        value={item}
                        onSelect={() => handleSelect(item)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            skills.includes(item) ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <span className="truncate">{item}</span>
                      </CommandItem>
                    ))}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="w-full h-[10rem] border rounded-md p-4 overflow-y-auto">
          {selectedLabels.map((label, i) => (
            <Badge key={i} className="rounded-sm p-2 m-1">
              {label}
              <X
                className="ml-2 w-4 h-4"
                onClick={() => {
                  handleSelect(label);
                }}
              />
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
