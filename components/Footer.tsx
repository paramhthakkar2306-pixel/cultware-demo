"use client";

import { motion } from "framer-motion";

const CINEMA = [0.16, 1, 0.3, 1] as const;
const SOZO_URL = "https://instagram.com/sozostudio.ai";

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden border-t border-gold/10 px-6 py-24 sm:px-10"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, #0c0b13 0%, #07070d 55%, #040407 100%)",
      }}
    >
      {/* ambient floor glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(200,163,90,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* eyebrow */}
        <motion.span
          className="font-sans text-[0.58rem] uppercase tracking-[0.42em] text-gold/60"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: CINEMA }}
        >
          Built By SOZO Studio
        </motion.span>

        {/* headline */}
        <motion.h2
          className="mt-6 font-display text-[9vw] font-black uppercase leading-[0.95] tracking-[0.02em] text-bone sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.1, ease: CINEMA }}
          style={{ textShadow: "0 0 60px rgba(200,163,90,0.12)" }}
        >
          Your Brand,{" "}
          <span className="bg-gradient-to-b from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
            Forged
          </span>
        </motion.h2>

        <motion.p
          className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-bone/45"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: CINEMA }}
        >
          This is a concept experience. We design and build cinematic,
          conversion-ready stores tailored to your label — end to end.
        </motion.p>

        {/* CTA */}
        <motion.a
          href={SOZO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-10 inline-flex overflow-hidden rounded-full border border-gold/45 px-12 py-4 outline-none transition-colors duration-500 hover:border-gold active:border-gold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: CINEMA }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-[600ms] ease-cinema group-hover:translate-y-0" />
          <span className="relative z-10 inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-bone transition-colors duration-500 group-hover:text-ink">
            Start Your Project
            <span
              aria-hidden
              className="transition-transform duration-500 ease-cinema group-hover:translate-x-1"
            >
              &#10097;
            </span>
          </span>
        </motion.a>

        {/* divider */}
        <div className="mt-20 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        {/* baseline row */}
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-4 text-bone/35 sm:flex-row">
          <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-bone/60">
            CULT WARE
          </span>
          <span className="font-sans text-[0.58rem] uppercase tracking-[0.3em]">
            Concept Demo — MMXXV
          </span>
          <a
            href={SOZO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.58rem] uppercase tracking-[0.3em] text-gold/55 transition-colors hover:text-gold"
          >
            @sozostudio.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
