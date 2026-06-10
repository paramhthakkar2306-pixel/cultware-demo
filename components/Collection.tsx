"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import ProductCard from "./ProductCard";
import SizeVisualizer from "./SizeVisualizer";

const CINEMA = [0.16, 1, 0.3, 1] as const;

export default function Collection() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <section
      id="collection"
      className="relative w-full bg-ink px-6 pb-28 pt-24 sm:px-10 lg:px-16"
      style={{
        background:
          "linear-gradient(to bottom, #05050a 0%, #07070e 40%, #090910 100%)",
      }}
    >
      {/* top edge fade from hero */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background: "linear-gradient(to bottom, #05050a, transparent)",
        }}
      />

      {/* section header */}
      <div className="relative mb-16 flex flex-col items-center text-center">
        {/* eyebrow rule */}
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: CINEMA }}
        >
          <span className="h-px w-12 bg-gold/40" />
          <span className="font-sans text-[0.58rem] uppercase tracking-[0.4em] text-gold/70">
            Season I
          </span>
          <span className="h-px w-12 bg-gold/40" />
        </motion.div>

        <motion.h2
          className="font-display text-[11vw] font-black uppercase leading-none tracking-[0.04em] text-bone sm:text-[8vw] lg:text-[5.5rem]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.1, ease: CINEMA }}
          style={{ textShadow: "0 0 60px rgba(200,163,90,0.1)" }}
        >
          The{" "}
          <span className="bg-gradient-to-b from-gold-light via-gold to-gold-dark bg-clip-text text-transparent">
            Collection
          </span>
        </motion.h2>

        <motion.p
          className="mt-5 max-w-sm font-sans text-sm font-light leading-relaxed text-bone/45"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.22, ease: CINEMA }}
        >
          Each piece is a doctrine. Worn collectively — a uniform for those who
          operate in shadow.
        </motion.p>
      </div>

      {/* product grid */}
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {PRODUCTS.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            onViewFit={setActiveProduct}
            // onInquire left unwired — attach when the inquiry form is built
          />
        ))}
      </div>

      {/* bottom atmospheric flourish */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(200,163,90,0.04) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: CINEMA }}
      />

      {/* Size visualizer modal — opens on "View Fit" */}
      <SizeVisualizer
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}
