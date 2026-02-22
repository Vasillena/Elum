"use client";

import { useChangeLocale, useCurrentLocale } from "../../locales/client";

export function SwitchLanguage() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const handleChangeToEnglish = () => changeLocale("en");

  const handleChangeToBulgarian = () => changeLocale("bg");

  return (
    <>
      {locale !== "en" && (
        <button
          type="button"
          onClick={handleChangeToEnglish}
          className="text-sm text-white font-bold -rotate-90 z-50"
          aria-label="Switch to English"
        >
          EN
        </button>
      )}
      {locale !== "bg" && (
        <button
          type="button"
          onClick={handleChangeToBulgarian}
          className="text-sm text-white font-bold -rotate-90 z-50"
          aria-label="Switch to Bulgarian"
        >
          BG
        </button>
      )}
    </>
  );
}
