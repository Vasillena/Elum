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
          className="fixed bottom-0 right-8 w-10 sm:w-[50px] py-2 sm:py-4 rounded-t-full drop-shadow-sm text-xl text-[#0c0c0d] bg-[#ababab] z-50"
          aria-label="Switch to English"
        >
          EN
        </button>
      )}
      {locale !== "bg" && (
        <button
          type="button"
          onClick={handleChangeToBulgarian}
          className="fixed bottom-0 right-8 w-10 sm:w-[50px] py-2 sm:py-4 rounded-t-full drop-shadow-sm text-xl text-[#0c0c0d] bg-[#ababab] z-50"
          aria-label="Switch to Bulgarian"
        >
          BG
        </button>
      )}
    </>
  );
}
