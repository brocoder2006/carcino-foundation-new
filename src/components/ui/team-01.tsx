"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  mask: string;
  color: string;
  description?: string;
  imagePosition?: string;
  imageScale?: number;
  transformOrigin?: string;
};

export const teamData: TeamMember[] = [
  {
    name: "Rajannya Das",
    role: "Founder & CEO",
    image: "/ceo.jpeg",
    mask: "/masks/shape-2.png", // Figure-8 organic squircle (Tile 1)
    color: "#3B22F2",
    imagePosition: "object-top",
  },
  {
    name: "Soushree Chakraborty",
    role: "Chief Research Officer",
    image: "/cro.jpeg",
    mask: "/masks/shape-2.png", // Arch dome (Tile 2)
    color: "#F59458",
    imagePosition: "object-top",
  },
  {
    name: "Aayush Singh",
    role: "Chief Operating Officer",
    image: "/aayush_singh.jpeg",
    mask: "/masks/shape-2.png", // Oval / Egg (Tile 3)
    color: "#F2E066",
    imagePosition: "object-center",
    imageScale: 1.65,
    transformOrigin: "72% 67%",
  },
  {
    name: "Sambit Bhattacharjee",
    role: "Researcher",
    image: "/sambit_bhattacharjee.jpeg",
    mask: "/masks/shape-2.png", // 3-lobed cloud wave (Tile 4)
    color: "#1FB1F8",
    imagePosition: "object-top",
  },
  {
    name: "Shreya Anand",
    role: "PR Manager",
    image: "/pr.jpeg",
    mask: "/masks/shape-2.png", // 4-petal blossom / organic clover (Tile 5)
    color: "#EC4899",
    imagePosition: "object-[50%_25%]",
  },
  {
    name: "Sourav Panja",
    role: "Video Editor",
    image: "/sourav_panja.jpg",
    mask: "/masks/shape-2.png",
    color: "#39C69C",
    imagePosition: "object-top",
  },
  {
    name: "Poushali Ray",
    role: "Marketer",
    image: "/poushali_ray.jpg",
    mask: "/masks/shape-2.png",
    color: "#A855F7",
    imagePosition: "object-center",
  },
  {
    name: "Ariona Talukdar",
    role: "Marketer",
    image: "/ariona_talukdar.jpg",
    mask: "/masks/shape-2.png",
    color: "#F43F5E",
    imagePosition: "object-center",
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
