"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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
  {
    title: "Beauty Trends",
    image: "/blog/blog-4.jpg",
  },
  {
    title: "Spa Treatment",
    image: "/blog/blog-5.jpg",
  },
];

export default function Blog() {
  return (
    <section className="py-24 bg-[#f7f3f1]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <p className="text-[#c48a6a] uppercase text-sm mb-3">
          Blog
        </p>

        <div className="flex justify-between items-start mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-[#2f2f2f] max-w-3xl">
            Effortlessly Stylish Attire For The Fashionista
          </h2>

          <div className="flex gap-4">
            <button className="blog-prev w-14 h-14 rounded-full border border-[#c48a6a] text-[#c48a6a] hover:bg-[#c48a6a] hover:text-white transition">
              ←
            </button>

            <button className="blog-next w-14 h-14 rounded-full border border-[#c48a6a] text-[#c48a6a] hover:bg-[#c48a6a] hover:text-white transition">
              →
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          speed={800}
          navigation={{
            nextEl: ".blog-next",
            prevEl: ".blog-prev",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={500}
                  height={350}
                  className="w-full h-72 object-cover"
                />

                <div className="p-7">
                  <h3 className="text-2xl font-semibold text-[#2f2f2f] mb-4">
                    {post.title}
                  </h3>

                  <div className="text-sm text-gray-500 border-b pb-4 mb-4">
                    March 28, 2023 • Robert Palmer • 2132 Views
                  </div>

                  <p className="text-gray-600 leading-7">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}