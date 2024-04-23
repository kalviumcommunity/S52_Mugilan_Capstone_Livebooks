"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import UIUX from "@/assets/Icons/Vector.png"
export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: { title: string; description: string; content?: React.ReactNode | any; }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint);
          if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        },
        0
      );
      setActiveCard(closestBreakpointIndex);
    }
  );

  const backgroundColors = [
    "#0f172a", // Replacing "var(--slate-900)"
    "#000000", // Replacing "var(--black)"
    "#1f2937", // Replacing "var(--neutral-900)"
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #6ee7b7, #22c55e)", // Replacing "var(--cyan-500), var(--emerald-500)"
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // Replacing "var(--pink-500), var(--indigo-500)"
    "linear-gradient(to bottom right, #fb923c, #facc15)", // Replacing "var(--orange-500), var(--yellow-500)"
  ];

  return (
    <motion.div
      animate={{ backgroundColor: backgroundColors[activeCard % backgroundColors.length] }}
      className="h-[60vh] w-[60%] overflow-y-auto flex justify-center relative space-x-10 rounded-md"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 mb-[320px]">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.7 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.7 }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-50" />
        </div>
      </div>
      <motion.div
        animate={{ background: linearGradients[activeCard % linearGradients.length] }}
        className={cn(
          "hidden lg:block content-center h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
        <img src={UIUX} alt="" />
      </motion.div>
    </motion.div>
  );
};