import Image from "next/image";

const services = [
  {
    title: "Pedicure",
    image: "/services/pedicure.jpg",
  },
  {
    title: "Manicure",
    image: "/services/manicure.jpg",
  },
  {
    title: "Nail Polish",
    image: "/services/nail-polish.jpg",
  },
  {
    title: "Body Massage",
    image: "/services/body-massage.jpg",
  },
  {
    title: "Oil Therapy",
    image: "/services/oil-therapy.jpg",
  },
  {
    title: "Hair & Beauty",
    image: "/services/hair-beauty.jpg",
  },
  {
    title: "Face Treatment",
    image: "/services/face-treatment.jpg",
  },
  {
    title: "Body Scrub",
    image: "/services/body-scrub.jpg",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[#f7f3f1] p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
          
              <div className="relative w-44 h-44 mx-auto">
                <Image
                src={service.image}
                alt={service.title}
                fill
                className="rounded-full object-cover"/>

                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#c48a6a] rounded-full border-4 border-[#f7f3f1]" />
              </div>

              <h3 className="text-2xl font-serif text-[#2f2f2f] mt-8 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-500 leading-8">
                Suspendisse potenti euismod inne molestie enim libero.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
