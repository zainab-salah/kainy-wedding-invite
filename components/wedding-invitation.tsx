"use client";

import { useState } from "react";

type Lang = "en" | "ar" | "tr";

const translations: Record<
  Lang,
  {
    withJoy: string;
    invite: string;
    theWeddingOf: string;
    names: string;
    date: string;
    time: string;
    location: string;
  }
> = {
  en: {
    withJoy: "with joy",
    invite: "we invite you to attend",
    theWeddingOf: "the Wedding of",
    names: "ORHAN & KAINY",
    date: "SUNDAY, MAY 10TH",
    time: "13:00 - 17:00",
    location: "Aynalı Çarşı, Barış, Açelya Cd. No:7\nBeylikdüzü/İstanbul",
  },
  ar: {
    withJoy: "\u0628\u0643\u0644 \u0641\u0631\u062D",
    invite:
      "\u0646\u062F\u0639\u0648\u0643\u0645 \u0644\u062D\u0636\u0648\u0631",
    theWeddingOf: "\u062D\u0641\u0644 \u0632\u0641\u0627\u0641",
    names: "كايني واورهان",
    date: "\u0627\u0644\u0623\u062D\u062F\u060C 10 \u0645\u0627\u064A\u0648",
    time: "17:00 - 13:00 ",
    location: "Aynalı Çarşı, Barış, Açelya Cd. No:7\nBeylikdüzü/İstanbul",
  },
  tr: {
    withJoy: "mutlulukla",
    invite: "sizi davet ediyoruz",
    theWeddingOf: "Düğün Töreni",
    names: "ORHAN & KAINY",
    date: "PAZAR, 10 MAYIS",
    time: "13:00 - 17:00",
    location: "Aynalı Çarşı, Barış, Açelya Cd. No:7\nBeylikdüzü/İstanbul",
  },
};

const langLabels: Record<Lang, string> = {
  en: "English",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  tr: "T\u00FCrk\u00E7e",
};

const IMAGE_URL = "/bganimated.gif";

export default function WeddingInvitation() {
  const [lang, setLang] = useState<Lang>("en");
  const [isStarted, setIsStarted] = useState(false);

  const t = translations[lang];
  const isRtl = lang === "ar";

  if (!isStarted) {
    return (
      <main
        className="relative flex min-h-screen flex-col items-center justify-center bg-[#f5f0eb] cursor-pointer"
        onClick={() => setIsStarted(true)}
      >
        <p className="font-serif text-[#5a6b5a] text-xl tracking-widest animate-pulse">
          {lang === "ar"
            ? "انقر للفتح"
            : lang === "tr"
              ? "Açmak için tıklayın"
              : "Tap to open"}
        </p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#f5f0eb]">
      {/* Background Audio */}
      <audio
        src="/Waltz-of-the-flowers.mp3"
        autoPlay
        loop
        playsInline
        className="hidden"
      />

      {/* Language Selector */}
      <div className="fixed bottom-20 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-[#f5f0eb]/80 p-1 shadow-md backdrop-blur-sm border border-[#c5b9a8]/30">
        {(Object.keys(langLabels) as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full cursor-pointer px-4 py-1.5 text-xs tracking-wider transition-all font-serif ${
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
      <div className="relative w-full max-w-lg mx-auto sm:h-[800px] h-[100dvh] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGE_URL}
          alt="Wedding invitation with sage green floral decorations for Orhan and Kainy"
          className="w-full h-full object-cover object-top block absolute inset-0 z-0"
          loading="eager"
        />

        {/* Translatable text overlay: "with joy" + "we invite you to attend" */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center z-10"
          style={{ top: "30%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* "with joy" - Cormorant Garamond Light, ~15px, tracking wide */}
          <p
            className="font-serif text-[#5a6b5a]"
            style={{
              fontSize: "clamp(16px, 4vw, 20px)",
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
              fontSize: "clamp(16px, 4vw, 20px)",
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
          className="absolute left-0 right-0 flex flex-col items-center z-10"
          style={{ top: "38%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {lang === "ar" ? (
            <p
              className="text-[#4a5a4a]"
              style={{
                fontFamily: "'Kaman', serif",
                fontSize: "clamp(34px, 8vw, 48px)",
                fontWeight: "normal",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
                marginTop: "-10px",
              }}
            >
              {t.theWeddingOf}
            </p>
          ) : lang === "tr" ? (
            <p
              className="font-serif italic text-[#4a5a4a]"
              style={{
                fontSize: "clamp(24px, 5.5vw, 32px)",
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
                fontSize: "clamp(32px, 7vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              {t.theWeddingOf}
            </p>
          )}
        </div>

        {/* Names */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center z-10"
          style={{ top: "45%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {lang === "ar" ? (
            <p
              className="text-[#4a5a4a]"
              style={{
                fontFamily: "'Kaman', serif",
                fontSize: "clamp(46px, 12vw, 64px)",
                fontWeight: "normal",
                lineHeight: 1.2,
                marginTop: "-10px",
              }}
            >
              {t.names}
            </p>
          ) : (
            <p
              className="font-serif text-[#4a5a4a] text-center px-4"
              style={{
                fontSize: "clamp(34px, 8vw, 46px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "0.05em",
              }}
            >
              {t.names}
            </p>
          )}
        </div>

        {/* Date, Time & Location group */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center gap-5 z-10"
          style={{ top: "59%" }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Date */}
          <p
            className="font-serif italic text-[#4a5a4a]"
            style={{
              fontSize: "clamp(16px, 4.5vw, 24px)",
              fontWeight: 500,
              letterSpacing: "0.2em",
              lineHeight: 1.3,
              marginBottom: "1vh",
            }}
          >
            {t.date}
          </p>

          <div className="flex flex-col items-center gap-4">
            {/* Time */}
            <p
              className="font-serif text-[#5a6b5a]"
              style={{
                fontSize: "clamp(14px, 3.5vw, 18px)",
                fontWeight: 400,
                letterSpacing: "0.15em",
                lineHeight: 1.4,
                textAlign: "center",
              }}
            >
              {t.time}
            </p>

            {/* Location */}
            <p
              className="font-serif text-[#5a6b5a]"
              style={{
                fontSize: "clamp(15px, 4vw, 18px)",
                fontWeight: 400,
                letterSpacing: "0.1em",
                lineHeight: 1.8,
                textAlign: "center",
                whiteSpace: "pre-wrap",
              }}
            >
              {t.location}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
