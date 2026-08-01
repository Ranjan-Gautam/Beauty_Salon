"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
const slides = [
  {
    title: "Refreshing Your\nBeauty Senses",
    description:
      "We provides always our best services for our clients and always try to achieve our client's trust and satisfaction.",
    button: "Get Started",
    image: "/heroSection1.png",
  },
  {
    title: "Make Your Skin\nShine & Glowing",
    description:
      "We provides always our best services for our clients and always try to achieve our client's trust and satisfaction.",
    button: "Book Now",
    image: "/heroSection2.png",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-200 bg-[#f9f3f0] overflow-hidden">
      {/* Background floral SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M450 300 C400 200 300 150 250 50"
          stroke="#c47c5a"
          strokeWidth="0.8"
        />
        <path
          d="M450 300 C500 200 600 150 650 50"
          stroke="#c47c5a"
          strokeWidth="0.8"
        />
        <path
          d="M450 300 C350 300 250 250 150 300"
          stroke="#c47c5a"
          strokeWidth="0.8"
        />
        <path
          d="M450 300 C550 300 650 250 750 300"
          stroke="#c47c5a"
          strokeWidth="0.8"
        />
        <path
          d="M450 300 C400 400 300 450 250 550"
          stroke="#c47c5a"
          strokeWidth="0.8"
        />
        <path
          d="M450 300 C500 400 600 450 650 550"
          stroke="#c47c5a"
          strokeWidth="0.8"
        />
        <path
          d="M450 300 C420 220 380 180 340 100"
          stroke="#c47c5a"
          strokeWidth="0.6"
        />
        <path
          d="M450 300 C480 220 520 180 560 100"
          stroke="#c47c5a"
          strokeWidth="0.6"
        />
        <path
          d="M450 300 C370 320 310 360 260 420"
          stroke="#c47c5a"
          strokeWidth="0.6"
        />
        <path
          d="M450 300 C530 320 590 360 640 420"
          stroke="#c47c5a"
          strokeWidth="0.6"
        />
        <ellipse
          cx="380"
          cy="180"
          rx="30"
          ry="50"
          stroke="#c47c5a"
          strokeWidth="0.7"
          transform="rotate(-20 380 180)"
        />
        <ellipse
          cx="520"
          cy="180"
          rx="30"
          ry="50"
          stroke="#c47c5a"
          strokeWidth="0.7"
          transform="rotate(20 520 180)"
        />
        <ellipse
          cx="300"
          cy="320"
          rx="30"
          ry="50"
          stroke="#c47c5a"
          strokeWidth="0.7"
          transform="rotate(-60 300 320)"
        />
        <ellipse
          cx="600"
          cy="320"
          rx="30"
          ry="50"
          stroke="#c47c5a"
          strokeWidth="0.7"
          transform="rotate(60 600 320)"
        />
        <ellipse
          cx="380"
          cy="420"
          rx="30"
          ry="50"
          stroke="#c47c5a"
          strokeWidth="0.7"
          transform="rotate(20 380 420)"
        />
        <ellipse
          cx="520"
          cy="420"
          rx="30"
          ry="50"
          stroke="#c47c5a"
          strokeWidth="0.7"
          transform="rotate(-20 520 420)"
        />
        <circle cx="450" cy="300" r="4" fill="#c47c5a" opacity="0.4" />
        {/* sparkle top right */}
        <path
          d="M720 80 L723 90 L733 93 L723 96 L720 106 L717 96 L707 93 L717 90 Z"
          stroke="#c47c5a"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
      <div className="absolute -bottom-32 -right-10 w-137.5 h-37.5 bg-[#f9f3f0] rounded-full pointer-events-none" />
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Left Content */}
          <div className="w-full md:w-1/2 px-6 md:px-20 z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[#2c1810] leading-tight mb-6 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-[#7a6a62] text-base mb-8 max-w-md">
              {slide.description}
            </p>
            <Link
              href="/appointment"
              className="bg-[#c47c5a] text-white px-6 py-3 rounded no-underline hover:bg-[#a86444] transition-colors"
            >
              {slide.button}
            </Link>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-1/2 h-full relative bg-[#f9f3f0]">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="50vw"
              className="object-contain object-[center_50%] scale-100 origin-bottom translate-y-6"
              style={{
                maskImage:
                  "radial-gradient(ellipse 65% 65% at center, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 65% 65% at center, black 55%, transparent 100%)",
              }}
            />
          </div>

          <button
            onClick={() => setShowVideo(true)}
            className="hidden md:flex absolute right-[52%] bottom-80 z-20 w-24 h-24 bg-[#c47c5a] rounded-full items-center justify-center hover:bg-[#a8644a] transition-colors"
          >
            <IoPlayCircleOutline size={48} className="text-white" />
          </button>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === current ? "bg-[#c47c5a]" : "bg-[#d4b8ae]"
            }`}
          />
        ))}
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-[90vw] max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/-FnrCZJw6TE?si=1L1DGBpY3hd10xvL"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white text-xl hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
