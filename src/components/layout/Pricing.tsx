const pricing = [
  { service: "Foot Massage", price: "$49" },
  { service: "Pedicure", price: "$39" },
  { service: "Menicure", price: "$25" },
  { service: "Nail Polish", price: "$15" },
  { service: "Body Scrub", price: "$60" },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-[#c48a6a] uppercase text-sm">
          The Best Pricing
        </p>

        <h2 className="text-center text-5xl font-bold mb-12">
          Pricing That Suits Your Needs
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {pricing.map((item) => (
            <div
              key={item.service}
              className="flex justify-between bg-[#f7f3f1] p-5"
            >
              <span>{item.service}</span>
              <span className="text-[#c48a6a] font-semibold">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}