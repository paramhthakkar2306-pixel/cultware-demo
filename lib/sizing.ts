/* ============================================================================
 * CULT WARE — Sizing logic
 * Pure, dependency-free functions. ALL size/fit/body-scaling math lives here so
 * it can be tuned in one place without touching UI. Internally everything works
 * in metric (cm / kg); UI converts at the edges.
 * ========================================================================== */

export type SizeCode = "S" | "M" | "L" | "XL";
export type HeightUnit = "cm" | "ft";
export type WeightUnit = "kg" | "lbs";

export interface SizeRecommendation {
  size: SizeCode;
  index: number; // 0..3
  bmi: number;
  fitName: string;
  description: string;
}

export interface BodyProportions {
  bmi: number;
  /** horizontal build multiplier (torso/limb width) */
  buildScale: number;
  /** vertical display multiplier (overall stature) */
  heightScale: number;
}

export interface SizeChartRow {
  size: SizeCode;
  /** half-chest / total chest in cm (oversized spec) */
  chest: number;
  /** body length in cm */
  length: number;
  /** sleeve in cm */
  sleeve: number;
}

// --- small math helpers -----------------------------------------------------
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/** map x from [a,b] onto [c,d], clamped */
const remap = (x: number, a: number, b: number, c: number, d: number) =>
  clamp(c + ((x - a) * (d - c)) / (b - a), Math.min(c, d), Math.max(c, d));

// --- unit conversions -------------------------------------------------------
export const ftInToCm = (feet: number, inches: number) =>
  (feet * 12 + inches) * 2.54;

export const cmToFtIn = (cm: number) => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - feet * 12);
  // handle rounding rollover (e.g. 11.6in -> 12)
  if (inches === 12) return { feet: feet + 1, inches: 0 };
  return { feet, inches };
};

export const lbsToKg = (lbs: number) => lbs * 0.45359237;
export const kgToLbs = (kg: number) => kg / 0.45359237;

// --- size definitions -------------------------------------------------------
const SIZES: { code: SizeCode; fitName: string; description: string }[] = [
  {
    code: "S",
    fitName: "Boxy Oversized",
    description:
      "Sits clean and squared off the frame. The leanest read of the CULT WARE drop standard.",
  },
  {
    code: "M",
    fitName: "Relaxed Oversized",
    description:
      "Relaxed oversized fit — true to the CULT WARE drop standard. Drapes with intent.",
  },
  {
    code: "L",
    fitName: "Heavy Drape",
    description:
      "Generous through the body with monastic length. Weight you can feel in the silhouette.",
  },
  {
    code: "XL",
    fitName: "Maximal Volume",
    description:
      "Full ritual drape — deliberately consuming. Built to swallow the frame in shadow.",
  },
];

export const SIZE_CHART: SizeChartRow[] = [
  { size: "S", chest: 118, length: 72, sleeve: 60 },
  { size: "M", chest: 126, length: 75, sleeve: 62 },
  { size: "L", chest: 134, length: 78, sleeve: 64 },
  { size: "XL", chest: 142, length: 81, sleeve: 66 },
];

/**
 * Core recommendation. Weight sets the base bucket; height and BMI refine it
 * (taller frames carry more length/volume; extreme BMI nudges a size).
 * Tune the thresholds here to adjust the whole experience.
 */
export function recommendSize(
  heightCm: number,
  weightKg: number
): SizeRecommendation {
  const bmi = weightKg / Math.pow(heightCm / 100, 2);

  let score: number;
  if (weightKg < 58) score = 0;
  else if (weightKg < 73) score = 1;
  else if (weightKg < 90) score = 2;
  else score = 3;

  // stature refinement
  if (heightCm >= 190) score += 1;
  else if (heightCm <= 162) score -= 1;

  // build refinement at the extremes
  if (bmi >= 29 && score < 3) score += 1;
  if (bmi <= 18 && score > 0) score -= 1;

  score = clamp(Math.round(score), 0, 3);
  const def = SIZES[score];

  return {
    size: def.code,
    index: score,
    bmi: Math.round(bmi * 10) / 10,
    fitName: def.fitName,
    description: def.description,
  };
}

/**
 * Visual proportions for the rendered silhouette.
 * - buildScale widens/narrows the body from BMI.
 * - heightScale scales overall stature from height.
 */
export function bodyProportions(
  heightCm: number,
  weightKg: number
): BodyProportions {
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  return {
    bmi,
    buildScale: remap(bmi, 17, 32, 0.84, 1.28),
    heightScale: remap(heightCm, 150, 200, 0.85, 1.13),
  };
}

/** Validate raw metric inputs; returns null if usable, else a message. */
export function validateMeasurements(
  heightCm: number,
  weightKg: number
): string | null {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
    return "Enter both a height and a weight.";
  }
  if (heightCm < 120 || heightCm > 230) {
    return "Height looks off — enter a value between 120–230 cm.";
  }
  if (weightKg < 35 || weightKg > 200) {
    return "Weight looks off — enter a value between 35–200 kg.";
  }
  return null;
}
