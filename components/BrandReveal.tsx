"use client";

import { motion } from "framer-motion";

const CINEMA = [0.16, 1, 0.3, 1] as const;

function Word({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden"
          style={{ lineHeight: 0.9 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", rotateX: -55, opacity: 0 }}
            animate={{ y: "0%", rotateX: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: baseDelay + i * 0.09,
              ease: CINEMA,
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function BrandReveal() {
  return (
    <div className="relative z-20 flex flex-col items-center text-center">
      {/* eyebrow */}
      <motion.span
        className="mb-6 block font-sans text-[0.62rem] uppercase tracking-cult text-gold/70 sm:text-xs"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3, ease: CINEMA }}
      >
        Forged in Ritual &amp; Shadow
      </motion.span>

      {/* brand mark */}
      <h1
        className="font-display font-black uppercase leading-[0.86] text-bone [perspective:800px]"
        style={{ textShadow: "0 0 40px rgba(200,163,90,0.18)" }}
      >
        <span className="block text-[18vw] tracking-[0.04em] sm:text-[15vw] lg:text-[11rem]">
          <Word text="CULT" baseDelay={0.7} />
        </span>
        <span className="-mt-[1.5vw] block bg-gradient-to-b from-gold-light via-gold to-gold-dark bg-clip-text text-[18vw] tracking-[0.04em] text-transparent sm:text-[15vw] lg:text-[11rem]">
          <Word text="WARE" baseDelay={1.0} />
        </span>
      </h1>

      {/* underline rule that draws in */}
      <motion.div
        className="mt-7 h-px w-[min(46vw,420px)] origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.9, ease: CINEMA }}
      />

      {/* tagline */}
      <motion.p
        className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-bone/55 sm:text-base"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 2.2, ease: CINEMA }}
      >
        A garment is a vow. Wear the doctrine.
      </motion.p>
    </div>
  );
}
