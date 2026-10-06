"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  mask: string;
  color: string;
  description: string;
  imagePosition?: string;
};

export const teamData: TeamMember[] = [
  {
    name: "Rajannya Das",
    role: "Founder & CEO",
    image: "/ceo.jpeg",
    mask: "/masks/shape-2.png", // Figure-8 organic squircle (Tile 1)
    color: "#3B22F2",
    description:
      "Leading global oncology advocacy, patient guidance, and youth-led health equity initiatives at The Carcino Foundation.",
    imagePosition: "object-top",
  },
  {
    name: "Soushree Chakraborty",
    role: "Chief Research Officer",
    image: "/cro.jpeg",
    mask: "/masks/shape-2.png", // Arch dome (Tile 2)
    color: "#F59458",
    description:
      "Overseeing clinical research publications, oncology literacy initiatives, and evidence-based healthcare advocacy.",
    imagePosition: "object-top",
  },
  {
    name: "Aayush Singh",
    role: "Chief Operating Officer",
    image: "/aayush_singh.jpeg",
    mask: "/masks/shape-2.png", // Oval / Egg (Tile 3)
    color: "#F2E066",
    description:
      "Overseeing organizational strategy, operational workflows, and youth community healthcare initiatives worldwide.",
    imagePosition: "object-top",
  },
  {
    name: "Sambit Bhattacharjee",
    role: "Researcher",
    image: "/sambit_bhattacharjee.jpeg",
    mask: "/masks/shape-2.png", // 3-lobed cloud wave (Tile 4)
    color: "#1FB1F8",
    description:
      "Contributing to oncology healthcare equity, data analysis, and clinical research literacy across communities.",
    imagePosition: "object-top",
  },
  {
    name: "Shreya Anand",
    role: "PR Manager",
    image: "/pr.jpeg",
    mask: "/masks/shape-2.png", // 4-petal blossom / organic clover (Tile 5)
    color: "#EC4899",
    description:
      "Spearheading public relations, media engagement, community storytelling, and global healthcare communications at The Carcino Foundation.",
    imagePosition: "object-[50%_25%]",
  },
];

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
          {/* 5 Distinct Shaped Geometric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-7 w-full justify-items-center">
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
                  className="group flex flex-col items-center justify-center gap-5 w-full cursor-pointer relative"
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
                        className={`w-full h-full object-cover ${value.imagePosition || "object-top"} filter brightness-[0.98] group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out`}
                        src={value.image}
                        alt={value.name}
                      />
                    </div>

                    {/* Floating Pop-up Description on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 22, scale: 0.88 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: [0, -6, 0],
                            transition: {
                              opacity: { duration: 0.2 },
                              scale: { type: "spring", stiffness: 350, damping: 20 },
                              y: {
                                repeat: Infinity,
                                duration: 2.6,
                                ease: "easeInOut",
                              },
                            },
                          }}
                          exit={{
                            opacity: 0,
                            y: 14,
                            scale: 0.92,
                            transition: { duration: 0.18 },
                          }}
                          className={`absolute bottom-3 inset-x-2 z-30 p-3.5 sm:p-4 rounded-2xl backdrop-blur-2xl border transition-colors ${isLightMode
                            ? "bg-white/95 border-purple-200/90 text-[#163B2E] shadow-[0_20px_45px_-5px_rgba(0,0,0,0.2)]"
                            : "bg-[#0C0614]/95 border-[#CDA8E8]/40 text-white shadow-[0_25px_60px_-5px_rgba(0,0,0,0.85),0_0_35px_rgba(194,122,255,0.35)]"
                            }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-ping shrink-0"
                              style={{ backgroundColor: value.color }}
                            />
                            <span
                              className="font-spaceGrotesk text-[10px] font-bold uppercase tracking-wider"
                              style={{ color: isLightMode ? "#0B3E4C" : value.color }}
                            >
                              About
                            </span>
                          </div>
                          <p
                            className={`font-spaceGrotesk text-xs sm:text-[12.5px] font-light leading-relaxed ${isLightMode ? "text-[#2E1640]" : "text-[#E9CDF8]"
                              }`}
                          >
                            {value.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Name and Role (Always visible, No social icons) */}
                  <div className="w-full flex flex-col items-center justify-center text-center">
                    <h3
                      className={`text-2xl font-bold font-spaceGrotesk tracking-tight transition-colors ${isLightMode ? "text-[#163B2E]" : "text-white"
                        }`}
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
