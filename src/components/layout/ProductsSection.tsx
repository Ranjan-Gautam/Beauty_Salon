"use client";

import { products } from "@/data/products";
import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiEye,
  FiHeart,
  FiBarChart2,
} from "react-icons/fi";

// Triple the list so there's always a full set on either side to wrap into
const loopedProducts = [...products, ...products, ...products];

export default function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureAndCenter = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const setWidth = container.scrollWidth / 3;
    setWidthRef.current = setWidth;
    container.scrollLeft = setWidth; // start inside the middle (real) set
  }, []);

  useEffect(() => {
    measureAndCenter();
    window.addEventListener("resize", measureAndCenter);
    return () => window.removeEventListener("resize", measureAndCenter);
  }, [measureAndCenter]);

  // Only correct position once scrolling has fully settled — never mid-animation —
  // so a smooth scrollBy from buttons / auto-scroll always plays out completely.
  const handleScroll = useCallback(() => {
    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);

    settleTimeoutRef.current = setTimeout(() => {
      const container = scrollRef.current;
      const setWidth = setWidthRef.current;
      if (!container || !setWidth) return;

      if (container.scrollLeft < setWidth - 5) {
        container.scrollLeft += setWidth; // drifted into clone before middle set
      } else if (container.scrollLeft > setWidth * 2 + 5) {
        container.scrollLeft -= setWidth; // drifted into clone after middle set
      }
    }, 300);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = container.clientWidth / 4 + 24;
    container.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const amount = container.clientWidth / 4 + 24;
      container.scrollBy({ left: amount, behavior: "smooth" });
    }, 4500); // change to 4000 or 5000 for exactly 4 or 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-312 mx-auto px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#c47c5a] font-semibold tracking-wide uppercase mb-3">
              Products
            </p>
            <h2 className="text-4xl font-serif text-[#4b4b4b] leading-snug max-w-md">
              Best Beauty And Grooming Products
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#c47c5a] text-[#c47c5a] flex items-center justify-center hover:bg-[#c47c5a] hover:text-white transition-colors"
            >
              <FiArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#c47c5a] text-[#c47c5a] flex items-center justify-center hover:bg-[#c47c5a] hover:text-white transition-colors"
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel — NOTE: "scroll-smooth" removed; smoothness now comes only from
            the explicit behavior:"smooth" in scrollBy, so the invisible loop-correction
            stays instant. */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ scrollbarWidth: "none" }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {loopedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="group relative shrink-0 snap-start"
              style={{ width: "calc((100% - 72px) / 4)" }}
            >
              {/* Image area */}
              <div className="relative bg-[#f9f3f0] aspect-square overflow-hidden">
                {product.badge && (
                  <span className="absolute top-4 left-0 bg-[#c47c5a] text-white text-xs font-medium px-3 py-1">
                    {product.badge}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium px-3 py-1">
                    Sale
                  </span>
                )}

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 scale-125 transition-transform duration-300 group-hover:scale-130"
                />

                {/* Hover icons */}
                <div className="absolute right-4 top-14 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#4b4b4b] hover:bg-[#c47c5a] hover:text-white transition-colors">
                    <FiEye size={15} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#4b4b4b] hover:bg-[#c47c5a] hover:text-white transition-colors">
                    <FiHeart size={15} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#4b4b4b] hover:bg-[#c47c5a] hover:text-white transition-colors">
                    <FiBarChart2 size={15} />
                  </button>
                </div>

                {/* Add to cart overlay */}
                <button className="absolute bottom-0 left-0 right-0 bg-[#c47c5a] text-white py-3 font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Add to cart
                </button>
              </div>

              {/* Info */}
              <div className="text-center pt-5">
                <h3 className="text-lg font-serif text-[#2c1810] mb-1">
                  {product.name}
                </h3>
                <p className="text-[#c47c5a] font-medium">
                  {product.oldPrice && (
                    <span className="text-[#a8a8a8] line-through mr-2">
                      ${product.oldPrice}.00
                    </span>
                  )}
                  ${product.price}.00
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
