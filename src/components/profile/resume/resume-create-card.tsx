"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Form } from "@/components/ui/form";
import { careerData, cn } from "@/lib/utils";
import { ResumeRequest, ResumeValidator } from "@/lib/validators/resume";
import { user } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ProfessionalSummary from "./professional-summary";
import { SelectSkills } from "./select-skills";
import type EditorJS from "@editorjs/editorjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { AddExperience } from "./add-experience";
import { AddProject } from "./add-project";
import { AddResumePdf } from "./add-resume-pdf";

export default function ResumeCreateCard({ user }: { user: user }) {
  const ref = useRef<EditorJS>();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const username = usePathname().split("/")[1];

  const form = useForm<ResumeRequest>({
    mode: "onSubmit",
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
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const router = useRouter();

  const { mutate: craeteResume, isLoading } = useMutation({
    mutationFn: async (payload: ResumeRequest) => {
      const { data } = await axios.post(`/api/user/${user.id}/resume`, payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Algo salió mal",
        description:
          "Tu currículum no se pudo crear, por favor intenta de nuevo más tarde",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/${username}`);
      toast({
        description: "Tu currículum resumen ha sido creado.",
      });
      router.refresh();
    },
  });

  const onSubmit = async (data: ResumeRequest) => {
    const blocks = await ref.current?.save();
    if (!blocks) return;
    const payload: ResumeRequest = {
      ...data,
      professionalSummary: blocks,
    };
    craeteResume(payload);
  };

  return (
    <Card className="h-fit w-full bg-background">
      <div className="flex gap-2 w-full h-[1rem] px-6 py-8">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "flex-1 h-2 rounded-sm bg-muted hover:opacity-80 cursor-pointer transition-all",
              current > index ? `bg-primary` : "",
            )}
            onClick={() => api && api.scrollTo(index)}
          />
        ))}
      </div>
      <CardContent>
        <Form {...form}>
          <form>
            <Carousel
              setApi={setApi}
              opts={{
                watchDrag: false,
              }}
            >
              <CarouselContent>
                <CarouselItem>
                  <ProfessionalSummary
                    career={careerData[user.career || ""].name}
                    errors={form.formState.errors}
                    ref={ref}
                  />
                </CarouselItem>
                <CarouselItem>
                  <SelectSkills form={form} career={user.career || ""} />
                </CarouselItem>
                <CarouselItem>
                  <AddExperience form={form} />
                </CarouselItem>
                <CarouselItem>
                  <AddProject form={form} />
                </CarouselItem>
                <CarouselItem>
                  <AddResumePdf />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (current === 1) return router.push(`/${username}`);
            if (api) api.scrollTo(current - 2);
          }}
        >
          {current === 1 ? "Cancelar" : "Atrás"}
        </Button>
        <Button
          variant={current === count ? "default" : "outline"}
          type={"button"}
          isLoading={isLoading}
          onClick={() => {
            if (current === count) return form.handleSubmit(onSubmit)();
            if (api) api.scrollTo(current);
          }}
        >
          {current === count ? "Crear currículum" : "Siguiente"}
        </Button>
      </CardFooter>
    </Card>
  );
}
