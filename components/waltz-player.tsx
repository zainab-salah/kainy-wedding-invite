"use client";

import { useEffect, useRef, useState } from "react";

export default function WaltzPlayer({
  isPlaying,
  togglePlay,
}: {
  isPlaying: boolean;
  togglePlay: () => void;
}) {
  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f0eb] shadow-lg transition-transform hover:scale-110 border border-[#c5b9a8]/30"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b7c6b"
          strokeWidth="2"
        >
          <rect x="6" y="4" width="4" height="16" fill="#6b7c6b" />
          <rect x="14" y="4" width="4" height="16" fill="#6b7c6b" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polygon points="5 3 19 12 5 21 5 3" fill="#6b7c6b" />
        </svg>
      )}
    </button>
  );
}
