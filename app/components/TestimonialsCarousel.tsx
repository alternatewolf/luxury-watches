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
    text: "Luxurious Watches had the exact watch I was looking for – no other dealer had it at that price.",
  },
  {
    image: "/testimonials/rolex2.png",
    name: "Alexander Chen",
    role: "Financial Analyst",
    text: "I found a watch I'd been searching for a long time through my trusted dealer.",
  },
  {
    image: "/testimonials/rolex3.png",
    name: "Sophia Martinez",
    role: "Corporate Lawyer",
    text: "Not even Rolex could sell me the watch I wanted – I had to wait 3 years on their list, but found it here.",
  },
  {
    image: "/testimonials/patek.png",
    name: "Sarah Chen",
    role: "Investment Banker",
    text: "The service was exceptional – they found me a rare piece that I thought was impossible to get.",
  },
  {
    image: "/testimonials/patek2.png",
    name: "Robert Anderson",
    role: "Art Collector",
    text: "Amazing customer service and authentic pieces. They made the entire buying process seamless.",
  },
  {
    image: "/testimonials/omega.png",
    name: "Michael Rodriguez",
    role: "Professional Athlete",
    text: "Fast delivery and excellent communication throughout. Highly recommend this dealer.",
  },
  {
    image: "/testimonials/omega2.png",
    name: "Emma Thompson",
    role: "Marine Biologist",
    text: "They had the best price for the watch I wanted and delivered exactly as promised.",
  },
  {
    image: "/testimonials/ap.png",
    name: "David Kim",
    role: "Art Gallery Curator",
    text: "Professional service and genuine watches. They helped me find my dream timepiece.",
  },
  {
    image: "/testimonials/panerai.png",
    name: "Isabella Rossi",
    role: "Marine Biologist",
    text: "Trustworthy dealer with competitive prices. They made buying my first luxury watch a great experience.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <>
      {/* Desktop Carousel */}
      <div className="hidden md:block">
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
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 4000,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="w-full h-[500px]"
          initialSlide={0}
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="px-4">
              <div className="w-full h-full bg-[#F8F5EE] rounded-lg flex flex-col items-center overflow-hidden">
                <div className="relative w-full h-[350px]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col items-center gap-3 flex-1 justify-center">
                  <h3 className="text-lg font-semibold text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
