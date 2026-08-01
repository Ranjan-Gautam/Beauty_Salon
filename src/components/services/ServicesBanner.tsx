import Image from "next/image";

export default function ServicesBanner() {
  return (
    <section className="relative h-64 md:h-125 flex items-center overflow-hidden">
      <Image
        src="/banner/servicebanner.jpg"
        alt="Services Banner"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-black mb-6">
            Services
          </h1>
        </div>
      </div>
    </section>
  );
}
