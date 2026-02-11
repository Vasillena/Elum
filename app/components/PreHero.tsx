"use client";

import { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useI18n } from "@/locales/client";

gsap.registerPlugin(ScrollTrigger);

export default function PreHero() {
  const t = useI18n();

  const sectionRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  const blocks = [
    { text: t("hero.text-1") },
    { text: t("hero.text-2") },
    { text: t("hero.text-3") },
    { text: t("hero.text-4") },
    { text: t("hero.text-5") },
  ];

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
        },
      });

      blocksRef.current.forEach((el, i) => {
        tl.fromTo(
          el,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 0.5 }
        );

        if (i !== blocksRef.current.length - 1) {
          tl.to(el, { autoAlpha: 0, scale: 0.95, duration: 0.5 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden px-4 md:px-40"
    >
      <div className="h-screen flex items-center justify-center relative">
        {/* <div className="absolute w-[600px] h-[600px] rounded-full border border-white/10 blur-sm shadow-[0_0_60px_10px_rgba(255,255,255,0.06)]" /> */}

        {blocks.map((block, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) blocksRef.current[index] = el;
            }}
            className="absolute flex justify-center items-center text-center opacity-0"
          >
            <p className="text-xl lg:text-2xl mt-6">{block.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
