import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

export type CarouselApi = UseEmblaCarouselType[1]
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]