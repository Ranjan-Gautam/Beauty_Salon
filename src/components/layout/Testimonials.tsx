"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Joshep lamal",
    rating: 5,
    review:
      "Every visit feels personal. They actually remember what I like and adjust the treatment accordingly.",
    avatar: "/testimonials/client-1.jpg",
  },
  {
    id: 2,
    name: "Nishu Gautam",
    rating: 5,
    review:
      "The team here genuinely cares about how you feel, not just how you look. Best salon experience I've had.",
    avatar: "/testimonials/client-2.jpg",
  },
  {
    id: 3,
    name: "Pritam Sharma",
    rating: 4,
    review:
      "Booked a facial on a whim and walked out glowing. Clean space, friendly staff, will absolutely be back.",
    avatar: "/testimonials/client-3.jpg",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const active = testimonials[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#f9f3f0] py-24 overflow-hidden">
      <div className="max-w-[1250px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left image with decorative accent */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-[#c47c5a]/15 -z-10" />
          <div className="relative w-full aspect-[4/4.2] rounded-2xl overflow-hidden">
            <Image
              src="/testimonials/salon-service.jpg"
              alt="Salon service in progress"
              fill
              className="object-cover"
            />
          </div>

          {/* Floating quote badge */}
          <div className="absolute -right-6 bottom-10 w-20 h-20 rounded-full bg-[#c47c5a] flex items-center justify-center shadow-lg">
            <FaQuoteRight size={26} className="text-white" />
          </div>
        </div>

        {/* Right content */}
        <div>
          <span className="text-[#c47c5a] font-semibold tracking-wide text-sm uppercase">
            Testimonial &amp; Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2c1810] mt-3 mb-5 leading-tight">
            Our Customer Feedback
          </h2>
          <p className="text-[#2c1810]/70 mb-10 max-w-md">
            Real experiences from real clients — here&apos;s what people love
            most about visiting us.
          </p>

          {/* Testimonial card */}
          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className={
                    i < active.rating ? "text-[#c47c5a]" : "text-[#e0cfc8]"
                  }
                />
              ))}
            </div>

            <p className="text-[#2c1810] text-lg leading-relaxed mb-8 min-h-[80px] transition-opacity duration-300">
              &ldquo;{active.review}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-serif text-[#2c1810]">{active.name}</p>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-6 bg-[#c47c5a]"
                        : "w-2.5 bg-[#d4b8ae] hover:bg-[#c47c5a]/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
