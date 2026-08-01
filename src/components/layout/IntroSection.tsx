"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { useRef } from "react";
export default function IntroSection() {
  const ratingRef = useRef<HTMLDivElement>(null);
  const customersRef = useRef<HTMLDivElement>(null);
  const ratingValue = useCountUp(4.8, ratingRef, 1800, 1);
  const customersValue = useCountUp(7, customersRef, 1800, 0);
  const { ref: sectionRef, isVisible } = useInView(0.2);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-14 md:py-20 px-6 md:px-10 flex flex-col md:flex-row items-center gap-10 md:gap-30 overflow-hidden"
    >
      {/* Circular image */}
      <div
        className={`relative w-64 h-64 md:w-125 md:h-125 shrink-0 md:ml-20 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24 "
        }`}
      >
        <div className="absolute -inset-6 rounded-full bg-[#f9f3f0]" />
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/skin-treatment.jpg"
            alt="Skincare treatment"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 text-center md:text-left transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"
        }`}
      >
        <p className="text-[#c47c5a] font-semibold tracking-wide mb-3">
          BEST SKIN CARE
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-[#2c1810] leading-tight mb-6">
          Our Responsibility Is To Make You Beautiful
        </h2>
        <p className="text-[#7a6a62] max-w-md mb-10 mx-auto md:mx-0">
          Skin has a memory. Ours helps it forget the bad days — gentle hands,
          honest products, real results.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 md:gap-16 mb-10">
          <div ref={ratingRef}>
            <p className="text-4xl font-serif text-[#2c1810]">{ratingValue}</p>
            <div className="flex gap-1 text-[#c47c5a] my-1 justify-center md:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={14} />
              ))}
            </div>
            <p className="text-xs text-[#7a6a62]">5000 RATINGS</p>
          </div>

          <div ref={customersRef}>
            <p className="text-4xl font-serif text-[#2c1810]">
              {customersValue}K
            </p>
            <p className="text-sm text-[#7a6a62] mt-1">Happy Customers</p>
          </div>

          <div className="flex -space-x-2 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              width={32}
              height={32}
              className="inline-block size-8 rounded-full ring-2 ring-white"
            />
            <Image
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              width={32}
              height={32}
              className="inline-block size-8 rounded-full ring-2 ring-white"
            />
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
              width={32}
              height={32}
              className="inline-block size-8 rounded-full ring-2 ring-white"
            />
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              width={32}
              height={32}
              className="inline-block size-8 rounded-full ring-2 ring-white"
            />
            <div className="size-8 rounded-full bg-[#c47c5a] text-white text-xs flex items-center justify-center ring-2 ring-white">
              20+
            </div>
          </div>
        </div>

        <button className="bg-[#c47c5a] text-white px-8 py-3 rounded font-medium hover:bg-[#a86444] transition-colors">
          More Details
        </button>
      </div>
    </section>
  );
}
