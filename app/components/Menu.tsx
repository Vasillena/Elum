"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

const categories = [
  { title: "МЕНЮ", color: "transparent", static: true },
  { title: "БЕЗАЛКОХОЛНИ", color: "#161616" },
  { title: "АЛКОХОЛНИ", color: "#1D1D1D" },
  { title: "КОКТЕЙЛИ", color: "#2D2D2D" },
  { title: "ВИНО", color: "#363636" },
  { title: "БИРА", color: "#414141" },
];

const closedClipDesktop = "polygon(75% 0%, 100% 0%, 25% 100%, 0% 100%)";
const closedClipMobile = "polygon(0% 0%,100% 0%,100% 100%,0% 100%)";
const openClip = "polygon(0% 0%,100% 0%,100% 100%,0% 100%)";

export default function Menu() {
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const panelWidth = 40;
  const gap = 10;
  const totalWidth = panelWidth + (categories.length - 1) * gap;
  const baseOffset = (100 - totalWidth) / 2;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const open = (index: number) => {
    if (categories[index].static || activeIndex !== null) return;

    setActiveIndex(index);
    setShowContent(false);

    const panel = panelsRef.current[index];
    if (!panel) return;

    const tl = gsap.timeline({
      onComplete: () => setShowContent(true),
    });

    tlRef.current = tl;

    panelsRef.current.forEach((p, i) => {
      if (i !== index && p) {
        tl.to(p, { opacity: 0, pointerEvents: "none", duration: 0.4 }, 0);
      }
    });

    tl.to(
      panel,
      { left: 0, width: "100vw", duration: 0.8, ease: "power3.inOut" },
      0
    ).to(panel, { clipPath: openClip, duration: 0.8, ease: "power3.inOut" }, 0);
  };

  const close = () => {
    if (!tlRef.current) return;

    setShowContent(false);

    tlRef.current.reverse();
    tlRef.current.eventCallback("onReverseComplete", () =>
      setActiveIndex(null)
    );
  };

  const offsets = ["0%", "10%", "20%", "30%", "40%", "50%"];

  return (
    <div className="relative w-screen h-dvh sm:h-screen overflow-hidden bg-[#0C0C0C] text-white font-sans">
      <style>
        {`
        @keyframes rippleFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        `}
      </style>

      {categories.map((cat, index) => {
        const isStatic = cat.static || false;
        const offset = offsets[index % offsets.length];

        return (
          <div
            key={index}
            ref={(el) => void (panelsRef.current[index] = el)}
            onClick={() => open(index)}
            className={`absolute top-0 h-full flex items-center justify-center ${
              isStatic ? "cursor-default" : "cursor-pointer"
            }`}
            style={{
              left: isMobile
                ? `${(100 / categories.length) * index}vw`
                : `${baseOffset + index * gap}vw`,
              width: isMobile
                ? `${100 / categories.length}vw`
                : `${panelWidth}vw`,
              background:
                cat.color !== "transparent"
                  ? `linear-gradient(145deg, ${cat.color}, #000000)`
                  : "transparent",
              clipPath: isMobile ? closedClipMobile : closedClipDesktop,
              boxShadow: isStatic ? "none" : "inset 0 0 30px rgba(0,0,0,0.8)",
            }}
          >
            {!isStatic && !isMobile && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "url('/test.jpg') center/cover no-repeat",
                  backgroundSize: "300% 300%",
                  animation: `rippleFlow ${20 + index}s linear infinite`,
                  filter: "blur(8px)",
                  mixBlendMode: "screen",
                  zIndex: 0,
                  opacity: 0.05,
                  backgroundPosition: offset,
                }}
              />
            )}

            {activeIndex !== index && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 -rotate-90 md:rotate-[-70deg] lg:rotate-[-65deg] xl:rotate-[-59deg]">
                <h2
                  className={`tracking-widest ${
                    isStatic
                      ? "text-4xl md:text-5xl lg:text-7xl font-black md:pl-28 [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff]"
                      : "text-sm xl:text-lg [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] animate-pulse"
                  }`}
                >
                  {cat.title}
                </h2>
              </div>
            )}

            {activeIndex === index && showContent && (
              <div className="text-center space-y-6 relative z-10">
                <h2 className="text-sm xl:text-lg font-light tracking-wide text-gray-100">
                  {cat.title}
                </h2>

                <div className="space-y-2 text-lg text-gray-300">
                  <p>Drink 1</p>
                  <p>Drink 2</p>
                  <p>Drink 3</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  className="mt-8 px-6 py-2 border border-gray-500 hover:bg-gray-700 hover:text-white transition"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
