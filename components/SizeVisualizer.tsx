"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import BodySilhouette from "./BodySilhouette";
import {
  cmToFtIn,
  ftInToCm,
  kgToLbs,
  lbsToKg,
  recommendSize,
  SIZE_CHART,
  validateMeasurements,
  type HeightUnit,
  type SizeRecommendation,
  type WeightUnit,
} from "@/lib/sizing";

const CINEMA = [0.16, 1, 0.3, 1] as const;

type FitResult = {
  heightCm: number;
  weightKg: number;
  rec: SizeRecommendation;
};

/** Compact two-option unit toggle. */
function UnitToggle<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly [T, T];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-full border border-gold/25 text-[0.6rem] uppercase tracking-[0.2em]">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`relative px-3 py-1.5 transition-colors duration-500 ${
              active ? "text-ink" : "text-bone/50 hover:text-bone/80"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`toggle-${options.join("")}`}
                className="absolute inset-0 -z-10 bg-gold"
                transition={{ duration: 0.5, ease: CINEMA }}
              />
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[0.6rem] uppercase tracking-[0.32em] text-bone/45">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-sm border border-bone/15 bg-ink/60 px-4 py-3 font-sans text-bone outline-none transition-colors duration-300 placeholder:text-bone/25 focus:border-gold/60";

