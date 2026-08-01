import Image from "next/image";

const pricing = [
  {
    service: "Foot Massage",
    price: "$49",
    description:
      "A soothing reflexology session that eases tension and leaves your feet feeling renewed.",
  },
  {
    service: "Pedicure",
    price: "$39",
    description:
      "Complete foot care with exfoliation, shaping, and a polish that lasts.",
  },
  {
    service: "Manicure",
    price: "$25",
    description:
      "Hand and nail care designed to leave you polished, neat, and camera-ready.",
  },
  {
    service: "Nail Polish",
    price: "$15",
    description:
      "A fresh coat in the shade of your choice, applied with precision.",
  },
  {
    service: "Body Scrub",
    price: "$60",
    description:
      "A full-body exfoliation that softens skin and washes away the week.",
  },
];

export default function Pricing() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-center text-[#c48a6a] uppercase text-sm font-medium">
          The Best Pricing
        </p>

        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#323232] mt-3 mb-10 md:mb-16">
          Pricing That Suites Your Needs
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <Image
              src="/pricing-img.jpg"
              alt="Pricing"
              width={550}
              height={550}
              className="object-cover w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[550px] h-auto"
            />
          </div>

          {/* Right Pricing Cards */}
          <div className="space-y-4">
            {pricing.map((item) => (
              <div
                key={item.service}
                className="
                  bg-[#f7f3f1]
                  p-5
                  md:p-6
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:-translate-y-1
                  cursor-pointer
                "
              >
                <div className="flex justify-between items-center gap-3 mb-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#3b3b3b]">
                    {item.service}
                  </h3>

                  <span className="text-xl sm:text-2xl md:text-3xl text-[#c48a6a] shrink-0">
                    {item.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
