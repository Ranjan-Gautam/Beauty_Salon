export default function ContactBanner() {
  return (
    <section className="relative bg-[#f7f3f1] h-56 md:h-[350px] overflow-hidden">
      {/* Top Icon */}
      <div className="absolute top-6 md:top-4 left-1/2 -translate-x-1/2 text-gray-500 text-3xl md:text-5xl">
        ✧
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1f1f1f] mb-4">
            Contact
          </h1>
        </div>
      </div>

      {/* Bottom Right Decorative Shape */}
      <div className="absolute -bottom-24 -right-32 w-[450px] h-[220px] bg-[#eadfd8] rounded-t-full opacity-80"></div>
    </section>
  );
}
