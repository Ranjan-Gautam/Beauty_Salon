import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[400px] md:h-[480px] flex items-center overflow-hidden bg-[#f9f3f0]">
      {/* Background image */}
      <Image
        src="/about/herosection.jpg"
        alt="Spa and beauty care"
        fill
        priority
        className="object-cover object-right"
      />

      {/* Content */}
      <div className="max-w-[1250px] mx-auto px-6 relative z-10 w-full">
        <span className="text-[#c47c5a] font-semibold tracking-wide text-sm uppercase mb-3 block">
          Get To Know Us
        </span>

        <h1 className="text-4xl md:text-5xl font-serif text-[#2c1810] leading-tight mb-4 max-w-lg">
          Where Beauty Meets{" "}
          <span className="text-[#c47c5a] italic">Confidence</span>
        </h1>

        <p className="text-[#2c1810]/70 max-w-md">
          A space built around care, craft, and making every visit feel like
          your own kind of self-care ritual.
        </p>
      </div>
    </section>
  );
}
