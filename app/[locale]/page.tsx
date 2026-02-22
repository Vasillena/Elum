"use client";

import Canv from "../components/Canvas";
import Loading from "./loading";
import Player from "../components/Player";
import PreHero from "../components/PreHero";
import { SwitchLanguage } from "../components/SwitchLanguage";
import { useState } from "react";

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <>
      <PreHero onComplete={() => setShowCanvas(true)} />

      <div
        className={`fixed inset-0 transition-opacity duration-1000 ${
          showCanvas ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: -1 }}
      >
        <Canv />
      </div>
      <div className="fixed bottom-4 -right-8 lg:right-0 flex flex-col gap-14">
        <Player />
        <SwitchLanguage />
      </div>
    </>
  );
}
