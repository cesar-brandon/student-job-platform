"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "../ui/button";
import StoryProgress from "./StoryProgress";

interface StoryPlayerProps {
  stories: Story[];
  screen?: boolean;
  closeStory?: () => void;
}

const StoryPlayer = ({ screen, closeStory, stories }: StoryPlayerProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000 })]
  );

  let containerSize = "w-[22rem] h-[40rem] rounded-[2rem]";
  let imageClass = "w-full h-full object-cover bg-white";
  let containerImage = "";
  if (screen) {
    containerSize = "w-screen h-screen fixed top-0 left-0 z-10 bg-gray-900";
    imageClass = "w-full h-full md:w-[30rem] object-cover md:rounded-2xl";
    containerImage = "items-center justify-center md:py-8 bg-gray-900";
  }

  return (
    <div
      className={`${containerSize} overflow-hidden aspect-square
					drop-shadow-2xl z-20`}
    >
      <div className="group w-full h-full flex items-center justify-center">
        <StoryProgress closeStory={closeStory} screen={screen} />
        <div className="relative w-full h-full">
          <div ref={emblaRef} className="overflow-hidden h-full">
            <div className="flex touch-pan-y flex-row h-full">
              {stories.map(({ id, image }: Story) => (
                <div
                  key={id}
                  className={`flex flex-[0_0_100%]  min-w-0 relative ${containerImage}`}
                >
                  <Image
                    className={`${imageClass}`}
                    src={image}
                    alt={image}
                    width="1920"
                    height="1080"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPlayer;

// <Button
//   variant="outline"
//   size="icon"
//   className="rounded-full bg-gray-700 border-gray-700"
// >
//   <ChevronRightIcon className="w-4 h-4" />
// </Button>
