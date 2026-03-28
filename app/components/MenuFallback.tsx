"use client";

import { useCurrentLocale, useI18n } from "@/locales/client";
import { useMemo, useState } from "react";

import menuBG from "./../menuList/menuListBG.json";
import menuEN from "./../menuList/menuList.json";

const categories = [
  { bg: "Празнична селекция", en: "Celebration", color: "#161616" },
  { bg: "Бутилки", en: "Bottles", color: "#1D1D1D" },
  { bg: "Шампанско & Вино", en: "Champagne & Wine", color: "#2D2D2D" },
  { bg: "Алкохол", en: "Alcohol", color: "#363636" },
  { bg: "Безалкохолни", en: "Soft Drinks", color: "#414141" },
  { bg: "Бира", en: "Beer", color: "#595959" },
];

export default function MenuAccordion() {
  const locale = useCurrentLocale();
  const t = useI18n();

  const menuList = useMemo(() => (locale === "bg" ? menuBG : menuEN), [locale]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getCategoryItems = (title: string) =>
    menuList.menu.filter((item) => item.category === title);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0C0C] text-white px-8 pt-12 md:p-16">
      <h1 className="text-3xl mb-12 uppercase tracking-widest text-center">
        {t("hero.menu") || "Menu"}
      </h1>

      {categories.map((cat, idx) => {
        const title = locale === "bg" ? cat.bg : cat.en;
        const items = getCategoryItems(title);
        if (!items.length) return null;

        const isOpen = openIndex === idx;

        return (
          <div key={idx} className="mb-6">
            <button
              onClick={() => toggle(idx)}
              className={`w-full flex justify-between items-center py-4 px-4 md:px-6 bg-[${
                cat.color
              }] text-[#dbbf91] font-bold uppercase tracking-widest transition-all border-[0.5] rounded-full ${
                isOpen ? "shadow-lg" : "hover:shadow-md"
              }`}
            >
              <span>{title}</span>
              <span
                className={`ml-2 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {">"}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-1050 mt-4" : "max-h-0"
              }`}
            >
              <div className="space-y-4 px-4 md:px-6">
                {items.map((item) => (
                  <div key={item.id}>
                    {item["semi-category"] && (
                      <p className="text-lg text-[#dbbf91] mb-2">
                        {item["semi-category"]}
                      </p>
                    )}

                    <div className="flex justify-between items-end">
                      <p className="flex-1 flex items-center gap-2 min-w-0">
                        <span>{item.name}</span>

                        <span className="hidden md:flex flex-1 border-b border-dotted border-gray-500 self-center"></span>
                      </p>

                      <div className="flex flex-col items-end whitespace-nowrap leading-tight">
                        <span className="text-gray-400 text-xs">
                          {item.quantity}
                        </span>

                        <span className="text-[#dbbf91] text-sm md:mt-0 mt-auto ml-1">
                          {item.price} € /{" "}
                          {(Number(item.price) * 1.95583).toFixed(2)} lv
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
