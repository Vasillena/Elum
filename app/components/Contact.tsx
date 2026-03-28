"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import icon1 from "@/public/socials-icon-1.svg";
import icon2 from "@/public/socials-icon-2.svg";
import logo from "@/public/elum-full.svg";
import { useI18n } from "@/locales/client";
import vlogo from "@/public/v-logo.svg";

export default function Contact() {
  const t = useI18n();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-screen h-dvh sm:h-screen overflow-hidden bg-[#0C0C0C] text-white font-sans flex items-center justify-center">
      {!isMobile && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "url('/test.jpg') center/cover no-repeat",
            backgroundSize: "300% 300%",
            animation: "rippleFlow 25s linear infinite",
            filter: "blur(8px)",
            mixBlendMode: "screen",
            opacity: 0.05,
          }}
        />
      )}

      <style>
        {`
        @keyframes rippleFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        `}
      </style>

      <div
        className="relative p-10 md:p-16 h-screen flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        style={{
          background: "linear-gradient(145deg, #2D2D2D, #000000)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
        }}
      >
        <h2 className="text-3xl md:text-4xl mb-6 -mt-20 uppercase tracking-widest [text-shadow:0_0_5px_#ffffff,0_0_15px_#ffffff,0_0_30px_#ffffff] animate-pulse">
          {t("hero.contacts")}
        </h2>

        <address className="not-italic space-y-2 mt-8 mb-2">
          <p className="text-md md:text-lg">
            {t("hero.phone")}:{" "}
            <a href="tel:+359889999270" className="hover:underline">
              +359 889 999270
            </a>
          </p>

          <p className="text-md md:text-lg">{t("hero.address")}</p>

          <p className="text-md md:text-lg">{t("hero.working")}</p>
        </address>

        <div aria-label="Social media" className="flex gap-6 mt-4">
          <a
            href="https://www.facebook.com/share/1PgUCjrRCy/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image
              src={icon1}
              alt="Facebook"
              width={32}
              height={32}
              className="animate-pulse scale-85 md:scale-100"
              //   style={{
              //     filter:
              //       "drop-shadow(0 0 1px #ffffff) drop-shadow(0 0 15px #ffffff)",
              //   }}
            />
          </a>
          <a
            href="https://www.instagram.com/elumclubofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src={icon2}
              alt="Instagram"
              width={32}
              height={32}
              className="animate-pulse scale-85 md:scale-100"
              //   style={{
              //     filter:
              //       "drop-shadow(0 0 1px #ffffff) drop-shadow(0 0 15px #ffffff)",
              //   }}
            />
          </a>
        </div>

        {/* SVG Logo */}
        <div className="absolute bottom-10 mt-10 flex flex-col items-center space-y-10">
          <Image
            src={logo}
            alt="Elum logo"
            width={300}
            height={54}
            className="scale-75 md:scale-100"
          />

          <div className="flex flex-col justify-center items-center gap-1 text-sm">
            {t("hero.built")}{" "}
            <a
              href="https://www.vasilena.space/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Built by Vasilena Yoneva"
            >
              <Image src={vlogo} alt="V logo" width={50} height={45} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
