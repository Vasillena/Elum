"use client";

import Sticky from "./Sticky";

interface PreHeroProps {
  onComplete?: () => void;
}

export default function PreHero({ onComplete }: PreHeroProps) {
  return <Sticky onComplete={onComplete} />;
}
