import { EmblaOptionsType } from "embla-carousel-react";

// 2 to demonstrate infinite scroll, should be higher in production
export const INFINITE_SCROLL_PAGINATION_RESULTS = 4;

// embla carousel
export const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }
export const SLIDE_COUNT = 5
export const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
