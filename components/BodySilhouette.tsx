"use client";

import { motion } from "framer-motion";
import { bodyProportions } from "@/lib/sizing";
import type { GarmentType } from "@/data/products";
import { cmToFtIn } from "@/lib/sizing";

const CINEMA = [0.16, 1, 0.3, 1] as const;

/* Base human silhouette parts (front-facing, viewBox 0 0 120 320, centre x=60).
 * Rendered as a union of solid shapes so there are no internal seams. */
const BODY = {
  head: "M60 10 C68 10 73 18 73 27 C73 37 68 44 60 44 C52 44 47 37 47 27 C47 18 52 10 60 10 Z",
  neck: "M54 42 L66 42 L66 52 L54 52 Z",
  torso:
    "M40 54 C40 50 44 48 50 47 L70 47 C76 48 80 50 80 54 C82 80 81 110 78 140 C77 155 76 168 78 184 C68 190 52 190 42 184 C44 168 43 155 42 140 C39 110 38 80 40 54 Z",
  armL:
    "M40 56 C30 80 27 110 28 142 C28 152 30 160 36 165 C42 163 45 155 45 145 C45 113 44 83 44 58 Z",
  armR:
    "M80 56 C90 80 93 110 92 142 C92 152 90 160 84 165 C78 163 75 155 75 145 C75 113 76 83 76 58 Z",
  legL:
    "M58 182 C50 182 44 184 42 190 C40 222 41 272 44 302 L42 314 C50 316 56 314 58 306 C59 272 60 232 60 194 Z",
  legR:
    "M62 182 C70 182 76 184 78 190 C80 222 79 272 76 302 L78 314 C70 316 64 314 62 306 C61 272 60 232 60 194 Z",
  footL: "M42 310 L40 318 C40 322 45 324 51 322 L58 320 L58 310 Z",
  footR: "M78 310 L80 318 C80 322 75 324 69 322 L62 320 L62 310 Z",
};

function BodyShape() {
  return (
    <g fill="url(#bodyFill)" stroke="rgba(236,230,216,0.22)" strokeWidth="0.5">
      <path d={BODY.head} />
      <path d={BODY.neck} />
      <path d={BODY.armL} />
      <path d={BODY.armR} />
      <path d={BODY.legL} />
      <path d={BODY.legR} />
      <path d={BODY.footL} />
      <path d={BODY.footR} />
      <path d={BODY.torso} />
    </g>
  );
}

