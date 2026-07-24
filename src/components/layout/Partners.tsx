import Image from "next/image";

const logos = [
  "/brands/1.png",
  "/brands/2.png",
  "/brands/3.png",
  "/brands/4.png",
  "/brands/5.png",
  "/brands/6.png",
];

export default function Partners() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
          {logos.map((item, index) => (
            <div key={index} className="flex justify-center">
              <Image src={item} alt={`Logo ${index + 1}`} width={100} height={100} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}