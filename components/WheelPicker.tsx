"use client";

import { useState, useEffect, type CSSProperties } from "react";

/**
 * WheelPicker — an infinitely-rolling vertical "wheel picker" / slot-machine list.
 * The centered item is full-size and opaque; neighbours fade and scale down.
 * The loop is seamless (no jump, no empty slots) via a hidden seam-snap.
 *
 * Designed to sit on a COLOURED background (pills are translucent white).
 */

// --- Tuning knobs ---------------------------------------------------------
const PILL_HEIGHT = 56;    // px — height of one SLOT; equals the per-step roll distance
const PILL_GAP = 10;       // px — how much shorter the visible pill is than its slot
const PILL_WIDTH = 350;    // px — pill width
const VISIBLE = 3;         // visible slots (must be odd to have a center)
const TRANSITION_MS = 600; // slide/grow duration — must be < interval

// Styling by distance from center: [center, neighbour, edge]
const BG_ALPHA = [1, 0.42, 0.16] as const;
const TEXT_ALPHA = [1, 0.5, 0.22] as const;
const SCALE = [1, 0.82, 0.66] as const;
// --------------------------------------------------------------------------

function WhatsAppIcon({ alpha }: { alpha: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ opacity: alpha }}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.19-1.58-1.19-3.02 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36l.56.01c.18 0 .42-.07.66.5.24.59.83 2.03.9 2.18.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.77 1.27 1.66 2.06 1.14 1.02 2.1 1.33 2.4 1.48.29.15.46.13.63-.08.17-.2.73-.85.92-1.14.19-.29.39-.24.65-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.12.07.69-.17 1.36Z" />
    </svg>
  );
}

export interface WheelPickerProps {
  items: string[];
  interval?: number;
  className?: string;
}

export default function WheelPicker({
  items = [],
  interval = 2000,
  className = "",
}: WheelPickerProps) {
  const N = items.length;
  // step = how far the column has rolled (0..N). step and (step + N) look identical.
  const [step, setStep] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(true);

  // Roll one slot every `interval`.
  useEffect(() => {
    if (N === 0) return;
    const id = setInterval(() => setStep((s) => s + 1), interval);
    return () => clearInterval(id);
  }, [N, interval]);

  // Seam: at step N the visible pills match step 0, so once the slide finishes
  // we snap back to 0 with the transition OFF — invisibly.
  useEffect(() => {
    if (N === 0) return;
    if (step >= N) {
      const id = setTimeout(() => {
        setAnimate(false);
        setStep(0);
      }, TRANSITION_MS);
      return () => clearTimeout(id);
    }
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [step, animate, N]);

  if (N === 0) return null;

  // Three copies keep every slot filled at every step (never empty).
  const loop = [...items, ...items, ...items];
  const offset = step * PILL_HEIGHT;
  const centerPos = step + 1; // index in `loop` currently in the middle slot

  const slideStyle: CSSProperties = {
    transform: `translateY(${-offset}px)`,
    transition: animate
      ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
      : "none",
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: PILL_HEIGHT * VISIBLE }}
    >
      <div style={slideStyle}>
        {loop.map((label, i) => {
          const d = Math.min(Math.abs(i - centerPos), 2); // distance bucket: 0,1,2
          const pillStyle: CSSProperties = {
            width: "full", //PILL_WIDTH,
            height: PILL_HEIGHT - PILL_GAP,
            background: `rgba(255, 255, 255, ${BG_ALPHA[d]})`,
            color: `rgba(31, 91, 46, ${TEXT_ALPHA[d]})`,
            transform: `scale(${SCALE[d]})`,
            transition: animate
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), background ${TRANSITION_MS}ms, color ${TRANSITION_MS}ms, box-shadow ${TRANSITION_MS}ms`
              : "none",
          };
          return (
            // Fixed-height SLOT — no margins, so pitch === PILL_HEIGHT exactly.
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ height: PILL_HEIGHT }}
            >
              {/* Visible pill — Tailwind for static look, inline for animated values */}
              <div
                className={`flex select-none items-center justify-center gap-2.5 rounded-full px-4 ${
                  d === 0 ? "shadow-[0_6px_18px_rgba(0,0,0,0.12)]" : ""
                }`}
                style={pillStyle}
              >
                {label}
                <WhatsAppIcon alpha={TEXT_ALPHA[d]} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
