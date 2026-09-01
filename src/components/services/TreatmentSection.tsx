import Image from "next/image";
import { Clock3, Phone, Mail, MessageCircle } from "lucide-react";

export default function TreatmentSection() {
  return (
    <section className="bg-[#f8f7f5] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[500px_1fr] gap-10 lg:gap-20 items-center">
          {/* Images */}
          <div className="flex gap-8 justify-center lg:justify-start">
            <div className="relative w-full max-w-125 h-64 sm:h-96 lg:h-175 overflow-hidden">
              <Image
                src="/services/spa-1.jpg"
                alt="Spa Treatment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-8 text-center lg:text-left">
            <p className="text-[#c78d68] uppercase tracking-wide text-sm mb-4">
              CALL TO ACTION
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-gray-700 leading-tight mb-6">
              Best Treatments For Your Mind
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-7 md:leading-8 mb-10 md:mb-12">
              Every treatment we offer is designed to calm the mind as much as
              it cares for the body — a moment to slow down, breathe, and be
              looked after.
            </p>

            <div className="grid sm:grid-cols-2 gap-10 md:gap-12 mb-10 md:mb-12 text-left">
              {/* Opening Hours */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#c78d68] mb-4 md:mb-6">
                  Opening Hours
                </h3>

                <div className="space-y-4 md:space-y-5">
                  <div className="flex gap-3">
                    <Clock3 size={20} className="text-[#c78d68] shrink-0" />
                    <span className="text-black text-sm md:text-base">
                      Mon to Fri: 7:30 am - 1:30 pm
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Clock3 size={20} className="text-[#c78d68] shrink-0" />
                    <span className="text-black text-sm md:text-base">
                      Sat: 9:00 am - 1:30 pm
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Clock3 size={20} className="text-[#c78d68] shrink-0" />
                    <span className="text-black text-sm md:text-base">
                      Sun: 9:00 am - 11:30 pm
                    </span>
                  </div>
                </div>
              </div>

              {/* Reach Us */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#c78d68] mb-4 md:mb-6">
                  Reach Us
                </h3>

                <div className="space-y-4 md:space-y-5">
                  <div className="flex gap-3">
                    <Phone size={20} className="text-[#c78d68] shrink-0" />
                    <span className="text-black text-sm md:text-base">
                      +977 9766464003
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <MessageCircle
                      size={20}
                      className="text-[#c78d68] shrink-0"
                    />
                    <span className="text-black text-sm md:text-base">
                      +977 9861746859
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Mail size={20} className="text-[#c78d68] shrink-0" />
                    <span className="text-black text-sm md:text-base">
                      info@example.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full sm:w-auto bg-[#c78d68] text-white px-10 py-4 text-lg font-medium hover:bg-[#b77b55] transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
