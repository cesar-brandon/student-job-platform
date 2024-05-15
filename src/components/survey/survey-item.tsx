import React from "react";
import { CarouselItem } from "@/components/ui/carousel";
import { Question } from "@/types/question";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { careerData } from "@/lib/utils";

interface SurveryItemProps {
  question: Question;
  career: string;
}

export function SurveryItem(props: SurveryItemProps) {
  const { id, question: questionText, options, answer } = props.question;
  const careerColor = careerData[props.career]?.color || "bg-primary";
  const [isListening, setIsListening] = React.useState(false);

  return (
    <CarouselItem key={id}>
      <section className="w-full flex flex-col items-center gap-8">
        <p className="text-center text-3xl">{questionText}</p>
        <div className="flex flex-col">
          {options &&
            options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input type="radio" name="radio" id={option.id} />
                <label htmlFor={option.id}>{option.value}</label>
              </div>
            ))}
          {answer === "" && (
            <Button
              variant="outline"
              onClick={() => setIsListening(!isListening)}
            >
              {isListening ? (
                <AudioSpectrum color={careerColor} />
              ) : (
                <MicrophoneIcon
                  className={`h-8 w-8 text-${careerColor.replace("bg-", "")}`}
                />
              )}
            </Button>
          )}
        </div>
      </section>
    </CarouselItem>
  );
}

export function AudioSpectrum({ color }: { color: string }) {
  const container = {
    up: { height: "28px" },
    down: { height: "4px" },
  };

  const renderMotionSpan = (delay: number) => (
    <motion.span
      variants={container}
      initial="down"
      animate="up"
      transition={{
        delay: delay,
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className={`w-2 h-5 ${color} rounded-sm`}
    />
  );

  const elements = [0, 0.3, 0.45, 0, 0.3, 0.45];

  return (
    <div className="relative flex items-center gap-2 mx-auto">
      {elements.map((element, index) => (
        <React.Fragment key={index}>{renderMotionSpan(element)}</React.Fragment>
      ))}
    </div>
  );
}
