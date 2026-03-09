// "use client";

// import { useEffect, useRef, useState } from "react";

// import gsap from "gsap";

// export default function Player() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [hintVisible, setHintVisible] = useState(true);
//   const firstClickRef = useRef(false);

//   const togglePlay = async () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       await audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   useEffect(() => {
//     const handleFirstClick = async () => {
//       if (firstClickRef.current) return;
//       firstClickRef.current = true;

//       if (!audioRef.current) return;

//       try {
//         audioRef.current.volume = 0;
//         await audioRef.current.play();

//         gsap.to(audioRef.current, {
//           volume: 1,
//           duration: 2,
//           ease: "power2.out",
//         });

//         setIsPlaying(true);
//         setHintVisible(false);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     window.addEventListener("click", handleFirstClick, { once: true });
//     return () => window.removeEventListener("click", handleFirstClick);
//   }, []);

//   return (
//     <>
//       <audio ref={audioRef} src="/Tension.mp3" loop preload="auto" />

//       <div
//         onClick={togglePlay}
//         className="cursor-pointer select-none text-white font-bold text-sm flex items-center gap-2 -rotate-90"
//       >
//         <span>SOUND</span>

//         {/* ON / OFF text slider */}
//         <div className="flex flex-col justify-center h-4 overflow-hidden">
//           <div
//             className="transition-transform duration-300 ease-in-out"
//             style={{ transform: `translateY(${isPlaying ? "-25%" : "25%"})` }}
//           >
//             <div className="text-red-500">OFF</div>
//             <div className="text-green-400">ON</div>
//           </div>
//         </div>

//         {/* Bars */}
//         <div className="flex items-center gap-1">
//           {[0, 1, 2, 3, 4].map((i) => (
//             <div
//               key={i}
//               className={`bar ${isPlaying ? "animate" : ""}`}
//               style={{ animationDelay: `${i * 0.15}s` }}
//             />
//           ))}
//         </div>
//       </div>

//       {hintVisible && <CursorHint visible={hintVisible} />}

//       <style jsx>{`
//         .bar {
//           width: 2px;
//           height: 10px;
//           background: white;
//           transition: height 0.3s ease;
//         }

//         .animate {
//           animation: bounce 0.8s infinite ease-in-out;
//         }

//         @keyframes bounce {
//           0%,
//           100% {
//             height: 6px;
//           }
//           50% {
//             height: 10px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// function CursorHint({ visible }: { visible: boolean }) {
//   const desktopRef = useRef<HTMLDivElement>(null);
//   const mobileRef = useRef<HTMLDivElement>(null);

//   const isMobile =
//     typeof window !== "undefined" &&
//     window.matchMedia("(max-width: 768px)").matches;

//   useEffect(() => {
//     if (isMobile) return;

//     const move = (e: MouseEvent) => {
//       if (!desktopRef.current) return;

//       const width = desktopRef.current.offsetWidth;
//       const height = desktopRef.current.offsetHeight;

//       gsap.to(desktopRef.current, {
//         x: e.clientX - width / 2,
//         y: e.clientY - height - 20,
//         duration: 0.2,
//         ease: "power3.out",
//       });
//     };

//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, [isMobile]);

//   useEffect(() => {
//     const target = isMobile ? mobileRef.current : desktopRef.current;
//     if (!target) return;

//     gsap.to(target, {
//       autoAlpha: visible ? 1 : 0,
//       duration: 0.4,
//       ease: "power2.out",
//     });
//   }, [visible, isMobile]);

//   return (
//     <>
//       <div
//         ref={desktopRef}
//         className="hidden md:block fixed top-0 left-0 px-4 py-2 text-xs tracking-widest
//         text-white bg-black/70 backdrop-blur-md rounded-full
//         pointer-events-none select-none opacity-0"
//       >
//         click anywhere to enable sound
//       </div>

//       <div
//         ref={mobileRef}
//         className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 text-xs text-center tracking-widest whitespace-nowrap
//         text-white bg-black/70 backdrop-blur-md rounded-full
//         pointer-events-none select-none opacity-0"
//       >
//         click anywhere to enable sound
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/Tension.mp3" loop preload="auto" />

      <div
        className="relative cursor-pointer select-none text-white font-bold text-sm flex items-center gap-2 -rotate-90"
        onClick={togglePlay}
      >
        <span>SOUND</span>

        {/* ON / OFF text slider */}
        <div className="flex flex-col justify-center h-4 overflow-hidden">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: `translateY(${isPlaying ? "-25%" : "25%"})` }}
          >
            <div className="text-red-500">OFF</div>
            <div className="text-green-400">ON</div>
          </div>
        </div>

        {/* Bars */}
        <div className="flex items-center gap-1 pb-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`bar ${isPlaying ? "animate" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
      {showHint && <PlayerHint />}

      <style jsx>{`
        .bar {
          width: 2px;
          height: 10px;
          background: white;
          transition: height 0.3s ease;
        }

        .animate {
          animation: bounce 0.8s infinite ease-in-out;
        }

        @keyframes bounce {
          0%,
          100% {
            height: 6px;
          }
          50% {
            height: 10px;
          }
        }
      `}</style>
    </>
  );
}

// Подсказката вече се появява плавно веднъж
function PlayerHint() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: -10 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    const hideTimeout = setTimeout(() => {
      gsap.to(ref.current, {
        autoAlpha: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
      });
    }, 3000);

    return () => clearTimeout(hideTimeout);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-28 right-12 sm:right-20 px-2 py-1 text-md text-white whitespace-nowrap bg-black/70 backdrop-blur-md rounded-full pointer-events-none select-none"
    >
      click to toggle sound
    </div>
  );
}
