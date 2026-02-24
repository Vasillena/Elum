"use client";

import HeroCanvas from "../components/HeroCanvas";
import Player from "../components/Player";
import PreHero from "../components/PreHero";
import { SwitchLanguage } from "../components/SwitchLanguage";
import { useState } from "react";

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <>
      {!showCanvas && <PreHero onComplete={() => setShowCanvas(true)} />}

      {showCanvas && <HeroCanvas />}

      <div className="fixed bottom-4 -right-8 lg:right-0 flex flex-col gap-14">
        <Player />
        <SwitchLanguage />
      </div>
    </>
  );
}
