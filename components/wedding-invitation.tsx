"use client";

import { useState } from "react";

type Lang = "en" | "ar" | "tr";

const translations: Record<
  Lang,
  {
    withJoy: string;
    invite: string;
    theWeddingOf: string;
    date: string;
  }
> = {
  en: {
    withJoy: "with joy",
    invite: "we invite you to attend",
    theWeddingOf: "the Wedding of",
    date: "SUNDAY, MAY 10TH",
  },
  ar: {
    withJoy: "\u0628\u0643\u0644 \u0641\u0631\u062D",
    invite:
      "\u0646\u062F\u0639\u0648\u0643\u0645 \u0644\u062D\u0636\u0648\u0631",
    theWeddingOf: "\u062D\u0641\u0644 \u0632\u0641\u0627\u0641",
    date: "\u0627\u0644\u0623\u062D\u062F\u060C 10 \u0645\u0627\u064A\u0648",
  },
  tr: {
    withJoy: "mutlulukla",
    invite: "sizi davet ediyoruz",
    theWeddingOf: "D\u00FC\u011F\u00FCn T\u00F6reni",
    date: "PAZAR, 10 MAYIS",
  },
};

const langLabels: Record<Lang, string> = {
  en: "English",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  tr: "T\u00FCrk\u00E7e",
};

const IMAGE_URL = "/orhankainy.gif";

export default function WeddingInvitation() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  const isRtl = lang === "ar";

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#f5f0eb]">
      {/* Language Selector */}
      <div className="fixed top-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-[#f5f0eb]/80 p-1 shadow-md backdrop-blur-sm border border-[#c5b9a8]/30">
        {(Object.keys(langLabels) as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full px-4 py-1.5 text-xs tracking-wider transition-all font-serif ${
              lang === l
                ? "bg-[#6b7c6b] text-[#f5f0eb] shadow-sm"
                : "text-[#6b7c6b] hover:bg-[#6b7c6b]/10"
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>

      {/* Invitation Card */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Background image with static elements (names, time, venue) - native img for GIF animation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGE_URL}
          alt="Wedding invitation with sage green floral decorations for Orhan and Kainy"
          className="w-full h-auto block"
          loading="eager"
        />

        {/* Translatable text overlay: "with joy" + "we invite you to attend" */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center"
          style={{ top: "30%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* "with joy" - Cormorant Garamond Light, ~15px, tracking wide */}
          <p
            className="font-serif text-[#5a6b5a]"
            style={{
              fontSize: "clamp(13px, 3.2vw, 16px)",
              fontWeight: 300,
              letterSpacing: "0.12em",
              lineHeight: 1.4,
            }}
          >
            {t.withJoy}
          </p>

          {/* "we invite you to attend" - same style, small gap */}
          <p
            className="font-serif text-[#5a6b5a]"
            style={{
              fontSize: "clamp(13px, 3.2vw, 16px)",
              fontWeight: 300,
              letterSpacing: "0.12em",
              lineHeight: 1.4,
              marginTop: "clamp(2px, 0.6vw, 6px)",
            }}
          >
            {t.invite}
          </p>
        </div>

        {/* "the Wedding of" - Pinyon Script cursive */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center"
          style={{ top: "38%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {lang === "ar" || lang === "tr" ? (
            <p
              className="font-serif italic text-[#4a5a4a]"
              style={{
                fontSize: "clamp(20px, 5.5vw, 28px)",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              {t.theWeddingOf}
            </p>
          ) : (
            <p
              className="text-[#4a5a4a]"
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "clamp(26px, 7vw, 38px)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              {t.theWeddingOf}
            </p>
          )}
        </div>

        {/* "SUNDAY, MAY 10TH" - Cormorant Garamond Italic, uppercase, tracked */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center"
          style={{ top: "60.5%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <p
            className="font-serif italic text-[#4a5a4a]"
            style={{
              fontSize: "clamp(14px, 4.2vw, 22px)",
              fontWeight: 500,
              letterSpacing: "0.2em",
              lineHeight: 1.3,
            }}
          >
            {t.date}
          </p>
        </div>
      </div>
    </main>
  );
}
