const leftPricing = [
  {
    service: "Foot Massage",
    price: "$49",
    description:
      "A relaxing reflexology session that relieves tension and refreshes tired feet.",
  },
  {
    service: "Pedicure",
    price: "$39",
    description:
      "Complete foot care with exfoliation, shaping, and a long-lasting polish.",
  },
  {
    service: "Manicure",
    price: "$25",
    description:
      "Hand and nail care that leaves your fingertips neat and polished.",
  },
  {
    service: "Nail Polish",
    price: "$15",
    description:
      "A fresh, precise coat of color applied in the shade you love.",
  },
  {
    service: "Body Scrub",
    price: "$60",
    description:
      "A full-body exfoliation treatment that softens and renews your skin.",
  },
];

const rightPricing = [
  {
    service: "Body Massage",
    price: "$75",
    description:
      "A full-body massage designed to release tension and restore balance.",
  },
  {
    service: "Oil Therapy",
    price: "$80",
    description:
      "Warm oil therapy that nourishes skin and eases muscle stiffness.",
  },
  {
    service: "Hair & Beauty",
    price: "$60",
    description:
      "A styling and care session tailored to your hair type and goals.",
  },
  {
    service: "Face Treatment",
    price: "$85",
    description:
      "A deep facial treatment that cleanses, hydrates, and revitalizes skin.",
  },
  {
    service: "Face Mask",
    price: "$55",
    description:
      "A calming mask session that leaves your complexion refreshed and glowing.",
  },
];

export default function PriceMenu() {
  return (
    <section className="py-16 md:py-24 bg-[#f7f3f1]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-[#c48a6a] uppercase text-sm font-medium mb-3">
            Price Menu
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif text-[#2f2f2f] max-w-4xl mx-auto leading-tight">
            Customized Beauty Services To Fit Your Needs And Budget
          </h2>
        </div>

        {/* Price Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftPricing.map((item) => (
              <div
                key={item.service}
                className="bg-[#efe9e6] p-5 md:p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-center gap-3 mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-[#2f2f2f]">
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

          {/* Right Column */}
          <div className="space-y-4">
            {rightPricing.map((item) => (
              <div
                key={item.service}
                className="bg-[#efe9e6] p-5 md:p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-center gap-3 mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-[#2f2f2f]">
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
