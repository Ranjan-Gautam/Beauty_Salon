import Image from "next/image";

const posts = [
  {
    title: "Temporibus autem quibus",
    image: "/blog/blog-1.jpg",
  },
  {
    title: "Nemo enim ipsam voluptas",
    image: "/blog/blog-2.jpg",
  },
  {
    title: "Neque porro quisquam amet",
    image: "/blog/blog-3.jpg",
  },
];

export default function Blog() {
  return (
    <section className="py-24 bg-[#f7f3f1]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12">
          Effortlessly Stylish Attire For The Fashionista
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.title} className="bg-white">
             <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover"    
                />
              <div className="p-6">
                <h3 className="font-semibold">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}