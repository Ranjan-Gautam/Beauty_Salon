export default function PricingBanner() {
  return (
    <section className="relative bg-[#f3e5e0] h-64 md:h-125 flex items-center overflow-hidden">
      <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 text-3xl md:text-5xl text-gray-500">
        ✧
      </div>

      <div className="absolute -bottom-44 -right-44">
        <div className="w-125 h-125 rounded-full border-80 border-[#eadfd8] opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-[#2e2e2e] mb-6">
            Pricing
          </h1>
        </div>
      </div>
    </section>
  );
}
