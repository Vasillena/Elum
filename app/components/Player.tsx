"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

export default function PlayerWithBars() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const firstClickRef = useRef(false);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (!isPlaying && audioRef.current.paused) {
        await audioRef.current.play();
      } else if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }

      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  // Първи клик за автоматично пускане
  useEffect(() => {
    const handleFirstClick = async () => {
      if (firstClickRef.current) return;
      firstClickRef.current = true;

      if (audioRef.current) {
        try {
          audioRef.current.volume = 0;
          await audioRef.current.play();

          gsap.to(audioRef.current, {
            volume: 1,
            duration: 2,
            ease: "power2.out",
          });

          setIsPlaying(true);
          setHintVisible(false);
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("click", handleFirstClick, { once: true });
    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/Tension.mp3" loop preload="auto" />

      {/* SOUND + ON/OFF scroll + bar charts */}
      <div
        onClick={togglePlay}
        className="fixed bottom-26 right-0 cursor-pointer select-none text-white font-bold text-sm flex items-center gap-2 -rotate-90"
      >
        <span>SOUND</span>

        {/* ON/OFF bar container */}
        <div className="flex flex-col justify-center h-4 mr-4 overflow-hidden">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: `translateY(${isPlaying ? "-25%" : "25%"})` }}
          >
            <div className="text-orange-900">OFF</div>
            <div className="text-green-900">ON</div>
          </div>
        </div>

        {/* Bar animation */}
        <div className="flex flex-col gap-1 h-6 justify-end -rotate-90 mb-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-sm bg-white transition-all duration-300 ${
                isPlaying ? `animate-pulseBar animation-delay-${i}` : "h-2"
              }`}
            />
          ))}
        </div>
      </div>

      {hintVisible && <CursorHint visible={hintVisible} />}

      {/* Tailwind CSS animation */}
      <style jsx>{`
        .animate-pulseBar {
          animation: pulseBar 0.8s infinite ease-in-out;
        }
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-1 {
          animation-delay: 0.1s;
        }
        .animation-delay-2 {
          animation-delay: 0.2s;
        }
        .animation-delay-3 {
          animation-delay: 0.3s;
        }
        .animation-delay-4 {
          animation-delay: 0.4s;
        }

        @keyframes pulseBar {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 12px;
          }
        }
      `}</style>
    </>
  );
}

function CursorHint({ visible }: { visible: boolean }) {
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!hintRef.current) return;

      const width = hintRef.current.offsetWidth;
      const height = hintRef.current.offsetHeight;

      gsap.to(hintRef.current, {
        x: e.clientX - width / 2,
        y: e.clientY - height - 20,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!hintRef.current) return;

    gsap.to(hintRef.current, {
      autoAlpha: visible ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [visible]);

  return (
    <div
      ref={hintRef}
      className="fixed top-0 left-0 px-4 py-2 text-xs tracking-widest
      text-white bg-black/70 backdrop-blur-md rounded-full
      pointer-events-none select-none opacity-0"
    >
      click anywhere to enable sound
    </div>
  );
}