export default function SizeVisualizer({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  const [hCm, setHCm] = useState("");
  const [hFt, setHFt] = useState("");
  const [hIn, setHIn] = useState("");
  const [wKg, setWKg] = useState("");
  const [wLbs, setWLbs] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FitResult | null>(null);

  // reset everything when a new product opens / modal closes
  useEffect(() => {
    setHeightUnit("cm");
    setWeightUnit("kg");
    setHCm("");
    setHFt("");
    setHIn("");
    setWKg("");
    setWLbs("");
    setError(null);
    setResult(null);
  }, [product?.id]);

  // escape to close + scroll lock while open
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [product, onClose]);

  const switchHeightUnit = (u: HeightUnit) => {
    if (u === heightUnit) return;
    if (u === "ft") {
      const cm = parseFloat(hCm);
      if (Number.isFinite(cm)) {
        const { feet, inches } = cmToFtIn(cm);
        setHFt(String(feet));
        setHIn(String(inches));
      }
    } else {
      const ft = parseFloat(hFt);
      const inch = parseFloat(hIn) || 0;
      if (Number.isFinite(ft)) setHCm(String(Math.round(ftInToCm(ft, inch))));
    }
    setHeightUnit(u);
  };

  const switchWeightUnit = (u: WeightUnit) => {
    if (u === weightUnit) return;
    if (u === "lbs") {
      const kg = parseFloat(wKg);
      if (Number.isFinite(kg)) setWLbs(String(Math.round(kgToLbs(kg))));
    } else {
      const lbs = parseFloat(wLbs);
      if (Number.isFinite(lbs)) setWKg(String(Math.round(lbsToKg(lbs))));
    }
    setWeightUnit(u);
  };

  const visualize = () => {
    const heightCm =
      heightUnit === "cm"
        ? parseFloat(hCm)
        : ftInToCm(parseFloat(hFt), parseFloat(hIn) || 0);
    const weightKg =
      weightUnit === "kg" ? parseFloat(wKg) : lbsToKg(parseFloat(wLbs));

    const err = validateMeasurements(heightCm, weightKg);
    if (err) {
      setError(err);
      setResult(null);
      return;
    }
    setError(null);
    setResult({ heightCm, weightKg, rec: recommendSize(heightCm, weightKg) });
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: CINEMA }}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Size visualizer — ${product.name}`}
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-sm border border-gold/20 shadow-2xl md:flex-row md:overflow-hidden"
            style={{
              background:
                "radial-gradient(120% 100% at 0% 0%, #14121b 0%, #0a0910 50%, #060509 100%)",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.65, ease: CINEMA }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              &#10005;
            </button>

            {/* ---------- LEFT: product showcase ---------- */}
            <div className="relative z-10 flex w-full flex-col justify-between border-b border-gold/10 p-5 md:w-[38%] md:border-b-0 md:border-r md:p-8">
              <div>
                <span className="inline-block border border-gold/40 px-2 py-[3px] font-sans text-[0.55rem] font-medium uppercase tracking-[0.3em] text-gold">
                  {product.category}
                </span>
              </div>

              {/* product image */}
              <div className="relative my-3 flex items-center justify-center md:my-6 md:flex-1">
                <div
                  className="relative aspect-[3/4] w-full max-w-[130px] overflow-hidden rounded-sm md:max-w-[200px]"
                  style={{
                    background:
                      "radial-gradient(130% 120% at 50% 10%, #1e1b2a 0%, #0e0c18 55%, #07050f 100%)",
                    border: "1px solid rgba(200,163,90,0.15)",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="200px"
                    className="object-contain mix-blend-multiply p-3"
                  />
                  {/* subtle gold glow behind garment */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,163,90,0.10) 0%, transparent 100%)",
                    }}
                  />
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold uppercase leading-tight tracking-[0.06em] text-bone">
                  {product.name}
                </h2>
                <p className="mt-2 font-sans text-base font-light text-gold">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* ---------- RIGHT: inputs + result ---------- */}
            <div className="relative z-10 w-full overflow-y-auto p-5 md:w-[62%] md:p-9">
              <span className="mb-1 block font-sans text-[0.58rem] uppercase tracking-[0.4em] text-gold/70">
                Size Visualizer
              </span>
              <h3 className="mb-5 font-display text-xl font-bold uppercase tracking-[0.05em] text-bone md:mb-7 md:text-2xl">
                Find Your Fit
              </h3>

              {/* inputs */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-sans text-[0.6rem] uppercase tracking-[0.32em] text-bone/45">
                      Height
                    </span>
                    <UnitToggle
                      value={heightUnit}
                      options={["cm", "ft"] as const}
                      onChange={switchHeightUnit}
                    />
                  </div>
                  {heightUnit === "cm" ? (
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="182"
                      value={hCm}
                      onChange={(e) => setHCm(e.target.value)}
                      className={inputCls}
                    />
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="6"
                          value={hFt}
                          onChange={(e) => setHFt(e.target.value)}
                          className={inputCls}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bone/30">
                          ft
                        </span>
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="0"
                          value={hIn}
                          onChange={(e) => setHIn(e.target.value)}
                          className={inputCls}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bone/30">
                          in
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-sans text-[0.6rem] uppercase tracking-[0.32em] text-bone/45">
                      Weight
                    </span>
                    <UnitToggle
                      value={weightUnit}
                      options={["kg", "lbs"] as const}
                      onChange={switchWeightUnit}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder={weightUnit === "kg" ? "78" : "172"}
                      value={weightUnit === "kg" ? wKg : wLbs}
                      onChange={(e) =>
                        weightUnit === "kg"
                          ? setWKg(e.target.value)
                          : setWLbs(e.target.value)
                      }
                      className={inputCls}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bone/30">
                      {weightUnit}
                    </span>
                  </div>
                </div>
              </div>

              {/* visualize button */}
              <button
                type="button"
                onClick={visualize}
                className="group relative mt-7 w-full overflow-hidden rounded-sm border border-gold/50 py-4 font-sans text-[0.7rem] uppercase tracking-[0.35em] text-bone transition-colors duration-500"
              >
                <span className="absolute inset-0 -translate-y-full bg-gold transition-transform duration-500 ease-cinema group-hover:translate-y-0" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                  Visualize Fit
                </span>
              </button>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 font-sans text-xs text-red-300/80"
                >
                  {error}
                </motion.p>
              )}

              {/* concept-demo disclaimer */}
              <p className="mt-5 flex items-start gap-2 font-sans text-[0.62rem] leading-relaxed text-gold/45">
                <span className="mt-[2px] h-1 w-1 shrink-0 rounded-full bg-gold/40" />
                <span>
                  Concept demo — fit results are indicative only. For a fully
                  custom store built for your brand, contact{" "}
                  <a
                    href="https://instagram.com/sozostudio.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold/70 underline-offset-2 transition-colors hover:text-gold hover:underline"
                  >
                    SOZO Studio
                  </a>
                  .
                </span>
              </p>

              {/* result */}
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    key={`${result.heightCm}-${result.weightKg}-${product.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.8, ease: CINEMA }}
                    className="mt-9 border-t border-gold/10 pt-8"
                  >
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                      {/* silhouette */}
                      <div className="flex justify-center sm:w-1/2">
                        <BodySilhouette
                          heightCm={result.heightCm}
                          weightKg={result.weightKg}
                          garment={product.garment}
                          sizeIndex={result.rec.index}
                        />
                      </div>

                      {/* recommendation */}
                      <div className="sm:w-1/2">
                        <span className="font-sans text-[0.58rem] uppercase tracking-[0.35em] text-bone/40">
                          Recommended Size
                        </span>
                        <div className="mt-2 flex items-baseline gap-3">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.2,
                              ease: CINEMA,
                            }}
                            className="bg-gradient-to-b from-gold-light via-gold to-gold-dark bg-clip-text font-display text-6xl font-black text-transparent"
                          >
                            {result.rec.size}
                          </motion.span>
                          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold/80">
                            {result.rec.fitName}
                          </span>
                        </div>
                        <p className="mt-4 font-sans text-sm font-light leading-relaxed text-bone/60">
                          {result.rec.description}
                        </p>
                      </div>
                    </div>

                    {/* size chart reference */}
                    <div className="mt-9">
                      <span className="mb-3 block font-sans text-[0.58rem] uppercase tracking-[0.35em] text-bone/40">
                        Size Chart — Reference (cm)
                      </span>
                      <div className="overflow-x-auto rounded-sm border border-bone/10">
                        <table className="w-full border-collapse text-left font-sans text-xs">
                          <thead>
                            <tr className="bg-bone/[0.03] text-[0.55rem] uppercase tracking-[0.2em] text-bone/40">
                              <th className="px-4 py-2 font-medium">Size</th>
                              <th className="px-4 py-2 font-medium">Chest</th>
                              <th className="px-4 py-2 font-medium">Length</th>
                              <th className="px-4 py-2 font-medium">Sleeve</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SIZE_CHART.map((row) => {
                              const active = row.size === result.rec.size;
                              return (
                                <tr
                                  key={row.size}
                                  className={`border-t border-bone/[0.06] transition-colors ${
                                    active
                                      ? "bg-gold/10 text-bone"
                                      : "text-bone/55"
                                  }`}
                                >
                                  <td className="px-4 py-2.5 font-medium">
                                    <span
                                      className={
                                        active ? "text-gold" : undefined
                                      }
                                    >
                                      {row.size}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5">{row.chest}</td>
                                  <td className="px-4 py-2.5">{row.length}</td>
                                  <td className="px-4 py-2.5">{row.sleeve}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 font-sans text-[0.62rem] leading-relaxed text-bone/30">
                        Recommendation is a guide to the CULT WARE oversized drop.
                        For a closer fit, size down one increment.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
