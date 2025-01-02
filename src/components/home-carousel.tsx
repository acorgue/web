"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export interface HomeCarouselProps {
  images: string[];
}

export function HomeCarousel({ images }: Readonly<HomeCarouselProps>) {
  return (
    <Carousel
      opts={{ loop: true, containScroll: false }}
      plugins={[Fade(), Autoplay()]}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={src}>
            <Image
              src={src}
              alt="Orgue"
              className="w-full h-screen object-cover"
              width={1920}
              height={1281}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
