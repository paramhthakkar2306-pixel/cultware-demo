"use client";

import { motion } from "framer-motion";

const CINEMA = [0.16, 1, 0.3, 1] as const;

/* ----------------------------------------------------------------------------
 * Editorial streetwear silhouettes.
 * Each figure is a union of solid dark shapes sharing one userSpaceOnUse
 * gradient (so there are no internal seams) — they read as a single clean,
 * shadowed silhouette. A gold drop-shadow rim + radial aura sit behind them.
 * ------------------------------------------------------------------------- */

// ---- MALE: oversized hoodie, baggy cargos, chunky sneakers, broad stance ----
const MALE = {
  hood: "M86 104 C84 86 96 74 112 74 L148 74 C164 74 176 86 174 104 C150 96 110 96 86 104 Z",
  head: "M130 30 C147 30 158 46 157 68 C156 86 145 98 130 98 C115 98 104 86 103 68 C102 46 113 30 130 30 Z",
  body:
    "M70 114 C70 103 78 97 92 96 C104 92 116 90 130 90 C144 90 156 92 168 96 C182 97 190 103 190 114 " +
    "C194 152 194 204 188 252 C186 272 185 288 187 302 " +
    "C162 311 98 311 73 302 C75 288 74 272 72 252 C66 204 66 152 70 114 Z",
  sleeveL:
    "M71 118 C58 144 53 186 56 220 C57 236 61 250 72 257 C86 254 94 244 94 228 C94 192 91 150 89 122 Z",
  sleeveR:
    "M189 118 C202 144 207 186 204 220 C203 236 199 250 188 257 C174 254 166 244 166 228 C166 192 169 150 171 122 Z",
  legR:
    "M130 300 C153 300 176 303 182 314 C188 362 186 432 179 486 C177 516 173 549 171 576 L167 600 " +
    "C151 605 140 603 137 592 C135 562 134 512 133 472 C132 410 131 354 130 312 Z",
  legL:
    "M126 300 C103 300 80 303 74 314 C68 362 70 432 77 486 C79 516 83 549 85 576 L89 600 " +
    "C105 605 116 603 119 592 C121 562 122 512 123 472 C124 410 125 354 126 312 Z",
  shoeR:
    "M152 592 C147 592 143 597 143 604 L143 608 C143 615 148 619 157 619 L200 619 C209 619 211 612 206 606 C199 596 186 590 173 590 Z",
  shoeL:
    "M110 592 C115 592 119 597 119 604 L119 608 C119 615 114 619 105 619 L62 619 C53 619 51 612 56 606 C63 596 76 590 89 590 Z",
};

// ---- FEMALE: oversized flared coat, cinched waist, wide-leg trousers, boots ----
const FEMALE = {
  hair: "M104 46 C98 74 98 104 108 122 L152 122 C162 104 162 74 156 46 C148 30 112 30 104 46 Z",
  head: "M130 32 C146 32 156 47 155 67 C154 84 144 96 130 96 C116 96 106 84 105 67 C104 47 114 32 130 32 Z",
  body:
    "M80 116 C80 104 88 98 100 97 C110 94 120 92 130 92 C140 92 150 94 160 97 C172 98 180 104 180 116 " +
    "C184 150 182 186 172 214 C176 252 182 296 188 332 " +
    "C150 343 110 343 72 332 C78 296 84 252 88 214 C78 186 76 150 80 116 Z",
  sleeveL:
    "M81 120 C70 150 66 188 69 218 C70 232 74 244 83 250 C94 247 100 238 100 224 C100 188 98 152 95 124 Z",
  sleeveR:
    "M179 120 C190 150 194 188 191 218 C190 232 186 244 177 250 C166 247 160 238 160 224 C160 188 162 152 165 124 Z",
  legR:
    "M130 322 C149 322 168 325 172 336 C177 386 177 456 174 514 C173 548 172 574 171 596 L167 612 " +
    "C151 616 140 614 137 604 C136 564 135 504 134 452 C133 402 131 360 130 332 Z",
  legL:
    "M126 322 C107 322 88 325 84 336 C79 386 79 456 82 514 C83 548 84 574 85 596 L89 612 " +
    "C105 616 116 614 119 604 C120 564 121 504 122 452 C123 402 125 360 126 332 Z",
  shoeR:
    "M150 596 C146 596 143 600 143 606 L143 610 C143 616 147 620 155 620 L190 620 C198 620 200 614 195 609 C189 600 178 595 167 595 Z",
  shoeL:
    "M112 596 C116 596 119 600 119 606 L119 610 C119 616 115 620 107 620 L72 620 C64 620 62 614 67 609 C73 600 84 595 95 595 Z",
};

