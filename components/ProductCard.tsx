"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useIsTouch } from "@/lib/useIsTouch";

const CINEMA = [0.16, 1, 0.3, 1] as const;

const CARD_GRADIENTS = [
  "radial-gradient(140% 120% at 40% 0%, #201c2c 0%, #0f0d18 50%, #070510 100%)",
  "radial-gradient(140% 120% at 60% 0%, #1c1a2a 0%, #0e0c16 50%, #070510 100%)",
  "radial-gradient(140% 120% at 30% 100%, #1e1c28 0%, #110f1a 50%, #070510 100%)",
  "radial-gradient(140% 120% at 70% 100%, #1c1b2a 0%, #0f0e17 50%, #070510 100%)",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  MENSWEAR: "text-gold border-gold/45",
  WOMENSWEAR: "text-bone/80 border-bone/30",
};

type ProductCardProps = {
  product: Product;
  index: number;
  onViewFit?: (product: Product) => void;
  onInquire?: (product: Product) => void;
};

export default function ProductCard({ product, index, onViewFit }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const isTouch = useIsTouch();
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  // On touch devices the overlay is permanently open — no hover gate.
  // On desktop it opens on hover only (unchanged).
  const open = isTouch || hovered;

  return (
    <motion.article
      className="relative cursor-pointer overflow-hidden"
      style={{
        background: gradient,
        borderRadius: "2px",
        border: "1px solid rgba(200,163,90,0.10)",
        aspectRatio: "3 / 4",
      }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay: index * 0.09, ease: CINEMA }}
      whileHover={
        isTouch
          ? {}
          : {
              y: -10,
              filter:
                "drop-shadow(0 24px 48px rgba(200,163,90,0.22)) drop-shadow(0 8px 16px rgba(200,163,90,0.12))",
            }
      }
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => { if (!isTouch) setHovered(true); }}
      onHoverEnd={() => { if (!isTouch) setHovered(false); }}
    >
      {/* product image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-6 pb-20">
        <div className="relative h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain mix-blend-multiply"
            priority={index < 2}
          />
        </div>
      </div>

      {/* gold ambient glow — intensifies when open */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 42%, rgba(200,163,90,VAR) 0%, transparent 100%)",
        }}
        animate={{ opacity: open ? 1 : 0.35 }}
        transition={{ duration: 0.8, ease: CINEMA }}
      >
        <div
          className="h-full w-full"
          style={{
            background: open
              ? "radial-gradient(ellipse 75% 70% at 50% 42%, rgba(200,163,90,0.13) 0%, transparent 100%)"
              : "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(200,163,90,0.05) 0%, transparent 100%)",
            transition: "background 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </motion.div>

      {/* bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5"
        style={{
          background:
            "linear-gradient(to top, rgba(7,5,16,0.98) 0%, rgba(7,5,16,0.82) 40%, rgba(7,5,16,0.3) 75%, transparent 100%)",
        }}
      />

      {/* inset border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-40"
        animate={{
          boxShadow: open
            ? "inset 0 0 0 1px rgba(200,163,90,0.45)"
            : "inset 0 0 0 1px rgba(200,163,90,0.10)",
        }}
        transition={{ duration: 0.7, ease: CINEMA }}
        style={{ borderRadius: "inherit" }}
      />

      {/* info bar — always visible on desktop (sits behind overlay on mobile) */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-5 pt-8">
        <span
          className={`mb-2 inline-block border px-2 py-[3px] font-sans text-[0.52rem] font-medium uppercase tracking-[0.3em] ${
            CATEGORY_COLORS[product.category] ?? "text-bone/70 border-bone/25"
          }`}
        >
          {product.category}
        </span>
        <h3 className="font-display text-sm font-semibold uppercase leading-snug tracking-[0.08em] text-bone sm:text-base">
          {product.name}
        </h3>
        <p className="mt-1 font-sans text-sm font-light text-bone/55">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>

      {/* overlay
          Desktop: fades in on hover, content slides up.
          Mobile:  permanently visible (open=true); tap anywhere fires onViewFit.
          The View Fit button stops propagation so the overlay onClick doesn't double-fire. */}
      <motion.div
        className="absolute inset-0 z-[35] flex flex-col items-center justify-center gap-5"
        style={{
          background: "rgba(5,4,12,0.72)",
          backdropFilter: "blur(3px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.75, ease: CINEMA }}
        onClick={isTouch ? () => onViewFit?.(product) : undefined}
      >
        <motion.span
          className="font-sans text-[0.58rem] uppercase tracking-[0.38em] text-bone/50"
          animate={{ y: open ? 0 : 10 }}
          transition={{ duration: 0.75, delay: isTouch ? 0 : 0.04, ease: CINEMA }}
        >
          {product.category}
        </motion.span>

        <motion.h3
          className="px-5 text-center font-display text-base font-semibold uppercase leading-snug tracking-widest text-bone sm:text-lg"
          animate={{ y: open ? 0 : 14 }}
          transition={{ duration: 0.75, delay: isTouch ? 0 : 0.09, ease: CINEMA }}
        >
          {product.name}
        </motion.h3>

        <motion.p
          className="font-sans text-sm font-light text-gold"
          animate={{ y: open ? 0 : 14 }}
          transition={{ duration: 0.75, delay: isTouch ? 0 : 0.13, ease: CINEMA }}
        >
          ₹{product.price.toLocaleString("en-IN")}
        </motion.p>

        <motion.button
          type="button"
          onClick={(e) => { e.stopPropagation(); onViewFit?.(product); }}
          className="mt-1 border border-gold/50 px-8 py-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-bone transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink active:border-gold active:bg-gold active:text-ink"
          animate={{ y: open ? 0 : 18, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.75, delay: isTouch ? 0 : 0.17, ease: CINEMA }}
          style={{ borderRadius: "1px" }}
        >
          View Fit
        </motion.button>
      </motion.div>
    </motion.article>
  );
}
