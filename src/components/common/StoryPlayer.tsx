"use client";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import { useCallback, useState } from "react";
import { DotButton, useDotButton } from "./StoryDotButton";
import { NextButton, PrevButton, usePrevNextButtons } from "./StoryArrowButton";
import { cn } from "@/lib/utils";
import BlurImage from "./blur-image";

interface StoryPlayerProps {
  stories: Story[];
  screen?: boolean;
  closeStory?: () => void;
  options?: EmblaOptionsType;
}

const StoryPlayer = ({ screen, closeStory, stories, options }: StoryPlayerProps) => {
  const [muted, setMuted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onButtonClick)

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
          className={`z-[21] h-[8rem] opacity-0 group-hover:opacity-100 absolute top-0 right-0 left-0 py-4 px-8 
          transition-all duration-300 ease-in-out ${grandient}`}
        >
          <span className="absolute top-0 left-0 w-full h-20 opacity-40 bg-gradient-to-b from-black to-transparent"></span>
          <div className="flex gap-2 w-full h-[1rem]">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  'flex-1 h-1 rounded-sm bg-white opacity-40',
                  { 'opacity-95': index === selectedIndex }
                )}
              />
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
              <button className="text-white z-10" onClick={() => closeStory()}>
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
              {stories.map(({ id, image, title }: Story) => (
                <div
                  key={id}
                  className={`flex flex-[0_0_100%]  min-w-0 relative ${containerImage}`}
                >
                  <BlurImage
                    alt={`Story ${title}`}
                    width="1920"
                    height="1080"
                    className={`${imageClass} bg-white`}
                    src={image}
                  />
                </div>
              ))}
            </div>
          </div>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div >
  );
};

export default StoryPlayer;
