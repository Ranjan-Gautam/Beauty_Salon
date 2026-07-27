import Image from "next/image";

const logos = [
  "/brands/astaberry.jpg",
  "/brands/garnier.jpg",
  "/brands/lakme.jpg",
  "/brands/loreal.jpg",
  "/brands/mamaearth.jpg",
  "/brands/maybelline.jpg",
  "/brands/nivea.jpg",
  "/brands/silkhair.jpg",
];

export default function Partners() {
  return (
    <section className="py-12 bg-[#f7f3f1]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#323232] mb-4">
          Beauty Brands We Use
        </h2>
        <p className="text-center text-gray-600 mb-12">
          We proudly work with trusted beauty and skincare brands to deliver the
          best experience for our clients.
        </p>
        <div className="flex fl3x-wrap justify-center items-center gap-14">
          {logos.map((item, index) => (
            <div
              key={index}
              className="relative w-40 h-20 hover:scale-105 transition duration-300"
            >
              <Image
                src={item}
                alt={`Logo ${index + 1}`}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
