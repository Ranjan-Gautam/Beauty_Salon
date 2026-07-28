"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoCheckmarkCircleOutline, IoPlayCircleOutline } from "react-icons/io5";

const skills = [
  { label: "Facials", percent: 90 },
  { label: "Cosmetology", percent: 96 },
  { label: "Body Relax", percent: 88 },
];

const checklist = [
  "Wide Variety Style",
  "Exquisite Results",
  "Unique Style",
  "Professional Team",
];

function SkillBar({ label, percent }: { label: string; percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <p className="text-[#2c1810] font-medium mb-2 text-lg">{label}</p>
      <div className="w-full h-4 bg-[#f0e2da] rounded-full overflow-hidden relative">
        <div
          className="h-full bg-[#c47c5a] rounded-full flex items-center justify-end pr-2 transition-all duration-[1500ms] ease-out"
          style={{ width: inView ? `${percent}%` : "0%" }}
        >
          <span className="text-sm text-white font-medium">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default function CommitmentSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left image */}
        <div className="relative w-full aspect-[4/3.6] rounded-lg overflow-hidden">
          <Image
            src="/about/facial-treatment.jpg"
            alt="Facial treatment session"
            fill
            className="object-cover"
          />
        </div>

        {/* Right content */}
        <div>
          <span className="text-[#c47c5a] font-semibold tracking-wide text-sm uppercase">
            Best Skin Care
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#2c1810] mt-3 mb-4 leading-tight">
            Our Commitment To Beauty, Quality Service, Exceptional Results
          </h2>
          <p className="text-[#2c1810]/70 mb-6">
            Every treatment we offer is rooted in genuine care, skilled hands,
            and premium products. From your first visit to your fiftieth, our
            promise stays the same: you leave feeling like the best version of
            yourself.
          </p>

          <p className="text-[#c47c5a] font-medium mb-8">
            We offer a variety of facial services to suit your individual skin
            care needs
          </p>

          {/* Skill bars */}
          <div className="space-y-6 mb-10">
            {skills.map((skill) => (
              <SkillBar key={skill.label} {...skill} />
            ))}
          </div>

          {/* Video + checklist */}
          <div className="flex items-center gap-10">
            <button
              onClick={() => setShowVideo(true)}
              className="relative w-40 h-32 rounded-lg overflow-hidden shrink-0 group"
            >
              <Image
                src="/about/salon-video-thumb.jpg"
                alt="Salon video preview"
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 bg-[#2c1810]/30 flex items-center justify-center">
                <IoPlayCircleOutline
                  size={42}
                  className="text-white group-hover:scale-110 transition-transform"
                />
              </span>
            </button>

            <ul className="space-y-3">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[#2c1810]/80 text-base"
                >
                  <IoCheckmarkCircleOutline
                    size={20}
                    className="text-[#c47c5a] shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-200 aspect-video"
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
