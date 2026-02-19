"use client";

import Canv from "../components/Canvas";
import Player from "../components/Player";
import PreHero from "../components/PreHero";
import { SwitchLanguage } from "../components/SwitchLanguage";
import { useState } from "react";

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <>
      {/* PreHero винаги се показва, и вика handle, когато приключи */}
      <PreHero onComplete={() => setShowCanvas(true)} />

      {/* Canvas fade-in зад PreHero */}
      <div
        className={`fixed inset-0 transition-opacity duration-1000 ${
          showCanvas ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: -1 }}
      >
        <Canv />
      </div>

      <Player />
      <SwitchLanguage />
    </>
  );
}
