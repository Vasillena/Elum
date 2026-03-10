"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import logo from "@/public/logo-2.svg";
import { useI18n } from "@/locales/client";

gsap.registerPlugin(ScrollTrigger);

interface StickyProps {
  onComplete?: () => void;
}

export default function Sticky({ onComplete }: StickyProps) {
  const t = useI18n();

  const sectionRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  const blocks = useMemo(
    () => [
      { type: "ring" },
      { text: t("hero.text-1") },
      { text: t("hero.text-2") },
      { text: t("hero.text-3") },
      { text: t("hero.text-4") },
      { text: t("hero.text-5") },
    ],
    [t]
  );

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          once: true,
          onLeave: () => {
            onComplete?.();
          },
        },
      });

      blocksRef.current.forEach((el, i) => {
        if (i === 0) {
          tl.to(el, { autoAlpha: 0, scale: 0.95, duration: 0.5 });
        } else {
          tl.fromTo(
            el,
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 0.5 }
          );

          tl.to(el, { autoAlpha: 0, scale: 0.95, duration: 0.5 });
        }
      });

      tl.to(sectionRef.current, {
        autoAlpha: 0,
        duration: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden px-4 md:px-40"
    >
      <div className="h-screen flex items-center justify-center relative">
        {blocks.map((block, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) blocksRef.current[index] = el;
            }}
            className={`absolute flex justify-center items-center text-center ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            {block.type === "ring" ? (
              <div className="relative flex items-center justify-center">
                {/* LED Ring */}
                <div
                  className="w-80 h-80 rounded-full border border-white/20 
        shadow-[0_0_100px_rgba(255,255,255,1),inset_0_0_100px_rgba(255,255,255,0.3)]
        backdrop-blur-md animate-pulse"
                />

                {/* Glow outer layer */}
                <div
                  className="absolute w-90 h-90 md:w-120 md:h-120 
        rounded-full blur-3xl bg-white/10"
                />

                {/* Logo */}
                <div className="absolute flex flex-col items-center gap-4 mt-12">
                  <Image
                    src={logo}
                    alt="Elum logo"
                    width={72}
                    height={303}
                    priority
                  />

                  {/* Scroll dots */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="dot" />
                    <span className="dot delay-1" />
                    <span className="dot delay-2" />
                  </div>
                </div>
              </div>
            ) : (
              <p
                className="text-xl lg:text-4xl mt-6 text-white
        [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] animate-pulse"
              >
                {block.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
