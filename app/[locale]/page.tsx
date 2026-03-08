"use client";

import { useEffect, useState } from "react";

import HeroCanvas from "../components/HeroCanvas";
import Player from "../components/Player";
import PreHero from "../components/PreHero";
import { SwitchLanguage } from "../components/SwitchLanguage";

export default function Home() {
  const [showPreHero, setShowPreHero] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // използваме window глобална променлива за това дали вече сме показали PreHero
    if (!(window as any).__preHeroShown) {
      setShowPreHero(true); // първо зареждане
      (window as any).__preHeroShown = true; // маркираме, че вече е показан
    } else {
      setShowCanvas(true); // директно показваме canvas при навигация
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

      <div className="fixed bottom-4 -right-8 lg:right-0 flex flex-col gap-14">
        {/* <Player />
        <SwitchLanguage /> */}
      </div>
    </>
  );
}
