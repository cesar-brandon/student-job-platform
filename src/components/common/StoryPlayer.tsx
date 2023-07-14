"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import StoryProgress from "./StoryProgress";

const StoryPlayer = () => {
  const stories = [
    {
      id: 1,
      image: "/stories/1.png",
    },
    {
      id: 2,
      image: "/stories/2.png",
    },
    {
      id: 3,
      image: "/stories/3.png",
    },
    {
      id: 4,
      image: "/stories/4.png",
    },
  ];
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000 })]
  );

  return (
    <div className="w-[22rem] h-[40rem] rounded-[2rem] bg-white drop-shadow-2xl overflow-hidden aspect-square">
      <div className="group w-full h-full flex items-center justify-center">
        <StoryProgress />
        <div className="relative w-full h-full">
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-tl-[2rem] rounded-br-[2rem] h-full"
          >
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
