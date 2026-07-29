import Link from "next/link";
import Image from "next/image";

export default function AppointmentHero() {
  return (
    <section className="relative bg-[#f9f3f0] overflow-hidden">
      <div className="max-w-[1250px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <span className="text-[#c47c5a] font-semibold tracking-wide text-sm uppercase mb-3 block">
            Book A Consultation
          </span>

          <h1 className="text-4xl md:text-5xl font-serif text-[#2c1810] leading-tight mb-6">
            Your Skin Deserves A{" "}
            <span className="text-[#c47c5a] italic">Personalized</span> Plan
          </h1>

          <p className="text-[#2c1810]/70 max-w-md mb-8">
            Every treatment starts with understanding your skin. Book a
            one-on-one consultation with our specialists and get a care plan
            built entirely around you.
          </p>
        </div>

        {/* Right image */}
        <div className="relative w-full aspect-[4/3.2] rounded-lg overflow-hidden">
          <Image
            src="/appointment/AppointmentHero.jpg"
            alt="Skin consultation session"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
