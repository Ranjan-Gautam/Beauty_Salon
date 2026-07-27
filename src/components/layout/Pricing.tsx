import Image from "next/image";

const pricing = [
  {
    service: "Foot Massage",
    price: "$49",
    description:
      "Suspendisse potenti in neque molestie et mentum libero.",
  },
  {
    service: "Pedicure",
    price: "$39",
    description:
      "Suspendisse potenti in neque molestie et mentum libero.",
  },
  {
    service: "Menicure",
    price: "$25",
    description:
      "Suspendisse potenti in neque molestie et mentum libero.",
  },
  {
    service: "Nail Polish",
    price: "$15",
    description:
      "Suspendisse potenti in neque molestie et mentum libero.",
  },
  {
    service: "Body Scrub",
    price: "$60",
    description:
      "Suspendisse potenti in neque molestie et mentum libero.",
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-center text-[#c48a6a] uppercase text-sm font-medium">
          The Best Pricing
        </p>

        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#323232] mt-3 mb-16">
          Pricing That Suites Your Needs
        </h2>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <Image
            src="/pricing-img.jpg"
              alt="Pricing"
              width={550}
              height={550}
              className="object-cover"/>
          </div>

          {/* Right Pricing Cards */}
          <div className="space-y-4">
            {pricing.map((item) => (
              <div
                key={item.service}
                className="
                  bg-[#f7f3f1]
                  p-6
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:-translate-y-1
                  cursor-pointer
                "
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-3xl font-medium text-[#3b3b3b]">
                    {item.service}
                  </h3>

                  <span className="text-3xl text-[#c48a6a]">
                    {item.price}
                  </span>
                </div>

                <p className="text-gray-600">
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