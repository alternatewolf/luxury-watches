"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Initialize SwiperCore with all required modules
SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

const testimonials = [
  {
    image: "/testimonials/rolex.png",
    name: "James Wilson",
    role: "CEO, Tech Innovations",
    text: "The craftsmanship of my Rolex is simply unparalleled. Every detail speaks of excellence and heritage.",
  },
  {
    image: "/testimonials/rolex2.png",
    name: "Alexander Chen",
    role: "Financial Analyst",
    text: "My Rolex has been a symbol of success and precision in my professional journey.",
  },
  {
    image: "/testimonials/rolex3.png",
    name: "Sophia Martinez",
    role: "Corporate Lawyer",
    text: "The timeless elegance of my Rolex perfectly complements my professional attire.",
  },
  {
    image: "/testimonials/patek.png",
    name: "Sarah Chen",
    role: "Investment Banker",
    text: "My Patek Philippe is more than a timepiece; it's a legacy I'm proud to pass down to future generations.",
  },
  {
    image: "/testimonials/patek2.png",
    name: "Robert Anderson",
    role: "Art Collector",
    text: "The intricate details of my Patek Philippe make it a true work of art.",
  },
  {
    image: "/testimonials/omega.png",
    name: "Michael Rodriguez",
    role: "Professional Athlete",
    text: "The precision and reliability of my Omega has been my trusted companion through countless competitions.",
  },
  {
    image: "/testimonials/omega2.png",
    name: "Emma Thompson",
    role: "Marine Biologist",
    text: "My Omega's water resistance and durability make it perfect for my underwater research.",
  },
  {
    image: "/testimonials/ap.png",
    name: "David Kim",
    role: "Art Gallery Curator",
    text: "The Audemars Piguet's design is a perfect blend of art and engineering. It's a masterpiece on my wrist.",
  },
  {
    image: "/testimonials/panerai.png",
    name: "Isabella Rossi",
    role: "Marine Biologist",
    text: "My Panerai's durability and water resistance make it the perfect companion for my underwater expeditions.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 3000,
      }}
      //   pagination={true}
      loop={true}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="w-[350px] h-[600px]"
      initialSlide={0}
      watchSlidesProgress={true}
      observer={true}
      observeParents={true}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index} className="w-[350px] h-[550px]">
          <div className="w-full h-full bg-[#F8F5EE] flex flex-col items-center">
            <div className="relative w-full h-[500px] mb-4">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col items-center gap-4">
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600 italic mb-6 text-center">
                {testimonial.text}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
