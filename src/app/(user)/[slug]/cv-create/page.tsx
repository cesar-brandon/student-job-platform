"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

export default function ResumeCreatePage() {
  const router = useRouter();
  return (
    <Card className="h-fit w-full bg-background">
      <CardHeader>Steps</CardHeader>
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
