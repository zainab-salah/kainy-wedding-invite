"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// Waltz in 3/4 time - a simple elegant melody
const WALTZ_NOTES = [
  // Bar 1 - C major
  { note: "C4", duration: 0.5, time: 0 },
  { note: "E4", duration: 0.25, time: 0.5 },
  { note: "G4", duration: 0.25, time: 0.75 },
  // Bar 2
  { note: "E4", duration: 0.5, time: 1.0 },
  { note: "C4", duration: 0.25, time: 1.5 },
  { note: "E4", duration: 0.25, time: 1.75 },
  // Bar 3 - F major
  { note: "F4", duration: 0.5, time: 2.0 },
  { note: "A4", duration: 0.25, time: 2.5 },
  { note: "C5", duration: 0.25, time: 2.75 },
  // Bar 4
  { note: "A4", duration: 0.5, time: 3.0 },
  { note: "F4", duration: 0.25, time: 3.5 },
  { note: "A4", duration: 0.25, time: 3.75 },
  // Bar 5 - G major
  { note: "G4", duration: 0.5, time: 4.0 },
  { note: "B4", duration: 0.25, time: 4.5 },
  { note: "D5", duration: 0.25, time: 4.75 },
  // Bar 6
  { note: "B4", duration: 0.5, time: 5.0 },
  { note: "G4", duration: 0.25, time: 5.5 },
  { note: "B4", duration: 0.25, time: 5.75 },
  // Bar 7 - C major resolution
  { note: "C5", duration: 0.75, time: 6.0 },
  { note: "G4", duration: 0.25, time: 6.75 },
  // Bar 8
  { note: "E4", duration: 0.75, time: 7.0 },
  { note: "C4", duration: 0.25, time: 7.75 },
  // Bar 9 - Am
  { note: "A4", duration: 0.5, time: 8.0 },
  { note: "C5", duration: 0.25, time: 8.5 },
  { note: "E5", duration: 0.25, time: 8.75 },
  // Bar 10
  { note: "C5", duration: 0.5, time: 9.0 },
  { note: "A4", duration: 0.25, time: 9.5 },
  { note: "C5", duration: 0.25, time: 9.75 },
  // Bar 11 - Dm
  { note: "D4", duration: 0.5, time: 10.0 },
  { note: "F4", duration: 0.25, time: 10.5 },
  { note: "A4", duration: 0.25, time: 10.75 },
  // Bar 12
  { note: "F4", duration: 0.5, time: 11.0 },
  { note: "D4", duration: 0.25, time: 11.5 },
  { note: "F4", duration: 0.25, time: 11.75 },
  // Bar 13 - G7
  { note: "G4", duration: 0.5, time: 12.0 },
  { note: "B4", duration: 0.25, time: 12.5 },
  { note: "F5", duration: 0.25, time: 12.75 },
  // Bar 14
  { note: "D5", duration: 0.5, time: 13.0 },
  { note: "B4", duration: 0.25, time: 13.5 },
  { note: "G4", duration: 0.25, time: 13.75 },
  // Bar 15 - C major final
  { note: "C5", duration: 0.75, time: 14.0 },
  { note: "E5", duration: 0.25, time: 14.75 },
  // Bar 16
  { note: "C5", duration: 1.0, time: 15.0 },
]

