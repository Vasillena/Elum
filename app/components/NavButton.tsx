"use client";

import Navigation from "./Navigation";
import { useState } from "react";

export default function NavButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-8 left-8 z-100 flex flex-col justify-between w-8 h-6 p-1"
      >
        <span
          className={`block h-0.5 w-full bg-white rounded transition-all duration-300
      ${open ? "rotate-45 translate-y-1.75" : ""}
      shadow-[0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff]`}
        />
        <span
          className={`block h-0.5 w-full bg-white rounded transition-all duration-300
      ${open ? "opacity-0" : ""}
      shadow-[0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff]`}
        />
        <span
          className={`block h-0.5 w-full bg-white rounded transition-all duration-300
      ${open ? "-rotate-45 -translate-y-1.75" : ""}
      shadow-[0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff]`}
        />
      </button>

      <Navigation isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
