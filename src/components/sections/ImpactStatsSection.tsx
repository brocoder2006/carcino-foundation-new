"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ImpactStatsSection.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImpactStatsSectionProps {
  isLightMode?: boolean;
}

interface StatItem {
  targetValue: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    targetValue: 15000,
    suffix: "+",
    label: "Screened",
    description:
      "Individuals supported with free early cancer screening and diagnostic literacy.",
  },
  {
    targetValue: 120,
    suffix: "+",
    label: "Villages",
    description:
      "Rural communities empowered with active oncology care pathways and medical outreach.",
  },
  {
    targetValue: 25000,
    suffix: "+",
    label: "Lives Guided",
    description:
      "Patients, caregivers, and pet families supported through practical oncology care journeys.",
  },
  {
    targetValue: 98,
    suffix: "%",
    label: "Timely Care",
    description:
      "Participants connected to timely clinical consultations, trials, and specialist follow-ups.",
  },
];

function Marker({ children }: { children: React.ReactNode }) {
  return (
    <div className="impact-marker">
      <span className="impact-marker-dot" />
      <span>{children}</span>
    </div>
  );
}

export default function ImpactStatsSection({
  isLightMode = false,
}: ImpactStatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const numRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const el = numRefs.current[index];
        const card = cardRefs.current[index];
        if (!el || !card) return;

        const counter = { val: 0 };

        gsap.fromTo(
          counter,
          { val: 0 },
          {
            val: stat.targetValue,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "center 45%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
            onUpdate: () => {
              const currentVal = Math.round(counter.val);
              el.innerText = `${currentVal.toLocaleString()}${stat.suffix}`;
            },
          }
        );
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(refreshTimer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="impact" id="impact-section" ref={sectionRef}>
      <Marker>Measured Through The Work</Marker>

      <div className="impact-heading">
        <h2>
          Real World <span>Impact</span>
        </h2>

        <p>
          Closing cancer care gaps through community screening, rural oncology
          infrastructure, and compassionate patient advocacy.
        </p>
      </div>

      <div className="impact-circles">
        {stats.map((stat, index) => (
          <article
            className="impact-circle"
            key={stat.label}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <span
              ref={(element) => {
                numRefs.current[index] = element;
              }}
            >
              0{stat.suffix}
            </span>
            <h3>{stat.label}</h3>
            <p>{stat.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

