"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { useQuestionStore } from "@/store/question";
import { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { SurveryItem } from "@/components/survey/survey-item";

export default function SurveyPage({ params }: { params: { slug: string } }) {
  const questions = useQuestionStore((state) => state.questions);
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(count / 100);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setProgress(((api.selectedScrollSnap() + 1) / count) * 100);
    api.on("select", () => {
      setProgress(((api.selectedScrollSnap() + 1) / count) * 100);
    });
  }, [api, count, progress]);

  return (
    <div className="w-full sm:max-w-sm md:max-w-xl">
      <div className="w-full mb-8">
        <p className="text-center mb-2">Encuesta</p>
        <Progress
          value={progress}
          className={`career-${params.slug} h-2 rounded-full`}
        />
      </div>

      <Carousel setApi={setApi}>
        <CarouselContent>
          {questions.map((question, index) => (
            <SurveryItem key={index} question={question} career={params.slug} />
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
