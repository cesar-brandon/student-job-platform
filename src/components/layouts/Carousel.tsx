"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import BackButton from "../common/BackButton";

const Carousel = () => {
  const posts: Post[] = [
    {
      imageUrl: "/cover/1.png",
      title: "1",
    },
    {
      imageUrl: "/cover/2.png",
      title: "2",
    },
    {
      imageUrl: "/cover/3.png",
      title: "3",
    },
    {
      imageUrl: "/cover/4.png",
      title: "4",
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
    <div className="hidden relative lg:block w-full md:w-1/2 xl:w-2/3 h-screen p-4">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-tl-[2rem] rounded-br-[2rem] h-full"
      >
        <div className="flex touch-pan-y flex-row h-full">
          {posts.map((post: Post) => (
            <div key={post.title} className="flex-[0_0_100%] min-w-0 relative">
              <Image
                className="block w-full h-full object-cover"
                src={post.imageUrl}
                alt={post.title}
                width="1920"
                height="1080"
              />
            </div>
          ))}
        </div>
      </div>
      <BackButton type="arrow" />
    </div>
  );
};

export default Carousel;