function MaleShape({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <path d={MALE.hood} />
      <path d={MALE.head} />
      <path d={MALE.sleeveL} />
      <path d={MALE.sleeveR} />
      <path d={MALE.legL} />
      <path d={MALE.legR} />
      <path d={MALE.shoeL} />
      <path d={MALE.shoeR} />
      <path d={MALE.body} />
    </g>
  );
}

function FemaleShape({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <path d={FEMALE.hair} />
      <path d={FEMALE.head} />
      <path d={FEMALE.sleeveL} />
      <path d={FEMALE.sleeveR} />
      <path d={FEMALE.legL} />
      <path d={FEMALE.legR} />
      <path d={FEMALE.shoeL} />
      <path d={FEMALE.shoeR} />
      <path d={FEMALE.body} />
    </g>
  );
}

function Figure({
  variant,
  uid,
  delay,
  scale,
  rotate,
  driftY,
  driftDur,
}: {
  variant: "male" | "female";
  uid: string;
  delay: number;
  scale: number;
  rotate: number;
  driftY: number;
  driftDur: number;
}) {
  const bodyGrad = `body-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 100, filter: "blur(16px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 2.6, delay, ease: CINEMA }}
    >
      {/* perpetual ethereal ascent / suspension */}
      <motion.div
        animate={{ y: [0, -driftY, 0] }}
        transition={{ duration: driftDur, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 260 640"
          className="h-[70vh] max-h-[660px] w-auto"
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          aria-hidden
        >
          <defs>
            {/* dark, near-black body gradient (shared across all parts) */}
            <linearGradient
              id={bodyGrad}
              gradientUnits="userSpaceOnUse"
              x1="130"
              y1="20"
              x2="130"
              y2="624"
            >
              <stop offset="0%" stopColor="#211f2a" />
              <stop offset="22%" stopColor="#100f18" />
              <stop offset="60%" stopColor="#08080f" />
              <stop offset="100%" stopColor="#050509" />
            </linearGradient>
            <radialGradient id={glowId} cx="50%" cy="36%" r="58%">
              <stop offset="0%" stopColor="#c8a35a" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#c8a35a" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#c8a35a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* gold aura behind the figure */}
          <ellipse cx="130" cy="250" rx="160" ry="280" fill={`url(#${glowId})`} />

          {/* the shadowed silhouette with a tight gold rim */}
          <g
            style={{
              filter:
                "drop-shadow(0 0 20px rgba(200,163,90,0.38)) drop-shadow(0 0 5px rgba(217,183,119,0.3))",
            }}
          >
            {variant === "male" ? (
              <MaleShape fill={`url(#${bodyGrad})`} />
            ) : (
              <FemaleShape fill={`url(#${bodyGrad})`} />
            )}
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function RitualFigures() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center gap-[5vw] pb-[5vh]">
      {/* MALE — left, slightly taller, leaning in */}
      <Figure
        variant="male"
        uid="m"
        delay={0.6}
        scale={1.07}
        rotate={-2.5}
        driftY={22}
        driftDur={11}
      />
      {/* FEMALE — right, slighter, opposing lean */}
      <Figure
        variant="female"
        uid="f"
        delay={0.9}
        scale={0.95}
        rotate={2.5}
        driftY={18}
        driftDur={9}
      />
    </div>
  );
}
