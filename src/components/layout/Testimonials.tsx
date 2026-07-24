const testimonials = [
  {
    name: "Andrea Smith",
    review:
      "Lorem ipsum dolor sit amet adipisicing elit sed do eiusmod tempor.",
  },
  {
    name: "Leona Becker",
    review:
      "Lorem ipsum dolor sit amet adipisicing elit sed do eiusmod tempor.",
  },
  {
    name: "Della Carter",
    review:
      "Lorem ipsum dolor sit amet adipisicing elit sed do eiusmod tempor.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f7f3f1] py-24">
      <div className="container mx-auto px-4">
        <p className="text-[#c48a6a] uppercase text-sm">Testimonials</p>

        <h2 className="text-5xl font-bold mb-12">
          Here's What Our Satisfied Clients Are Saying
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-white p-8 text-center">
              <div className="text-[#c48a6a] mb-4">★★★★★</div>

              <p>{item.review}</p>

              <h4 className="font-semibold mt-6">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}