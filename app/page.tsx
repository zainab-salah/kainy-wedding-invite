"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import WeddingInvitation from "@/components/wedding-invitation";
import WaltzPlayer from "@/components/waltz-player";

export default function Page() {
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/Waltz-of-the-flowers.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio playback failed:", err));
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    if (!audioRef.current) return;

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Audio playback failed:", err));
  };

  if (!isStarted) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={handleStart}
      >
        <img
          src="/bganimated.gif"
          alt="Wedding background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#f5f0eb]/3 md:bg-[#f5f0eb]/50 backdrop-blur-sm" />

        {/* Left leaf */}
        <motion.img
          src="/leaf.png"
          alt=""
          className="absolute z-10 w-56 h-56 sm:w-72 sm:h-72 object-contain pointer-events-none"
          style={{ left: "-30px", top: "60%", translateY: "-50%" }}
          initial={{ x: -300, opacity: 0, rotate: -20 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 2.5, delay: 0.3 }}
        />

        {/* Right leaf - flipped */}
        <motion.img
          src="/leaf.png"
          alt=""
          className="absolute z-10 w-56 h-56 sm:w-72 sm:h-72 object-contain pointer-events-none"
          style={{ right: "-30px", top: "60%", translateY: "-50%", scaleX: -1 }}
          initial={{ x: 300, opacity: 0, rotate: 20 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 2.5, delay: 0.3 }}
        />

        <motion.button
          onClick={handleStart}
          className="relative z-10 cursor-pointer flex flex-col items-center gap-2 transition-transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span
            className="text-[#5a6b5a]  mb-5"
            style={{
              fontFamily: "var(--font-noto-nastaliq), serif",
              fontSize: "clamp(18px, 5vw, 24px)",
            }}
          >
            اضغط للدخول
          </span>
          <span
            className="text-[#5a6b5a]"
            style={{
              fontFamily: "var(--font-script), cursive",
              fontSize: "clamp(22px, 6vw, 30px)",
            }}
          >
            Girmek için dokun
          </span>
          <span
            className="text-[#5a6b5a]"
            style={{
              fontFamily: "var(--font-script), cursive",
              fontSize: "clamp(22px, 6vw, 30px)",
            }}
          >
            Tap to Enter
          </span>
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <WaltzPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
      <WeddingInvitation />
    </>
  );
}
