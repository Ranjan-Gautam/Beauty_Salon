import Image from "next/image";

const services = [
  {
    title: "Pedicure",
    image: "/services/pedicure.jpg",
    description:
      "Complete foot care with exfoliation, shaping, and a lasting polish.",
  },
  {
    title: "Manicure",
    image: "/services/manicure.jpg",
    description:
      "Hand and nail care that leaves your fingertips neat and refined.",
  },
  {
    title: "Nail Polish",
    image: "/services/nail-polish.jpg",
    description:
      "A precise, fresh coat of color applied in the shade you choose.",
  },
  {
    title: "Body Massage",
    image: "/services/body-massage.jpg",
    description: "A full-body massage that eases tension and restores balance.",
  },
  {
    title: "Oil Therapy",
    image: "/services/oil-therapy.jpg",
    description:
      "Warm oil therapy that nourishes skin and relaxes tired muscles.",
  },
  {
    title: "Hair & Beauty",
    image: "/services/hair-beauty.jpg",
    description:
      "Styling and care tailored to your hair type and personal goals.",
  },
  {
    title: "Face Treatment",
    image: "/services/face-treatment.jpg",
    description:
      "A deep facial treatment that cleanses, hydrates, and revives skin.",
  },
  {
    title: "Body Scrub",
    image: "/services/body-scrub.jpg",
    description:
      "A full-body exfoliation that softens skin and renews your glow.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[#f7f3f1] p-6 md:p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative w-32 h-32 md:w-44 md:h-44 mx-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="rounded-full object-cover"
                />

                <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-[#c48a6a] rounded-full border-4 border-[#f7f3f1]" />
              </div>

              <h3 className="text-xl md:text-2xl font-serif text-[#2f2f2f] mt-6 md:mt-8 mb-3 md:mb-4">
                {service.title}
              </h3>

              <p className="text-gray-500 leading-7 md:leading-8 text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
