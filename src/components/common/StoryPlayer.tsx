"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
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
  if (screen) {
    containerSize = "w-screen h-screen fixed top-0 left-0 z-10";
  }

  return (
    <div
      className={`${containerSize} overflow-hidden aspect-square
								   bg-white drop-shadow-2xl `}
    >
      <div className="group w-full h-full flex items-center justify-center">
        <StoryProgress closeStory={closeStory} screen={screen} />
        <div className="relative w-full h-full">
          <div ref={emblaRef} className="overflow-hidden h-full">
            <div className="flex touch-pan-y flex-row h-full">
              {stories.map(({ id, image }: Story) => (
                <div key={id} className="flex-[0_0_100%] min-w-0 relative">
                  <Image
                    className="w-full h-full object-cover"
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
