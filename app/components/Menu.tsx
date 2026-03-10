"use client";

import { useCurrentLocale, useI18n } from "@/locales/client";
import { useEffect, useMemo, useRef, useState } from "react";

import { gsap } from "gsap";
import menuBG from "./../menuList/menuListBG.json";
import menuEN from "./../menuList/menuList.json";

const categories = [
  { bg: "Безалкохолни", en: "Soft Drinks", color: "#161616" },
  { bg: "Алкохол", en: "Alcohol", color: "#1D1D1D" },
  { bg: "Коктейли", en: "Mixed Drinks", color: "#2D2D2D" },
  { bg: "Вино", en: "Wine", color: "#363636" },
  { bg: "Бира", en: "Beer", color: "#414141" },
];

const closedClip = "polygon(0% 0%,100% 0%,100% 100%,0% 100%)";
const openClip = "polygon(0% 0%,100% 0%,100% 100%,0% 100%)";

export default function Menu() {
  const locale = useCurrentLocale();
  const t = useI18n();

  const menuList = useMemo(() => {
    return locale === "bg" ? menuBG : menuEN;
  }, [locale]);

  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getCategoryItems = (title: string) => {
    return menuList.menu.filter((item) => item.category === title);
  };

  const open = (index: number) => {
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
        const offset = offsets[index % offsets.length];
        const title = locale === "bg" ? cat.bg : cat.en;

        return (
          <div
            key={index}
            ref={(el) => void (panelsRef.current[index] = el)}
            onClick={() => open(index)}
            className={`absolute top-0 h-full flex items-center justify-center `}
            style={{
              left: `${(100 / categories.length) * index}vw`,

              width: `${100 / categories.length}vw`,
              background: `linear-gradient(145deg, ${cat.color}, #000000)`,
              clipPath: closedClip,
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
            }}
          >
            {!isMobile && (
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
              <div className="flex justify-center items-center z-10">
                <h2
                  className={`uppercase tracking-widest text-center [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] text-lg animate-pulse -rotate-90 lg:rotate-0 text-nowrap lg:text-wrap"
                  `}
                >
                  {title}
                </h2>
              </div>
            )}

            {activeIndex === index && showContent && (
              <div className="w-full h-full flex flex-col items-center pt-20 pb-10 relative z-10">
                <h2 className="text-xl md:text-2xl mb-10 uppercase tracking-widest [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] animate-pulse">
                  {title}
                </h2>

                <div className="w-full max-w-3xl space-y-8 text-gray-300 overflow-y-auto px-8 max-h-[60vh]  md:max-h-[65vh]">
                  {getCategoryItems(title).map((item) => (
                    <div key={item.id}>
                      {item["semi-category"] && (
                        <p className="text-lg text-[#dbbf91] mb-2">
                          {item["semi-category"]}
                        </p>
                      )}

                      <div className="flex items-center">
                        <p>{item.name}</p>

                        <span className="grow border-b border-dotted border-gray-500 mx-2" />

                        <p>
                          {item.quantity} / {item.price}
                        </p>
                      </div>

                      {item.description && (
                        <p className="text-sm text-gray-400 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  className="mt-10 px-16 py-2.5 border-[0.5px] rounded-full text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-transform duration-300 shadow-[0_0_16px_rgba(255,255,255,0.3)]"
                >
                  {t("hero.button")}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
