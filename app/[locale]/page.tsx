/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import HeroCanvas from "../components/HeroCanvas";
import PreHero from "../components/PreHero";

export default function Home() {
  const [showPreHero, setShowPreHero] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!(window as any).__preHeroShown) {
      queueMicrotask(() => {
        setShowPreHero(true);
      });
      (window as any).__preHeroShown = true;
    } else {
      queueMicrotask(() => {
        setShowCanvas(true);
      });
    }
  }, []);

  const handlePreHeroComplete = () => {
    setShowPreHero(false);
    setShowCanvas(true);
  };

  return (
    <>
      {showPreHero && <PreHero onComplete={handlePreHeroComplete} />}
      {showCanvas && <HeroCanvas />}
    </>
  );
}
