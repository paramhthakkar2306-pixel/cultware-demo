"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CINEMA = [0.16, 1, 0.3, 1] as const;
const SOZO_URL = "https://instagram.com/sozostudio.ai";

export default function SozoBadge() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={SOZO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Crafted by SOZO Studio — visit Instagram"
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/20 px-4 py-2 backdrop-blur-sm"
      style={{ background: "rgba(5,5,9,0.82)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ borderColor: hovered ? "rgba(200,163,90,0.55)" : "rgba(200,163,90,0.20)" }}
      transition={{ duration: 0.5, ease: CINEMA }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* subtle gold fill on hover */}
      <motion.span
        className="absolute inset-0 -z-10 rounded-full bg-gold/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: CINEMA }}
      />

      <span
        className="font-sans text-[0.52rem] uppercase tracking-[0.28em] transition-colors duration-500"
        style={{ color: hovered ? "rgba(216,183,119,0.9)" : "rgba(200,163,90,0.5)" }}
      >
        Crafted by SOZO Studio
      </span>

      <motion.span
        className="text-[0.6rem] leading-none"
        animate={{ x: hovered ? 2 : 0, color: hovered ? "rgba(216,183,119,0.9)" : "rgba(200,163,90,0.4)" }}
        transition={{ duration: 0.5, ease: CINEMA }}
      >
        ↗
      </motion.span>
    </motion.a>
  );
}
