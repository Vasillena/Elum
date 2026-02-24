"use client";

import { useEffect } from "react";

interface TitleBarAnimationProps {
  first: string;
  second: string;
  displayTime?: number;
  fadeSteps?: number;
}

export default function TitleBarAnimation({
  first,
  second,
  displayTime = 2000,
  fadeSteps = 20,
}: TitleBarAnimationProps) {
  useEffect(() => {
    let current = first;
    let next = second;
    let fade = 0;
    let fadingOut = true;
    let raf: number;

    let lastSwitch = Date.now();

    const loop = () => {
      const now = Date.now();

      if (fadingOut) {
        fade += 1 / fadeSteps;
        if (fade >= 1) {
          [current, next] = [next, current];
          fade = 0;
          fadingOut = false;
          lastSwitch = now;
        }
      } else {
        if (now - lastSwitch >= displayTime) {
          fadingOut = true;
        }
      }

      const dots = ".".repeat(Math.floor(fade * 5));
      document.title = `${current}${dots}`;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [first, second, displayTime, fadeSteps]);

  return null;
}
