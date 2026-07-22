import Image from "next/image";
import Link from "next/link";
import { FaHandSparkles } from "react-icons/fa";

const services = [
  {
    title: "Pedicure",
    description:
      "Suspendisse potenti euismod libero in neque molestie et mentum libero maximus.",
    image: "/service-pedicure.jpg",
  },
  {
    title: "Manicure",
    description:
      "Suspendisse potenti euismod libero in neque molestie et mentum libero maximus.",
    image: "/service-manicure.jpg",
  },
  {
    title: "Nail Polish",
    description:
      "Suspendisse potenti euismod libero in neque molestie et mentum libero maximus.",
    image: "/service-nailpolish.jpg",
  },
];

export default function Services() {
  return (
    <section className="relative w-full bg-[#f9f3f0] py-24 px-10 text-center overflow-hidden">
      <Image
        src="/services-bg.png"
        alt=""
        fill
        className="absolute inset-0 object-cover opacity-40 pointer-events-none"
      />
      <div className="relative z-10">
        <p className="text-[#c47c5a] font-semibold tracking-wide mb-3">
          EXPLORE OUR SERVICES
        </p>
        <h2 className="text-4xl font-serif text-[#2c1810] leading-tight mb-16 max-w-2xl mx-auto">
          Everything Is Beautiful, And You Just Have To Feel It
        </h2>

        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-8 flex flex-col items-center"
            >
              <div className="relative w-44 h-44 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-14 h-14 bg-[#c47c5a] rounded-full flex items-center justify-center">
                  <FaHandSparkles size={20} className="text-white" />
                </div>
              </div>

              <h3 className="text-xl font-serif text-[#2c1810] mb-3">
                {service.title}
              </h3>
              <p className="text-[#7a6a62] text-sm mb-5">
                {service.description}
              </p>
              <Link
                href="#"
                className="text-[#c47c5a] text-sm font-medium hover:underline"
              >
                Read More ▶
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-16 text-[#2c1810]">
          Do Something To Be More Stylish.{" "}
          <Link href="#" className="text-[#c47c5a] underline">
            Check Out More Services →
          </Link>
        </p>
      </div>
    </section>
  );
}
