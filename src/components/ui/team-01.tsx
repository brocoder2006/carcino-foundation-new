"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { teamData } from "@/data/teamData";

export type { TeamMember };
export { teamData };

interface Team01Props {
  isLightMode?: boolean;
  members?: TeamMember[];
}

export default function Team01({ isLightMode = false, members = teamData }: Team01Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="py-4 sm:py-8 w-full">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center">
          {/* Distinct Shaped Geometric Tiles Grid (Centered Responsive Layout) */}
          <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 w-full max-w-6xl mx-auto">
            {members.map((value, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex flex-col items-center justify-center gap-5 w-[260px] cursor-pointer relative"
                >
                  {/* Organic Shaped Tile Frame */}
                  <div className="relative w-full max-w-[260px] aspect-[270/336] mx-auto">
                    {/* The Masked Image Container with Solid Shape Silhouette */}
                    <div
                      className="w-full h-full relative transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{
                        WebkitMaskImage: `url(${value.mask})`,
                        maskImage: `url(${value.mask})`,
                        WebkitMaskSize: "100% 100%",
                        maskSize: "100% 100%",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        backgroundColor: value.color,
                      }}
                    >
                      {/* Person Portrait in Full Vibrant Color on Hover (No Grayscale) */}
                      <img
                        className={`w-full h-full object-cover ${value.imagePosition || "object-top"} filter brightness-[0.98] group-hover:brightness-105 ${
                          value.imageScale ? "" : "group-hover:scale-105"
                        } transition-all duration-500 ease-out`}
                        style={
                          value.imageScale || value.transformOrigin
                            ? {
                                transform: `scale(${isHovered ? (value.imageScale || 1) * 1.05 : value.imageScale || 1})`,
                                transformOrigin: value.transformOrigin || "center center",
                              }
                            : undefined
                        }
                        src={value.image}
                        alt={value.name}
                      />
                    </div>
                  </div>

                  {/* Name and Role (Always visible, No social icons) */}
                  <div className="w-full flex flex-col items-center justify-center text-center">
                    <h3
                      className={`text-2xl font-bold font-syne tracking-tight transition-colors ${isLightMode ? "text-[#163B2E]" : "text-white"
                        }`}
                      style={{ fontFamily: "var(--font-syne), sans-serif" }}
                    >
                      {value.name}
                    </h3>
                    <p
                      className={`text-sm font-normal font-spaceGrotesk transition-colors mt-0.5 ${isLightMode ? "text-[#0B3E4C]" : "text-zinc-400"
                        }`}
                    >
                      {value.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
