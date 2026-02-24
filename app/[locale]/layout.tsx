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
    title = "Elum Night Project | elum.bg";
    description =
      "Нощта е на път да смени своя облик... Бъди там, когато се разкрие.⁣⁣";
    keywords = [
      "Elum Night Project",
      "нощен клуб Пловдив",
      "клуб Пловдив",
      "техно Пловдив",
      "techno club Plovdiv",
      "underground клуб",
      "електронна музика Пловдив",
      "парти Пловдив",
      "nightlife Plovdiv",
      "Plovdiv club",
      "dark techno",
      "black music club",
      "opening soon Plovdiv",
    ];
  } else if (locale === "en") {
    title = "Elum Night Project | elum.bg";
    description =
      "The night is about to change its shape... Be there when it emerges.⁣⁣";
    keywords = [
      "Elum Night Project",
      "нощен клуб Пловдив",
      "клуб Пловдив",
      "техно Пловдив",
      "techno club Plovdiv",
      "underground клуб",
      "електронна музика Пловдив",
      "парти Пловдив",
      "nightlife Plovdiv",
      "Plovdiv club",
      "dark techno",
      "black music club",
      "opening soon Plovdiv",
    ];
  }

  const alternates = {
    canonical: locale === "en" ? "/en" : "/",
    languages: {
      bg: "/bg",
      en: "/en",
    },
  };

  const metadataBase = new URL("https://elum.bg");

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
