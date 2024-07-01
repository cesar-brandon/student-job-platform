import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import BlurImage from "./common/blur-image";
import AutoScroll from "embla-carousel-auto-scroll";

export function StudentCarousel() {
  const items: Story[] = [
    {
      id: 1,
      image: "/stories/4.png",
      title: "DSI",
    },
    {
      id: 2,
      image: "/stories/2.png",
      title: "Enfermeria",
    },
    {
      id: 3,
      image: "/stories/3.png",
      title: "Finanzas",
    },
    {
      id: 4,
      image: "/stories/1.png",
      title: "Farmacia",
    },
    {
      id: 5,
      image: "/stories/4.png",
      title: "DSI",
    },
    {
      id: 6,
      image: "/stories/2.png",
      title: "Enfermeria",
    },
    {
      id: 7,
      image: "/stories/3.png",
      title: "Finanzas",
    },
    {
      id: 8,
      image: "/stories/1.png",
      title: "Farmacia",
    },
  ];

  return (
    <section
      className="relative xl:w-[1440px] lg:w-[1024px] min-[0px]:w-[480px] max-w-full mr-auto ml-auto lg:px-8 xl:px-16 px-6
      my-[5rem] flex justify-center gap-8"
    >
      <Carousel
        className="w-full"
        opts={{ align: "center", loop: true, watchDrag: false }}
        plugins={[AutoScroll()]}
      >
        <span className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/1 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="relative rounded-3xl w-[15rem] sm:w-[18rem] h-[15rem] sm:h-[20rem] bg-muted overflow-hidden even:mt-32">
                <BlurImage src={item.image} alt={item.title + " image"} fill />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <span className="absolute right-0 top-0 w-16 h-full bg-gradient-to-r from-transparent to-background z-10" />
      </Carousel>
      {/* {stories.map((story) => ( */}
      {/*   <div */}
      {/*     key={story.id} */}
      {/*     className="relative rounded-full w-[14rem] h-[38rem] bg-muted overflow-hidden even:mt-32 border-2" */}
      {/*   > */}
      {/*     <BlurImage src={story.image} alt={story.title + " image"} fill /> */}
      {/*   </div> */}
      {/* ))} */}
    </section>
  );
}
