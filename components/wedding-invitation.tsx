"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "tr" | "ar" | "en";

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
    withJoy: "بكل فرح",
    invite: "ندعوكم لحضور",
    theWeddingOf: "حفل زفاف",
    names: "كايني واورهان",
    date: "الاحد ١٠ مايو",
    time: "17:00 - 13:00 ",
    location: "Aynalı Çarşı, Barış, Açelya Cd. No:7\nBeylikdüzü/İstanbul",
  },
  tr: {
    withJoy: "mutlulukla",
    invite: "sizi davet ediyoruz",
    theWeddingOf: "Düğün Töreni",
    names: "ORHAN & ZEYNEP",
    date: "PAZAR, 10 MAYIS",
    time: "13:00 - 17:00",
    location: "Aynalı Çarşı, Barış, Açelya Cd. No:7\nBeylikdüzü/İstanbul",
  },
};

const langLabels: Record<Lang, string> = {
  tr: "Türkçe",
  ar: "العربية",
  en: "English",
};

const IMAGE_URL = "/bganimated.gif";

export default function WeddingInvitation() {
  const [lang, setLang] = useState<Lang>("tr");

  const t = translations[lang];
  const isRtl = lang === "ar";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const namesVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 3.5 },
    },
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#f5f0eb]">
      {/* Language Selector */}
      <div className="fixed bottom-10  left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-[#f5f0eb]/80 p-1 shadow-md backdrop-blur-sm border border-[#c5b9a8]/30">
        {(Object.keys(langLabels) as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`rounded-full cursor-pointer px-4 py-1.5 text-xs tracking-wider transition-all font-serif ${
              lang === l
                ? "bg-[#6b7c6b] text-[#f5f0eb] cursor-pointer! shadow-sm"
                : "text-[#6b7c6b] cursor-pointer! hover:bg-[#6b7c6b]/10"
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>

      {/* Invitation Card */}
      <div className="relative w-full max-w-lg mx-auto h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={IMAGE_URL}
          alt="Wedding invitation with sage green floral decorations for Orhan and Kainy"
          className="w-full h-full object-cover object-top block absolute inset-0 z-0"
          loading="eager"
        />

        {/* Global staggered flex container for all text blocks */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            className="absolute inset-0 z-10 pointers-events-none"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Translatable text overlay: "with joy" + "we invite you to attend" */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center"
              style={{ top: lang === "ar" ? "28%" : "30%" }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {/* "with joy" */}
              <motion.p
                variants={itemVariants}
                className={`font-serif text-[#5a6b5a] ${lang === "ar" ? "font-noto-nastaliq" : ""}`}
                style={{
                  fontFamily:
                    lang === "ar"
                      ? "var(--font-noto-nastaliq), serif"
                      : undefined,
                  fontSize:
                    lang === "ar"
                      ? "clamp(24px, 5vw, 32px)"
                      : "clamp(16px, 4vw, 20px)",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                  lineHeight: lang === "ar" ? 2 : 1.4,
                }}
              >
                {t.withJoy}
              </motion.p>

              {/* "we invite you to attend" */}
              <motion.p
                variants={itemVariants}
                className={`font-serif text-[#5a6b5a] ${lang === "ar" ? "font-noto-nastaliq" : ""}`}
                style={{
                  fontFamily:
                    lang === "ar"
                      ? "var(--font-noto-nastaliq), serif"
                      : undefined,
                  fontSize:
                    lang === "ar"
                      ? "clamp(24px, 5vw, 32px)"
                      : "clamp(16px, 4vw, 20px)",
                  fontWeight: 300,
                  letterSpacing: "0.12em",
                  lineHeight: lang === "ar" ? 2 : 1.4,
                  marginTop: lang === "ar" ? "20px" : "clamp(2px, 0.6vw, 6px)",
                }}
              >
                {t.invite}
              </motion.p>
            </div>

            {/* "the Wedding of" */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center"
              style={{ top: lang === "ar" ? "43%" : "38%" }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {lang === "ar" ? (
                <motion.p
                  variants={itemVariants}
                  className="text-[#4a5a4a] font-noto-nastaliq"
                  style={{
                    fontFamily: "var(--font-noto-nastaliq), serif",
                    fontSize: "clamp(28px, 6vw, 38px)",
                    fontWeight: "normal",
                    letterSpacing: "0.02em",
                    lineHeight: 1.6,
                    marginTop: "10px",
                  }}
                >
                  {t.theWeddingOf}
                </motion.p>
              ) : lang === "tr" ? (
                <motion.p
                  variants={itemVariants}
                  className="font-serif italic text-[#4a5a4a]"
                  style={{
                    fontSize: "clamp(24px, 5.5vw, 32px)",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.theWeddingOf}
                </motion.p>
              ) : (
                <motion.p
                  variants={itemVariants}
                  className="text-[#4a5a4a]"
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "clamp(32px, 7vw, 42px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {t.theWeddingOf}
                </motion.p>
              )}
            </div>

            {/* Names */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center"
              style={{ top: lang === "ar" ? "52%" : "45%" }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {lang === "ar" ? (
                <motion.p
                  variants={itemVariants}
                  className="text-[#4a5a4a]"
                  style={{
                    fontFamily: "Kaman, serif",
                    fontSize: "clamp(46px, 12vw, 64px)",
                    fontWeight: "normal",
                    lineHeight: 1.6,
                    marginTop: "10px",
                  }}
                >
                  {t.names}
                </motion.p>
              ) : (
                <motion.p
                  variants={itemVariants}
                  className="font-serif text-[#4a5a4a] text-center px-4"
                  style={{
                    fontSize: "clamp(34px, 8vw, 46px)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.names}
                </motion.p>
              )}
            </div>

            {/* Date, Time & Location group */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center gap-5"
              style={{ top: lang === "ar" ? "65%" : "59%" }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {/* Date */}
              <motion.p
                variants={itemVariants}
                className={`font-serif text-[#4a5a4a] ${lang === "ar" ? "font-noto-nastaliq" : "italic"}`}
                style={{
                  fontFamily:
                    lang === "ar"
                      ? "var(--font-noto-nastaliq), serif"
                      : undefined,
                  fontSize:
                    lang === "ar"
                      ? "clamp(22px, 5.5vw, 32px)"
                      : "clamp(16px, 4.5vw, 24px)",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  lineHeight: 1.3,
                  marginBottom: "1vh",
                }}
              >
                {t.date}
              </motion.p>

              <div className="flex flex-col items-center gap-4">
                {/* Time */}
                <motion.p
                  variants={itemVariants}
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
                </motion.p>

                {/* Location */}
                <motion.a
                  variants={itemVariants}
                  href="https://maps.app.goo.gl/XksNf4xgwMeoehWaA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-[#5a6b5a] hover:text-[#4a5a4a] transition-colors"
                  style={{
                    fontSize: "clamp(15px, 4vw, 18px)",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    lineHeight: 1.8,
                    textAlign: "center",
                    whiteSpace: "pre-wrap",
                    textDecoration: "none",
                  }}
                >
                  {t.location}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      display: "inline",
                      verticalAlign: "middle",
                      marginLeft: "4px",
                    }}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer credit */}
      <a
        href="https://www.instagram.com/kainy_onodera"
        target="_blank"
        rel="noopener noreferrer"
        className="pb-3 pt-3 text-[10px] tracking-[0.15em] text-[#b0a898] hover:text-[#8a7e70] transition-colors"
      >
        created by @kainy_onodera
      </a>
    </main>
  );
}
