"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CINEMA = [0.16, 1, 0.3, 1] as const;

export default function EnterButton() {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="relative z-20 mt-12"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2.5, ease: CINEMA }}
    >
      <motion.button
        type="button"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileTap={{ scale: 0.97 }}
        onClick={() =>
          document
            .getElementById("collection")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="group relative overflow-hidden rounded-full border border-gold/40 px-10 py-4 font-sans text-xs font-medium uppercase tracking-cult text-bone outline-none transition-colors duration-700 ease-cinema hover:border-gold"
      >
        {/* gold fill sweeps up from below on hover */}
        <motion.span
          className="absolute inset-0 z-0 bg-gradient-to-t from-gold via-gold-light to-gold"
          initial={false}
          animate={{ y: hover ? "0%" : "101%" }}
          transition={{ duration: 0.7, ease: CINEMA }}
        />
        {/* sheen */}
        <motion.span
          className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: hover ? "120%" : "-120%" }}
          transition={{ duration: 0.9, ease: CINEMA }}
        />
        <span
          className={`relative z-20 inline-flex items-center gap-3 transition-colors duration-500 ${
            hover ? "text-ink" : "text-bone"
          }`}
        >
          Enter The Cult
          <motion.span
            aria-hidden
            animate={{ x: hover ? 5 : 0 }}
            transition={{ duration: 0.6, ease: CINEMA }}
            className="text-base leading-none"
          >
            &#10097;
          </motion.span>
        </span>
      </motion.button>

      {/* soft halo under the button */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(200,163,90,0.25), transparent 70%)" }}
      />
    </motion.div>
  );
}
