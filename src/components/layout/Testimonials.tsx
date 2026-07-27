import Image from "next/image";

const testimonials = [
  {
    name: "Andrea Smith",
    review:
      "Lorem ipsum dolor sit amet adipisicing elit sed do eiusmod tempor.",
      image: "/testimonials/client-1.jpg",
  },
  {
    name: "Leona Becker",
    review:
      "Lorem ipsum dolor sit amet adipisicing elit sed do eiusmod tempor.",
      image: "/testimonials/client-2.jpg",
  },
  {
    name: "Della Carter",
    review:
      "Lorem ipsum dolor sit amet adipisicing elit sed do eiusmod tempor.",
      image: "/testimonials/client-3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f7f3f1] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[#c48a6a] uppercase text-sm font-medium mb-3">Testimonials</p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 max-w-2xl leading-tight">
          Here's What Our Satisfied Clients Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-white p-10 text-center shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer">
              <p className="text-gray-600 leading-8 mb-8"> {item.review} </p>
              <div className="text-[#c48a6a] text-xl mb-6">★★★★★</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{item.name}</h3>
              <div className="flex justify-center mt-6">
                <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-full object-cover"
                style={{
                  width: "100px",
                  height: "100px",
                }}
                />
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}