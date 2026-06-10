"use client";

import { useState, useEffect } from "react";

/** True on touch-primary devices (coarse pointer, no hover capability). */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);
  return touch;
}
