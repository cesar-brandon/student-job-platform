"use client";

import { DotButton, useDotButton } from "@/components/common/dot-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ResumeRequest, ResumeValidator } from "@/lib/validators/resume";
import { user } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfessionalSummary } from "./professional-summary";
import { SelectSkills } from "./select-skills";

export default function ResumeCreateCard({ user }: { user: user }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const username = usePathname().split("/")[1];

  const form = useForm<ResumeRequest>({
    resolver: zodResolver(ResumeValidator),
    defaultValues: {
      professionalSummary: null,
      skills: [],
      experience: [],
      projects: [],
    },
  });

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    console.log(current);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  const router = useRouter();

  const onSubmit = async (data: ResumeRequest) => {
    console.log(data);
  };

  return (
    <Card className="h-fit w-full bg-background">
      <div className="flex gap-2 w-full h-[1rem] px-6 py-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <DotButton
            key={index}
            className={cn(
              "flex-1 h-2 rounded-sm bg-muted",
              current === index ? `bg-primary` : "",
            )}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <ProfessionalSummary errors={form.formState.errors} />
                </CarouselItem>
                <CarouselItem>
                  <SelectSkills />
                </CarouselItem>
              </CarouselContent>
              {/* <CarouselPrevious /> */}
              {/* <CarouselNext /> */}
            </Carousel>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push(`/${username}`)}>
          Cancelar
        </Button>
        <Button variant="secondary">Continuar</Button>
      </CardFooter>
    </Card>
  );
}
