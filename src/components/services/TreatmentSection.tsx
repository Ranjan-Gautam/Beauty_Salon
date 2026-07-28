import Image from "next/image";
import { Clock3, Phone, Mail, MessageCircle } from "lucide-react";

export default function TreatmentSection() {
  return (
    <section className="bg-[#f8f7f5] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[500px_1fr] gap-20 items-center">
          {/* Images */}
          <div className="flex gap-8">
            <div className="relative w-full max-w-125 h-175 overflow-hidden">
              <Image
                src="/services/spa-1.jpg"
                alt="Spa Treatment"
                fill
                className="object-cover"
                priority
              />
            </div>
            
          </div>

          <div className="space-y-8">
            <p className="text-[#c78d68] uppercase tracking-wide text-sm mb-4">
              CALL TO ACTION
            </p>

            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-700 leading-tight mb-6">
              Best Treatments For Your Mind
            </h2>

            <p className="text-gray-600 text-lg leading-8 mb-12">
              Semper risus in hendrerit gravida rutrum quisque non tellus
              scelerisque varius morbi enim nunc faucibus a pellentesque sit
              amet.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Opening Hours */}
              <div>
                <h3 className="text-3xl font-semibold text-[#c78d68] mb-6">
                  Opening Hours
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <Clock3 size={20} className="text-[#c78d68]" />
                    <span className="text-black">Mon to Fri: 7:30 am - 1:30 pm</span>
                  </div>

                  <div className="flex gap-3">
                    <Clock3 size={20} className="text-[#c78d68]" />
                    <span className="text-black">Sat: 9:00 am - 1:30 pm</span>
                  </div>

                  <div className="flex gap-3">
                    <Clock3 size={20} className="text-[#c78d68]" />
                    <span className="text-black">Sun: 9:00 am - 11:30 pm</span>
                  </div>
                </div>
              </div>

              {/* Reach Us */}
              <div>
                <h3 className="text-3xl font-semibold text-[#c78d68] mb-6">
                  Reach Us
                </h3>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <Phone size={20} className="text-[#c78d68]" />
                    <span className="text-black">+1 234 789 4545</span>
                  </div>

                  <div className="flex gap-3">
                    <MessageCircle size={20} className="text-[#c78d68]" />
                    <span className="text-black">+1 909 850 2266</span>
                  </div>

                  <div className="flex gap-3">
                    <Mail size={20} className="text-[#c78d68]" />
                    <span className="text-black">info@example.com</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-[#c78d68] text-white px-10 py-4 text-lg font-medium hover:bg-[#b77b55] transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}