/* Garment overlays per garment type — gold, translucent, sit "on" the body. */
function Garment({ garment }: { garment: GarmentType }) {
  const stroke = "rgba(216,183,119,0.85)";
  const fill = "rgba(200,163,90,0.16)";
  const common = { fill, stroke, strokeWidth: 0.9 };

  if (garment === "OUTERWEAR") {
    return (
      <g>
        {/* long coat body */}
        <path
          {...common}
          d="M33 55 C33 49 39 46 47 45 L73 45 C81 46 87 49 87 55 C91 112 91 184 93 262 C70 270 50 270 27 262 C29 184 29 112 33 55 Z"
        />
        {/* sleeves */}
        <path
          {...common}
          d="M33 57 C21 100 19 172 23 232 C25 242 29 248 37 250 C43 248 45 240 44 230 C43 172 43 102 44 60 Z"
        />
        <path
          {...common}
          d="M87 57 C99 100 101 172 97 232 C95 242 91 248 83 250 C77 248 75 240 76 230 C77 172 77 102 76 60 Z"
        />
        {/* lapel + centre opening */}
        <path
          fill="none"
          stroke={stroke}
          strokeWidth="0.9"
          d="M48 46 L60 66 L72 46 M60 66 L60 258"
        />
      </g>
    );
  }

  if (garment === "BOTTOMS") {
    return (
      <g>
        {/* waistband */}
        <path {...common} d="M37 148 L83 148 L83 166 L37 166 Z" />
        {/* baggy legs */}
        <path
          {...common}
          d="M40 162 C35 212 36 272 39 308 L37 318 C46 320 55 318 57 308 C59 272 60 214 60 168 C52 166 46 166 40 162 Z"
        />
        <path
          {...common}
          d="M80 162 C85 212 84 272 81 308 L83 318 C74 320 65 318 63 308 C61 272 60 214 60 168 C68 166 74 166 80 162 Z"
        />
      </g>
    );
  }

  // TOPS — oversized hoodie
  return (
    <g>
      {/* hood */}
      <path
        {...common}
        d="M48 48 C46 37 50 28 60 28 C70 28 74 37 72 48 C64 44 56 44 48 48 Z"
      />
      {/* boxy body */}
      <path
        {...common}
        d="M33 58 C33 52 39 49 47 48 L73 48 C81 49 87 52 87 58 C91 102 91 154 88 200 C70 208 50 208 32 200 C29 154 29 102 33 58 Z"
      />
      {/* baggy sleeves */}
      <path
        {...common}
        d="M33 60 C23 92 21 144 25 182 C27 192 31 198 39 200 C45 198 47 190 46 180 C45 144 43 98 44 62 Z"
      />
      <path
        {...common}
        d="M87 60 C97 92 99 144 95 182 C93 192 89 198 81 200 C75 198 73 190 74 180 C75 144 77 98 76 62 Z"
      />
      {/* kangaroo pocket hint */}
      <path
        fill="none"
        stroke={stroke}
        strokeWidth="0.8"
        d="M45 168 C52 176 68 176 75 168"
      />
    </g>
  );
}

export default function BodySilhouette({
  heightCm,
  weightKg,
  garment,
  sizeIndex,
}: {
  heightCm: number;
  weightKg: number;
  garment: GarmentType;
  sizeIndex: number;
}) {
  const { buildScale, heightScale } = bodyProportions(heightCm, weightKg);
  const { feet, inches } = cmToFtIn(heightCm);

  // oversized brand: garment scales a touch beyond the body, more per size up
  const garmentScale = 1.06 + sizeIndex * 0.035;

  const baseHeight = 340;
  const displayH = baseHeight * heightScale;

  return (
    <div className="flex items-end justify-center gap-4">
      {/* height ruler */}
      <div
        className="relative flex flex-col items-center justify-between py-1"
        style={{ height: displayH }}
      >
        <span className="h-px w-3 bg-gold/50" />
        <div className="relative flex-1">
          <span className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-gold/40 via-gold/20 to-gold/40" />
        </div>
        <span className="h-px w-3 bg-gold/50" />
        <span className="absolute -left-1 top-1/2 -translate-x-full -translate-y-1/2 -rotate-90 whitespace-nowrap font-sans text-[0.55rem] uppercase tracking-[0.3em] text-gold/70">
          {Math.round(heightCm)} cm · {feet}&#39;{inches}&#34;
        </span>
      </div>

      {/* the figure */}
      <motion.svg
        viewBox="0 0 120 330"
        style={{ height: displayH, width: "auto" }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: CINEMA }}
        aria-label="Proportional fit preview"
      >
        <defs>
          <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3730" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#171520" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="figGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#c8a35a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c8a35a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="60" cy="150" rx="70" ry="150" fill="url(#figGlow)" />

        {/* body — width scaled by build */}
        <g
          transform={`translate(60,0) scale(${buildScale.toFixed(
            3
          )},1) translate(-60,0)`}
        >
          <BodyShape />
        </g>

        {/* garment — animates on, scaled oversized about the chest */}
        <motion.g
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: CINEMA }}
          style={{
            transformBox: "fill-box",
            transformOrigin: "50% 30%",
          }}
          transform={`translate(60,0) scale(${(
            buildScale * garmentScale
          ).toFixed(3)},${garmentScale.toFixed(3)}) translate(-60,0)`}
        >
          <Garment garment={garment} />
        </motion.g>
      </motion.svg>
    </div>
  );
}
