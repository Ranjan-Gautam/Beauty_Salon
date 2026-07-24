import Image from "next/image";

const members = [
  {
    name: "Janis Beahan",
    role: "Beautician",
    image: "/team/team-1.jpg",
  },
  {
    name: "Leticia Douglas",
    role: "Beautician",
    image: "/team/team-2.jpg",
  },
  {
    name: "Rebecca Moore",
    role: "Beautician",
    image: "/tseam/team-3.jpg",
  },
  {
    name: "Tiffany Carroll",
    role: "Beautician",
    image: "/team/team-4.jpg",
  },
];

export default function Team() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-center text-[#c48a6a] uppercase text-sm">
          Meet Our Professionals
        </p>

        <h2 className="text-center text-5xl font-bold mt-3 mb-12">
          Beautician With Many Years Of Experience
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.name} className="text-center">
                alt={member.name}
                width={220}
                height={220}
                className="rounded-full mx-auto"

              <h3 className="mt-6 font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}