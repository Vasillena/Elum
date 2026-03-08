"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useRef } from "react";

const pages = [
  { title: "HOME", href: "/" },
  { title: "MENU", href: "/menu" },
  { title: "GALLERY", subtitle: "( Coming soon )", href: "" },
  { title: "CONTACTS", subtitle: "( Coming soon )", href: "" },
];

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleHover = (index: number) => {
    gsap.to(panelsRef.current, { flex: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(panelsRef.current[index], {
      flex: 3,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(panelsRef.current, { flex: 1, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-screen mx-auto px-6 sm:px-20 backdrop-blur-xl bg-black/50 flex justify-between items-center transition-opacity duration-500 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {pages.map((page, i) => (
        <Link
          key={i}
          href={page.href}
          className="flex"
          onClick={() => onClose()}
        >
          <div
            ref={(el) => {
              panelsRef.current[i] = el;
            }}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={handleLeave}
            className="flex w-[20vw] sm:w-[16vw] h-[80vh] sm:h-[90vh] items-center justify-center border border-white/10 rounded-md sm:rounded-2xl relative cursor-pointer group transition-all"
          >
            {/* glow frame */}
            <div
              className="absolute inset-0 border border-white-400/40 rounded-md sm:rounded-2xl
      shadow-[0_0_20px_rgba(255,255,255,0.3)]
      group-hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]
      transition-all duration-500"
            />

            {/* vertical text wrapper */}
            <div className="flex items-center justify-center -rotate-90 text-nowrap [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] animate-pulse">
              <h2 className="text-white text-2xl tracking-[0.5em]">
                {page.title}
              </h2>
              {page.subtitle && (
                <p className="text-white text-2xl whitespace-nowrap">
                  {page.subtitle}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
