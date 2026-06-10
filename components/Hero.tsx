"use client";

import { motion } from "framer-motion";
import MistCanvas from "./MistCanvas";
import RitualFigures from "./RitualFigures";
import BrandReveal from "./BrandReveal";
import EnterButton from "./EnterButton";

const CINEMA = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      {/* Base atmospheric gradients */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 8%, #15131c 0%, #0a0910 38%, #050509 70%, #030307 100%)",
        }}
      />
      {/* shaft of light from above */}
      <motion.div
        className="absolute inset-x-0 top-0 z-0 mx-auto h-[80vh] w-[60vw] max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 3, ease: CINEMA }}
        style={{
          background:
            "conic-gradient(from 180deg at 50% -10%, transparent 42%, rgba(200,163,90,0.12) 50%, transparent 58%)",
          filter: "blur(8px)",
        }}
      />

      {/* Ambient particles & smoke */}
      <MistCanvas />

      {/* Rising ritual figures (behind the wordmark) */}
      <RitualFigures />

      {/* Top micro-header */}
      <motion.header
        className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: CINEMA }}
      >
        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-bone/80">
          CW
        </span>
        <span className="hidden font-sans text-[0.6rem] uppercase tracking-cult text-bone/40 sm:block">
          MMXXV — Vol. I
        </span>
        <span className="font-sans text-[0.6rem] uppercase tracking-cult text-bone/40">
          The Doctrine
        </span>
      </motion.header>

      {/* Centre stage: wordmark + CTA */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6">
        <BrandReveal />
        <EnterButton />
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-7 z-30 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 3, ease: CINEMA }}
      >
        <span className="font-sans text-[0.55rem] uppercase tracking-cult text-bone/40">
          Descend
        </span>
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="vignette" />
      <div className="grain-overlay animate-grain" />
    </section>
  );
}
