const leftPricing = [
  {
    service: "Foot Massage",
    price: "$49",
  },
  {
    service: "Pedicure",
    price: "$39",
  },
  {
    service: "Menicure",
    price: "$25",
  },
  {
    service: "Nail Polish",
    price: "$15",
  },
  {
    service: "Body Scrub",
    price: "$60",
  },
];

const rightPricing = [
  {
    service: "Body Massage",
    price: "$75",
  },
  {
    service: "Oil Therapy",
    price: "$80",
  },
  {
    service: "Hair & Beauty",
    price: "$60",
  },
  {
    service: "Face Treatment",
    price: "$85",
  },
  {
    service: "Face Mask",
    price: "$55",
  },
];

export default function PriceMenu() {
  return (
    <section className="py-24 bg-[#f7f3f1]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#c48a6a] uppercase text-sm font-medium mb-3">
            Price Menu
          </p>

          <h2 className="text-4xl md:text-6xl font-serif text-[#2f2f2f] max-w-4xl mx-auto leading-tight">
            Customized Beauty Services To Fit Your Needs And Budget
          </h2>
        </div>

        {/* Price Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftPricing.map((item) => (
              <div
                key={item.service}
                className="bg-[#efe9e6] p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-serif text-[#2f2f2f]">
                    {item.service}
                  </h3>

                  <span className="text-3xl text-[#c48a6a]">
                    {item.price}
                  </span>
                </div>

                <p className="text-gray-600">
                  Suspendisse potenti in neque molestie et mentum libero.
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightPricing.map((item) => (
              <div
                key={item.service}
                className="bg-[#efe9e6] p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-serif text-[#2f2f2f]">
                    {item.service}
                  </h3>

                  <span className="text-3xl text-[#c48a6a]">
                    {item.price}
                  </span>
                </div>

                <p className="text-gray-600">
                  Suspendisse potenti in neque molestie et mentum libero.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}