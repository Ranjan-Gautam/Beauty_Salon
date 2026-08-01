/// <reference types="react" />

import Image from "next/image";

const blogs = [
  {
    title: "Beauty Tips For Healthy Skin",
    category: "News",
    comments: "No Comment",
    views: "212 Views",
    image: "/blog/blog-1.jpg",
    date: "28",
    month: "MAR",
    description: "Discover essential skincare tips and routines.",
  },
  {
    title: "Latest Hair Styling Trends",
    category: "Articles",
    comments: "No Comment",
    views: "365 Views",
    image: "/blog/blog-2.jpg",
    date: "7",
    month: "FEB",
    description: "Explore the latest styling trends and techniques.",
  },
  {
    title: "Choosing The Right Makeup",
    category: "News",
    comments: "No Comment",
    views: "379 Views",
    image: "/blog/blog-3.jpg",
    date: "10",
    month: "MAY",
    description: "Learn how to choose the right makeup products.",
  },
  {
    title: "Professional Salon Experience",
    category: "News",
    comments: "No Comment",
    views: "383 Views",
    image: "/blog/blog-4.jpg",
    date: "17",
    month: "JAN",
    description: "Experience luxury treatments and expert care.",
  },
  {
    title: "Modern Beauty Studio Design",
    category: "News",
    comments: "No Comment",
    views: "351 Views",
    image: "/blog/blog-5.jpg",
    date: "9",
    month: "OCT",
    description: "A look into contemporary beauty interiors.",
  },
  {
    title: "Hair Care Essentials",
    category: "News",
    comments: "1 Comment",
    views: "304 Views",
    image: "/blog/blog-6.jpg",
    date: "15",
    month: "JUL",
    description: "Keep your hair healthy with these simple tips.",
  },
];

export default function BlogGrid() {
  return (
    <section className="bg-[#f7f3f1] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.title}
              className="bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={350}
                  className="w-full h-56 md:h-64 object-cover"
                />

                <div className="absolute bottom-0 right-4 md:right-6 bg-[#c48a6a] text-white text-center px-2.5 md:px-3 py-1.5 md:py-2">
                  <div className="text-lg md:text-xl font-semibold">
                    {blog.date}
                  </div>

                  <div className="text-xs">{blog.month}</div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                  <span>{blog.category}</span>
                  <span>{blog.comments}</span>
                  <span>{blog.views}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-[#2f2f2f] mb-4">
                  {blog.title}
                </h3>

                <p className="text-gray-600 leading-7 md:leading-8">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
