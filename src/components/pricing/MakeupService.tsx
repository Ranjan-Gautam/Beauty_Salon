import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function MakeupService() {
  return (
    <section className="bg-[#ede1dd] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -left-4 top-6 w-full h-full border border-[#e7d5cc] -rotate-3"></div>

            <Image
              src="/pricing/makeup-service.jpg"
              alt="Makeup Service"
              width={700}
              height={500}
              className="relative z-10 w-full h-64 sm:h-80 lg:h-112.5 object-cover"
            />
          </div>

          <div className="text-center lg:text-left">
            <p className="text-[#c48a6a] uppercase text-sm font-medium mb-4">
              Hello There
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif text-[#2f2f2f] leading-tight mb-6">
              Get The Look You Want With Our Makeup Services
            </h2>

            <p className="text-gray-600 leading-7 md:leading-8 mb-10">
              Every service starts with listening to what you actually want. Our
              makeup artists blend technique with attention to detail so you
              leave looking like the best version of yourself — never overdone,
              always camera-ready.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-6 md:gap-8">
              <button className="bg-[#c48a6a] text-white px-8 py-4 hover:bg-[#b67b5b] transition duration-300 w-full sm:w-auto">
                Book Now
              </button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Phone className="text-[#c48a6a]" size={24} />
                </div>

                <div className="text-left">
                  <p className="text-[#c48a6a] text-sm">Have any question</p>

                  <p className="text-xl md:text-2xl font-semibold text-[#2f2f2f]">
                    +977 9801234567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
