"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const posts = [
  {
    title: "5 Skincare Habits Worth Keeping",
    image: "/blog/blog-1.jpg",
    excerpt:
      "A closer look at skincare routines that actually fit real, busy lives.",
  },
  {
    title: "Why Consistency Beats Expensive Products",
    image: "/blog/blog-2.jpg",
    excerpt:
      "Why consistency matters more than expensive products in your beauty routine.",
  },
  {
    title: "Caring For Your Skin Through The Seasons",
    image: "/blog/blog-3.jpg",
    excerpt:
      "Seasonal changes call for seasonal care — here's what to adjust and when.",
  },
  {
    title: "Beauty Trends",
    image: "/blog/blog-4.jpg",
    excerpt:
      "The looks and techniques our stylists are seeing more of this year.",
  },
  {
    title: "Spa Treatment",
    image: "/blog/blog-5.jpg",
    excerpt: "What actually happens during a full spa session, step by step.",
  },
];

export default function Blog() {
  return (
    <section className="py-24 bg-[#f7f3f1]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <p className="text-[#c48a6a] uppercase text-sm mb-3">Blog</p>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#2f2f2f] max-w-3xl">
            Effortlessly Stylish Attire For The Fashionista
          </h2>

          <div className="flex gap-4 self-end md:self-auto shrink-0">
            <button className="blog-prev w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#c48a6a] text-[#c48a6a] hover:bg-[#c48a6a] hover:text-white transition">
              ←
            </button>

            <button className="blog-next w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#c48a6a] text-[#c48a6a] hover:bg-[#c48a6a] hover:text-white transition">
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
                  <h3 className="text-2xl font-semibold text-[#2f2f2f] mb-4 min-h-[64px]">
                    {post.title}
                  </h3>

                  <div className="text-sm text-gray-500 border-b pb-4 mb-4">
                    March 28, 2023 • Robert Palmer • 2132 Views
                  </div>

                  <p className="text-gray-600 leading-7">{post.excerpt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
