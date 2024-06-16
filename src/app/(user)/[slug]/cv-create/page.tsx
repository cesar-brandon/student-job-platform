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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResumeCreatePage() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  const router = useRouter();
  return (
    <Card className="h-fit w-full bg-background">
      <div className="flex gap-2 w-full h-[1rem] px-6 py-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <DotButton
            key={index}
            className={cn(
              "flex-1 h-2 rounded-sm bg-muted",
              current === index ? "bg-primary" : "",
            )}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
      <CardContent>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <p className="font-bold text-lg">Resumen profesional</p>
              <p>
                ¡Escriba de 2 a 4 oraciones para aumentar las posibilidades de
                una entrevista!
              </p>
              <div className="w-full h-44 bg-accent/40 rounded-md"></div>
            </CarouselItem>
            <CarouselItem>hello 2</CarouselItem>
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button variant="secondary">Continuar</Button>
      </CardFooter>
    </Card>
  );
}
