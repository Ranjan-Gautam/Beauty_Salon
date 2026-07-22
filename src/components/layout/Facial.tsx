"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function Facial() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <section className="relative w-full h-[550px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/Facial.jpg"
        alt="Beauty treatment"
        fill
        priority
        className="object-cover object-[center_20%]"
      />

      {/* Color overlay */}
      <div className="absolute inset-0 bg-[#2c1810]/40" />

      {/* Floral SVG background pattern */}
      <svg
        className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 20c20 0 30 20 30 40s-10 40-30 60c-20-20-30-40-30-60s10-40 30-40z"
          fill="#fff"
        />
      </svg>

      {/* Play button */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <button
          onClick={openVideo}
          className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-[#c47c5a] transition-colors"
          aria-label="Play video"
        >
          <FaPlay size={24} />
        </button>
      </div>

      {/* Video modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white text-2xl"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/-FnrCZJw6TE?si=q5aLlfbPimFzu_1b"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
