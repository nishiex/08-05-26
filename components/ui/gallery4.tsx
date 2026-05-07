"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  eyebrow?: string
  items: Gallery4Item[]
}

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  eyebrow,
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on("select", updateSelection)
    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-[5%]">
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <div className="flex flex-col gap-3">
            {eyebrow && (
              <p className="text-[11px] font-mono font-medium tracking-[2.5px] uppercase text-accent">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-3xl font-medium md:text-4xl lg:text-5xl tracking-tight">
              {title}
            </h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label="Next slide"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group block rounded-xl">
                  <div
                    className="relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-xl border border-black/5 p-6 md:p-7 md:aspect-[5/4] lg:aspect-[16/9] transition-colors"
                    style={{
                      background:
                        "linear-gradient(155deg, #0c1115 0%, #11202a 55%, #0a1417 100%)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-90"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(26,188,217,0.35), rgba(26,188,217,0) 70%)",
                      }}
                    />
                    <div className="relative text-white">
                      <div className="mb-2 text-lg font-semibold md:text-xl">
                        {item.title}
                      </div>
                      <div className="mb-6 line-clamp-3 text-sm text-gray-300 md:mb-8 md:text-[15px]">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm text-[#95d9e8]">
                        Learn more
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Gallery4 }
