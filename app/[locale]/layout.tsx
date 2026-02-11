import "./globals.css";

import { GilroyLight } from "../utils/fonts";
import Provider from "./provider";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setStaticParamsLocale(locale);

  let title, description, keywords;

  if (locale === "bg") {
    title = "Q кетъринг Пловдив | qcatering.bg";
    description =
      "Премиум кетъринг с вкус и стил! Предлагаме гурме изкушения за сватби, събития, партита и корпоративни събирания.⁣⁣";
    keywords = [
      "Q кетъринг",
      "кетъринг",
      "кетъринг Пловдив",
      "събития",
      "Пловдив",
      "храна Пловдив",
      "сватба",
      "празник",
      "Q catering",
      "catering",
      "catering Plovdiv",
      "events",
      "Plovdiv",
      "food Plovdiv",
      "wedding",
      "celebrate",
    ];
  } else if (locale === "en") {
    title = "Q catering Plovdiv | qcatering.bg";
    description =
      "Premium catering with taste and style! We offer gourmet delights for weddings, events, parties, and corporate gatherings.⁣⁣";
    keywords = [
      "Q кетъринг",
      "кетъринг",
      "кетъринг Пловдив",
      "събития",
      "Пловдив",
      "храна Пловдив",
      "сватба",
      "празник",
      "Q catering",
      "catering",
      "catering Plovdiv",
      "events",
      "Plovdiv",
      "food Plovdiv",
      "wedding",
      "celebrate",
    ];
  }

  const alternates = {
    canonical: locale === "en" ? "/en" : "/",
    languages: {
      bg: "/bg",
      en: "/en",
    },
  };

  const metadataBase = new URL("https://qcatering.bg");

  return {
    title,
    description,
    keywords,
    alternates,
    metadataBase,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  setStaticParamsLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${GilroyLight.className} antialiased`}>
        <Provider locale={locale}>{children}</Provider>
      </body>
    </html>
  );
}
