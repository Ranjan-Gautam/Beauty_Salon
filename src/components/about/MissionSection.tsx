"use client";

import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import {
  IoPersonOutline,
  IoStarOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import { MdOutlineSpa } from "react-icons/md";

const stats = [
  {
    id: 1,
    icon: IoPersonOutline,
    value: 7,
    suffix: "K+",
    label: "Happy Customer",
  },
  {
    id: 2,
    icon: IoStarOutline,
    value: 6,
    suffix: "K+",
    label: "Positive Rating",
  },
  { id: 3, icon: MdOutlineSpa, value: 50, suffix: "", label: "Beautician" },
  { id: 4, icon: IoTrophyOutline, value: 30, suffix: "", label: "Won Awards" },
];

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, ref);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0">
        <Icon size={32} className="text-[#c47c5a]" />
      </div>
      <div>
        <p className="text-3xl font-serif text-[#2c1810]">
          {count}
          {suffix}
        </p>
        <p className="text-[#2c1810]/70 text-sm mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function MissionSection() {
  return (
    <section className="bg-[#f9f3f0] py-20">
      <div className="max-w-[1250px] mx-auto px-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {stats.map((stat) => (
            <StatItem key={stat.id} {...stat} />
          ))}
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2c1810] leading-tight mb-6">
              The Place That Leaves You Feeling Great
            </h2>
            <p className="text-[#2c1810]/70">
              Every visit is designed around you — from the moment you walk in
              to the moment you leave. We believe beauty care should feel
              personal, relaxing, and genuinely restorative, not rushed or
              routine.
            </p>
          </div>

          <div>
            <div className="pb-6 mb-6 border-b border-[#c47c5a]/20">
              <h3 className="text-2xl font-serif text-[#c47c5a] mb-3">
                Our Mission
              </h3>
              <p className="text-[#2c1810]/70">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-[#c47c5a] mb-3">
                Our Vision
              </h3>
              <p className="text-[#2c1810]/70">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
