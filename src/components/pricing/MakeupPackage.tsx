const packages = [
  {
    name: "Bridal Package",
    price: "Rs. 15,000",
    features: [
      "Bridal Makeup",
      "Hairstyling",
      "Saree Draping",
      "Pre-Bridal Facial",
    ],
  },
  {
    name: "Engagement Package",
    price: "Rs. 8,000",
    features: [
      "Party Makeup",
      "Hair Styling",
      "Nail Polish",
      "Skin Consultation",
    ],
  },
  {
    name: "Party Makeup Package",
    price: "Rs. 3,500",
    features: [
      "Party Makeup",
      "Hair Styling",
      "Eyebrow Threading",
      "Basic Touch-Up",
    ],
  },
];

export default function MakeupPackage() {
  return (
    <section className="bg-[#f7f3f1] py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#c48a6a] uppercase text-sm font-medium mb-3">
            Bridal & Event Packages
          </p>

          <h2 className="text-4xl md:text-6xl font-serif text-[#2f2f2f]">
            Choose The Perfect Package For Your Special Day
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((item) => (
            <div
              key={item.name}
              className="bg-white p-8 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-3xl font-serif text-[#2f2f2f] mb-4">
                {item.name}
              </h3>

              <div className="mb-8">
                <span className="text-5xl text-[#c48a6a]">
                  {item.price}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <span className="text-[#c48a6a]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full border border-[#c48a6a] text-[#c48a6a] py-3 hover:bg-[#c48a6a] hover:text-white transition">
                Book Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}