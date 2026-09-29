"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export interface TeamMemberItem {
  id: number;
  name: string;
  designation: string;
  image: string;
  category?: string;
  bio?: string;
  badge?: string;
  badgeColor?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

interface AnimatedTooltipProps {
  items: TeamMemberItem[];
  isLightMode?: boolean;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  items,
  isLightMode = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  // Smooth rotation & translation following mouse position
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-row items-center justify-center my-6 py-4 px-2">
      {items.map((item) => (
        <div
          className="-mr-3 sm:-mr-4 relative group cursor-pointer"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className={`absolute -top-20 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-2xl z-50 shadow-2xl px-4 py-2.5 backdrop-blur-xl border transition-colors ${
                  isLightMode
                    ? "bg-white/95 border-purple-300 text-[#163B2E] shadow-purple-900/10"
                    : "bg-[#0B0B0C]/95 border-white/20 text-white shadow-[0_20px_50px_rgba(194,122,255,0.3)]"
                }`}
              >
                {/* Decorative Bottom Gradient Line Accent */}
                <div className="absolute inset-x-6 z-30 w-[40%] -bottom-px bg-gradient-to-r from-transparent via-[#39C69C] to-transparent h-px" />
                <div className="absolute left-6 w-[50%] z-30 -bottom-px bg-gradient-to-r from-transparent via-[#CDA8E8] to-transparent h-px" />

                {/* Name & Designation */}
                <div className="font-spaceGrotesk font-bold text-sm sm:text-base leading-snug">
                  {item.name}
                </div>
                <div className="font-spaceGrotesk text-[11px] font-medium tracking-wide opacity-85 mt-0.5" style={{ color: item.badgeColor || (isLightMode ? "#0B3E4C" : "#CDA8E8") }}>
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Member Avatar Picture */}
          <div className="relative rounded-full p-0.5 bg-gradient-to-tr from-[#39C69C]/40 via-[#CDA8E8]/40 to-[#F6C656]/40 transition-transform duration-300 group-hover:scale-115 group-hover:z-40">
            <img
              onMouseMove={handleMouseMove}
              src={item.image}
              alt={item.name}
              className={`object-cover object-top rounded-full h-14 w-14 sm:h-16 sm:w-16 border-2 transition-all duration-300 shadow-md ${
                hoveredIndex === item.id
                  ? "border-[#39C69C] shadow-[0_0_20px_rgba(57,198,156,0.5)]"
                  : isLightMode
                    ? "border-white"
                    : "border-[#1B1224]"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
