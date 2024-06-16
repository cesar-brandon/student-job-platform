import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function ResumeOptions({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: "cv-create" | "cv-import";
  setSelectedOption: (value: "cv-create" | "cv-import") => void;
}) {
  return (
    <RadioGroup
      onValueChange={(value) => setSelectedOption(value as any)}
      defaultValue={selectedOption}
    >
      <div className="flex items-center gap-4 pl-6 rounded-sm border hover:border-primary transition-all duration-300">
        <RadioGroupItem value="cv-create" id="cv-create" />
        <Label
          htmlFor="cv-create"
          className="w-full font-semibold text-md py-4"
        >
          Crea desde cero
          <p className="font-normal text-sm text-muted-foreground">
            Completa tu currículum como quieras
          </p>
        </Label>
      </div>
      <div className="flex items-center gap-4 pl-6 rounded-sm border hover:border-primary transition-all duration-300">
        <RadioGroupItem value="cv-import" id="cv-import" />
        <Label
          htmlFor="cv-import"
          className="w-full font-semibold text-md py-4"
        >
          Importa tu CV
          <p className="font-normal text-sm text-muted-foreground">
            Importa tu currículum actual y edítalo
          </p>
        </Label>
      </div>
    </RadioGroup>
  );
}
