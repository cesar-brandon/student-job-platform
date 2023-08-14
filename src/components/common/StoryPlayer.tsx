"use client";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import StoryProgress from "./StoryProgress";

interface StoryPlayerProps {
  stories: Story[];
  screen?: boolean;
  closeStory?: () => void;
}

const StoryPlayer = ({ screen, closeStory, stories }: StoryPlayerProps) => {
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000 })]
  );

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevButton(!embla.canScrollPrev());
    setNextButton(!embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    return () => embla.destroy();
  }, [embla, onSelect]);

  let containerSize = "w-[22rem] h-[40rem] rounded-[2rem]";
  let imageClass = "w-full h-full object-cover";
  let containerImage = "";
  let grandient = "";
  if (screen) {
    containerSize = "w-screen h-screen fixed top-0 left-0 z-10 bg-gray-900";
    imageClass = "w-full h-full lg:w-[30rem] object-cover lg:rounded-2xl";
    containerImage = "items-center justify-center lg:py-8 bg-gray-900";
    grandient = "lg:from-transparent";
  }
  return (
    <div
      className={`${containerSize} overflow-hidden aspect-square
					drop-shadow-2xl z-20`}
    >
      <div className="group w-full h-full flex items-center justify-center">
        <div
          className={`z-[21] h-[8rem] opacity-40 group-hover:opacity-100 absolute top-0 right-0 left-0 py-4 px-8 
				  bg-gradient-to-b from-zinc-600 via-transparent to-transparent transition-all duration-300 ease-in-out ${grandient}`}
        >
          <div className="flex gap-2 w-full h-[1rem]">
            {stories.map((story, index) => (
              <StoryProgress key={index} />
            ))}
          </div>
          <div className="w-full flex justify-between">
            <button
              className="z-[1] text-white bg-transparent border-none w-5 h-5 invisible"
              aria-label="Mutear"
              onClick={() => setMuted(!muted)}
            >
              <span className="inline-flex items-center justify-center w-5 h-5">
                {muted ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
              </span>
            </button>
            {screen && closeStory && (
              <button className="text-white" onClick={() => closeStory()}>
                <span className="inline-flex items-center justify-center w-5 h-5">
                  <XMarkIcon />
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="relative w-full h-full">
          <div ref={emblaRef} className="overflow-hidden h-full">
            <div className="flex touch-pan-y flex-row h-full">
              {stories.map(({ id, image }: Story) => (
                <div
                  key={id}
                  className={`flex flex-[0_0_100%]  min-w-0 relative ${containerImage}`}
                >
                  <Image
                    className={`${imageClass} bg-white`}
                    src={image}
                    alt={image}
                    width="1920"
                    height="1080"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute w-2/4 h-full flex items-center justify-center
								   left-0 top-1/2 transform -translate-y-1/2"
            disabled={prevButton}
            onClick={scrollPrev}
          ></button>
          <button
            className="absolute w-2/4 h-full flex items-center justify-center
								   right-0 top-1/2 transform -translate-y-1/2"
            disabled={nextButton}
            onClick={scrollNext}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default StoryPlayer;
