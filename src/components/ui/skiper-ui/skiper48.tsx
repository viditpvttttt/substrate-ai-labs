"use client";

import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import { works } from "@/components/work/workData";

/**
 * skiper48 — Card swipe carousel (adapted from Skiper UI, Carousel_002).
 * Stacks the product surface cards with a cards effect, gesture drag,
 * autoplay and navigation buttons. Cards are drawn from the work data so
 * the carousel stays in sync with the portfolio.
 *
 * Attribution: built from Skiper UI — https://skiper-ui.com (free version).
 */
function Skiper48() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-background">
      <Carousel_002 loop autoplay />
    </div>
  );
}

const Carousel_002 = ({
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative w-full max-w-3xl", className)}
    >
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 2600,
                disableOnInteraction: false,
              }
            : false
        }
        effect="cards"
        grabCursor={true}
        loop={loop}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="h-[26rem] w-[19rem] pb-14 sm:h-[28rem] sm:w-[21rem]"
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {works.map((work) => (
          <SwiperSlide key={work.slug} className="rounded-3xl">
            <div
              className="tile-aurora flex h-full w-full flex-col justify-between rounded-3xl p-7 text-white shadow-lg"
              style={
                {
                  "--tile-a": work.colors.a,
                  "--tile-b": work.colors.b,
                  "--tile-c": work.colors.c,
                } as React.CSSProperties
              }
            >
              <div className="relative z-10 flex items-center justify-between">
                <BrandLogo
                  variant={work.logo}
                  alt=""
                  className={`h-10 w-10 rounded-full bg-white/80 p-1 ${
                    work.logo === "kernel" ? "w-14" : ""
                  }`}
                />
                <span className="rounded-full border border-white/40 px-2.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/85">
                  {work.badge}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-3xl drop-shadow-sm">{work.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{work.hero}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:!hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-accent">
                <ChevronRightIcon className="h-5 w-5 text-foreground" />
              </span>
            </div>
            <div className="swiper-button-prev after:!hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:bg-accent">
                <ChevronLeftIcon className="h-5 w-5 text-foreground" />
              </span>
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Skiper48, Carousel_002 };
