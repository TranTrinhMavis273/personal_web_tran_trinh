"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { ReactNode } from "react";

// Original implementation inspired by Hover.dev's hover/tilt interaction category.
// No Hover.dev Pro source is included.
export function HoverSkillCard({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);
  return (
    <motion.div
      className="rounded-2xl border border-border bg-card/70 p-7 backdrop-blur-xl"
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left) / bounds.width - 0.5);
        y.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
