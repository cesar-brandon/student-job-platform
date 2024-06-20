import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Experience } from "./add-experience";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

export function ExperienceItem({
  experience,
  index,
  remove,
}: {
  experience: Experience;
  index?: number;
  remove?: () => void;
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
      {remove && (
        <Button
          size="icon"
          type="button"
          variant="outline"
          className="mt-4"
          onClick={remove}
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