// Bass accompaniment (oom-pah-pah pattern)
const BASS_NOTES = [
  // C major
  { note: "C3", duration: 0.4, time: 0 },
  { note: "E3", duration: 0.2, time: 0.5 },
  { note: "G3", duration: 0.2, time: 0.75 },
  { note: "C3", duration: 0.4, time: 1.0 },
  { note: "E3", duration: 0.2, time: 1.5 },
  { note: "G3", duration: 0.2, time: 1.75 },
  // F major
  { note: "F2", duration: 0.4, time: 2.0 },
  { note: "A3", duration: 0.2, time: 2.5 },
  { note: "C3", duration: 0.2, time: 2.75 },
  { note: "F2", duration: 0.4, time: 3.0 },
  { note: "A3", duration: 0.2, time: 3.5 },
  { note: "C3", duration: 0.2, time: 3.75 },
  // G major
  { note: "G2", duration: 0.4, time: 4.0 },
  { note: "B3", duration: 0.2, time: 4.5 },
  { note: "D3", duration: 0.2, time: 4.75 },
  { note: "G2", duration: 0.4, time: 5.0 },
  { note: "B3", duration: 0.2, time: 5.5 },
  { note: "D3", duration: 0.2, time: 5.75 },
  // C major
  { note: "C3", duration: 0.6, time: 6.0 },
  { note: "E3", duration: 0.2, time: 6.75 },
  { note: "C3", duration: 0.6, time: 7.0 },
  { note: "G2", duration: 0.2, time: 7.75 },
  // Am
  { note: "A2", duration: 0.4, time: 8.0 },
  { note: "C3", duration: 0.2, time: 8.5 },
  { note: "E3", duration: 0.2, time: 8.75 },
  { note: "A2", duration: 0.4, time: 9.0 },
  { note: "C3", duration: 0.2, time: 9.5 },
  { note: "E3", duration: 0.2, time: 9.75 },
  // Dm
  { note: "D2", duration: 0.4, time: 10.0 },
  { note: "F3", duration: 0.2, time: 10.5 },
  { note: "A3", duration: 0.2, time: 10.75 },
  { note: "D2", duration: 0.4, time: 11.0 },
  { note: "F3", duration: 0.2, time: 11.5 },
  { note: "A3", duration: 0.2, time: 11.75 },
  // G7
  { note: "G2", duration: 0.4, time: 12.0 },
  { note: "B3", duration: 0.2, time: 12.5 },
  { note: "D3", duration: 0.2, time: 12.75 },
  { note: "G2", duration: 0.4, time: 13.0 },
  { note: "B3", duration: 0.2, time: 13.5 },
  { note: "D3", duration: 0.2, time: 13.75 },
  // C final
  { note: "C3", duration: 0.6, time: 14.0 },
  { note: "E3", duration: 0.2, time: 14.75 },
  { note: "C3", duration: 1.0, time: 15.0 },
]

const NOTE_FREQUENCIES: Record<string, number> = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
}

function playPianoNote(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume: number
) {
  // Create a more piano-like sound with multiple harmonics
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc1.type = "sine"
  osc1.frequency.value = freq

  osc2.type = "sine"
  osc2.frequency.value = freq * 2 // First harmonic
  
  const gain2 = ctx.createGain()
  gain2.gain.value = 0.3

  // ADSR envelope for piano feel
  gainNode.gain.setValueAtTime(0, startTime)
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, startTime + 0.1)
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.5)

  osc1.connect(gainNode)
  osc2.connect(gain2)
  gain2.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc1.start(startTime)
  osc1.stop(startTime + duration + 0.6)
  osc2.start(startTime)
  osc2.stop(startTime + duration + 0.6)
}

export default function WaltzPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const playWaltz = useCallback(() => {
    if (audioCtxRef.current) return

    const ctx = new AudioContext()
    audioCtxRef.current = ctx
    setIsPlaying(true)
    setShowPrompt(false)

    const tempo = 0.55 // seconds per beat (slower, more elegant)
    const loopDuration = 16 * tempo

    function scheduleLoop(offset: number) {
      WALTZ_NOTES.forEach(({ note, duration, time }) => {
        const freq = NOTE_FREQUENCIES[note]
        if (freq) {
          playPianoNote(ctx, freq, offset + time * tempo, duration * tempo, 0.15)
        }
      })
      BASS_NOTES.forEach(({ note, duration, time }) => {
        const freq = NOTE_FREQUENCIES[note]
        if (freq) {
          playPianoNote(ctx, freq, offset + time * tempo, duration * tempo, 0.08)
        }
      })
    }

    // Schedule first two loops immediately
    scheduleLoop(ctx.currentTime + 0.1)
    scheduleLoop(ctx.currentTime + 0.1 + loopDuration)

    let loopCount = 2
    intervalRef.current = setInterval(() => {
      scheduleLoop(ctx.currentTime + 0.1 + (loopCount - 1) * loopDuration)
      loopCount++
    }, loopDuration * 1000)
  }, [])

  const stopWaltz = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    return () => {
      stopWaltz()
    }
  }, [stopWaltz])

  if (showPrompt) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f0eb]/90 backdrop-blur-sm">
        <button
          onClick={playWaltz}
          className="flex flex-col items-center gap-4 rounded-full bg-[#f5f0eb] px-10 py-8 shadow-lg transition-transform hover:scale-105 border border-[#c5b9a8]/30"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6b7c6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" fill="#6b7c6b" stroke="#6b7c6b" />
          </svg>
          <span className="text-sm tracking-[0.2em] text-[#6b7c6b] uppercase font-sans">
            Tap to Enter
          </span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={isPlaying ? stopWaltz : playWaltz}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f0eb] shadow-lg transition-transform hover:scale-110 border border-[#c5b9a8]/30"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7c6b" strokeWidth="2">
          <rect x="6" y="4" width="4" height="16" fill="#6b7c6b" />
          <rect x="14" y="4" width="4" height="16" fill="#6b7c6b" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polygon points="5 3 19 12 5 21 5 3" fill="#6b7c6b" />
        </svg>
      )}
    </button>
  )
}
