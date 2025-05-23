import Image from "next/image";
import { getProductsWithPrimaryImages } from "@/app/actions/product-actions";
import ProductCarousel from "./components/ProductCarousel";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import Link from "next/link";
import MarketingSection from "./components/MarketingSection";
import ButtonHover14 from "./components/ButtonHover14";
import { Star, Truck, User } from "lucide-react";
import ButtonHover15 from "./components/ButtonHover15";

export default async function Home() {
  // Fetch products with their primary images
  const products = await getProductsWithPrimaryImages();

  // Convert products to a format safe for client components
  const clientSafeProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));

  return (
    <div className="flex flex-col gap-1">
      {/* Hero Section */}
      <div className="h-[120vh] bg-gray-300 relative">
        <video
          src="/demo.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Centered Text Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6">
              TIMELESS ELEGANCE
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90 leading-relaxed max-w-2xl mx-auto">
              Discover the world's most coveted luxury timepieces. Each watch
              tells a story of precision, heritage, and uncompromising
              craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="">
        <h2 className="text-2xl md:text-2xl font-light text-center py-8">
          Latest Arrivals
        </h2>
        <div className="">
          <ProductCarousel products={clientSafeProducts} />
        </div>
        <div className="flex justify-center mt-8">
          <ButtonHover14 />
        </div>
      </div>

      {/* Featured Collections Section */}
      <section className="py-10 mt-10 bg-[#F8F5EE]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden aspect-[3/4]">
              <Image
                src="/images/photo_1_2025-05-22_19-27-23.png"
                alt="Classic Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-xl font-light mb-2">
                    Classic Collection
                  </h3>
                  <p className="text-sm opacity-90">
                    Timeless elegance in every detail
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden aspect-[3/4]">
              <Image
                src="/images/photo_2_2025-05-22_19-27-23.png"
                alt="Sport Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-xl font-light mb-2">Sport Collection</h3>
                  <p className="text-sm opacity-90">
                    Precision meets performance
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden aspect-[3/4]">
              <Image
                src="/images/photo_3_2025-05-22_19-27-23.png"
                alt="Limited Edition"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-xl font-light mb-2">Limited Edition</h3>
                  <p className="text-sm opacity-90">
                    Exclusive pieces for collectors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusives Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left Side */}
          <div className="flex flex-col items-start justify-center h-full order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-light mb-4 md:mb-6 tracking-tight text-gray-900">
              Exclusives
            </h2>
            <p className="text-gray-600 mb-6 md:mb-10 max-w-lg font-extralight leading-relaxed text-sm md:text-md">
              Experience the rarest timepieces curated for true connoisseurs.
              Our exclusives collection features only the most coveted,
              limited-edition watches—each a masterpiece of design and
              craftsmanship.
            </p>
            <ButtonHover14 />
          </div>
          {/* Right Side: Bento Grid */}
          <div className="w-full grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 h-[300px] md:h-[420px] order-1 md:order-2">
            {/* Tall left image */}
            <div className="row-span-2 rounded-lg md:rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/images/photo_7_2025-05-22_19-27-23.png"
                alt="Exclusive Watch 1"
                fill
                className="object-cover"
              />
            </div>
            {/* Top right image */}
            <div className="rounded-lg md:rounded-2xl overflow-hidden shadow-md relative">
              <Image
                src="/images/photo_8_2025-05-22_19-27-23.png"
                alt="Exclusive Watch 2"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom right image */}
            <div className="rounded-lg md:rounded-2xl overflow-hidden shadow-md relative">
              <Image
                src="/images/photo_6_2025-05-22_19-27-23.png"
                alt="Exclusive Watch 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-16 bg-[#F8F5EE]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-20 md:mb-28 tracking-wide">
            Featured Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 justify-items-center">
            {/* Rolex */}
            <Link
              href="/shop?brand=cmawb7z070002rcc4rxq214jz"
              className="flex flex-col items-center cursor-pointer w-full"
            >
              <div className="bg-[#232323] rounded-lg md:rounded-2xl w-full aspect-square flex flex-col items-center justify-end relative group mb-8 md:mb-0">
                <Image
                  src="/watches/rolex.png"
                  alt="Rolex Watch"
                  width={120}
                  height={120}
                  className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-40 md:w-50 h-40 md:h-50 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex-1" />
                <div className="pb-6 md:pb-8 pt-20 md:pt-24 flex flex-col items-center w-full">
                  <span className="text-white text-base md:text-xl font-semibold tracking-wide transition-all duration-300 group-hover:underline">
                    ROLEX
                  </span>
                </div>
              </div>
            </Link>
            {/* Omega */}
            <Link
              href="/shop?brand=cmawcxgzm002brcc4nsxkgt2t"
              className="flex flex-col items-center cursor-pointer w-full"
            >
              <div className="bg-[#232323] rounded-lg md:rounded-2xl w-full aspect-square flex flex-col items-center justify-end relative group">
                <Image
                  src="/watches/omega.png"
                  alt="Omega Watch"
                  width={120}
                  height={120}
                  className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-40 md:w-50 h-40 md:h-50 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex-1" />
                <div className="pb-6 md:pb-8 pt-20 md:pt-24 flex flex-col items-center w-full">
                  <span className="text-white text-base md:text-xl font-semibold tracking-wide transition-all duration-300 group-hover:underline">
                    OMEGA
                  </span>
                </div>
              </div>
            </Link>
            {/* Cartier */}
            <Link
              href="/shop?brand=cmawdkwv30034rcc49zoi7uhn"
              className="flex flex-col items-center cursor-pointer w-full"
            >
              <div className="bg-[#232323] rounded-lg md:rounded-2xl w-full aspect-square flex flex-col items-center justify-end relative group">
                <Image
                  src="/watches/cartier.png"
                  alt="Cartier Watch"
                  width={120}
                  height={120}
                  className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-40 md:w-50 h-40 md:h-50 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex-1" />
                <div className="pb-6 md:pb-8 pt-20 md:pt-24 flex flex-col items-center w-full">
                  <span className="text-white text-base md:text-xl font-semibold tracking-wide transition-all duration-300 group-hover:underline">
                    CARTIER
                  </span>
                </div>
              </div>
            </Link>
            {/* Bvlgari */}
            <Link
              href="/shop?brand=cmaz3f8qv001urc4b5fw1ibhu"
              className="flex flex-col items-center cursor-pointer w-full"
            >
              <div className="bg-[#232323] rounded-lg md:rounded-2xl w-full aspect-square flex flex-col items-center justify-end relative group">
                <Image
                  src="/watches/bvlgari.png"
                  alt="Bvlgari Watch"
                  width={120}
                  height={120}
                  className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-40 md:w-50 h-40 md:h-50 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex-1" />
                <div className="pb-6 md:pb-8 pt-20 md:pt-24 flex flex-col items-center w-full">
                  <span className="text-white text-base md:text-xl font-semibold tracking-wide transition-all duration-300 group-hover:underline">
                    BVLGARI
                  </span>
                </div>
              </div>
            </Link>
            {/* Richard Mille - Hidden on Mobile */}
            <Link
              href="/shop?brand=cmaz2wicy0000rc4bgi9syncq"
              className="hidden md:flex flex-col items-center cursor-pointer w-full"
            >
              <div className="bg-[#232323] rounded-2xl w-full aspect-square flex flex-col items-center justify-end relative group">
                <Image
                  src="/watches/richard.png"
                  alt="Richard Mille Watch"
                  width={200}
                  height={200}
                  className="absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 w-40 md:w-50 h-40 md:h-50 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex-1" />
                <div className="pb-8 pt-24 flex flex-col items-center w-full">
                  <span className="text-white text-xl font-semibold tracking-wide transition-all duration-300 group-hover:underline">
                    Richard Mille
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-center mt-12 md:mt-14">
            <ButtonHover15 />
          </div>
        </div>
      </section>

      {/* Feature Icons Section */}
      <section className="w-full pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-0 md:divide-x divide-gray-200">
          {/* Verified Originals */}
          <div className="flex-1 flex flex-col items-center px-8 text-center">
            <Star size={48} strokeWidth={1} className="mb-4 text-gray-500" />
            <h3 className="text-md font-light tracking-wide mb-2">
              VERIFIED ORIGINALS
            </h3>
            <p className="text-gray-500 font-normal text-sm">
              Our master watchmaker thoroughly checks all watches for
              authenticity and functionality.
            </p>
          </div>
          {/* Worldwide Shipping */}
          <div className="flex-1 flex flex-col items-center px-8 text-center">
            <Truck size={48} strokeWidth={1} className="mb-4 text-gray-500" />
            <h3 className="text-md font-light tracking-wide mb-2">
              WORLDWIDE SHIPPING
            </h3>
            <p className="text-gray-500 font-normal text-sm">
              Secure, express delivery to your door—across Europe, the USA,
              Asia, and beyond.
            </p>
          </div>
          {/* Dedicated Support */}
          <div className="flex-1 flex flex-col items-center px-8 text-center">
            <User size={48} strokeWidth={1} className="mb-4 text-gray-500" />
            <h3 className="text-md font-light tracking-wide mb-2">
              DEDICATED SUPPORT
            </h3>
            <p className="text-gray-500 font-normal text-sm">
              We are available on WhatsApp to ensure a fast and seamless buying
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-10 md:py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-8 md:mb-12">
          Our Brands
        </h2>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll">
            <li>
              <Image
                src="/logos/rolex.png"
                alt="Rolex"
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/panerai.png"
                alt="Panerai"
                width={120}
                height={14}
                className="h-4 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/omega.png"
                alt="Omega"
                width={120}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/iwc.png"
                alt="IWC"
                width={120}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/cartier.png"
                alt="Cartier"
                width={120}
                height={68}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/bvlgari.png"
                alt="Bvlgari"
                width={120}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/Patek_Philippe_SA_logo.svg.png"
                alt="Patek Philippe"
                width={120}
                height={66}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/Jaeger-LeCoultre.png"
                alt="Jaeger-LeCoultre"
                width={120}
                height={68}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/Audemars_Piguet_logo.png"
                alt="Audemars Piguet"
                width={120}
                height={33}
                className="h-12 w-auto object-contain"
              />
            </li>
          </ul>
          <ul
            className="flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
          >
            <li>
              <Image
                src="/logos/rolex.png"
                alt="Rolex"
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/panerai.png"
                alt="Panerai"
                width={120}
                height={14}
                className="h-4 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/omega.png"
                alt="Omega"
                width={120}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/iwc.png"
                alt="IWC"
                width={120}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/cartier.png"
                alt="Cartier"
                width={120}
                height={68}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/bvlgari.png"
                alt="Bvlgari"
                width={120}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/Patek_Philippe_SA_logo.svg.png"
                alt="Patek Philippe"
                width={120}
                height={66}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/Jaeger-LeCoultre.png"
                alt="Jaeger-LeCoultre"
                width={120}
                height={68}
                className="h-12 w-auto object-contain"
              />
            </li>
            <li>
              <Image
                src="/logos/Audemars_Piguet_logo.png"
                alt="Audemars Piguet"
                width={120}
                height={33}
                className="h-12 w-auto object-contain"
              />
            </li>
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pt-6 md:pt-10 pb-10 md:pb-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-8 md:mb-12">
          What Our Clients Say
        </h2>
        <TestimonialsCarousel />
      </section>

      {/* Watch Stories Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
            Watch Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative aspect-[1/1] md:aspect-[4/3] overflow-hidden">
              <Image
                src="/images/photo_4_2025-05-22_19-27-23.png"
                alt="The Art of Watchmaking"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-light mb-4">
                    The Art of Watchmaking
                  </h3>
                  <p className="text-sm opacity-90 mb-6">
                    Discover the intricate craftsmanship behind every luxury
                    timepiece
                  </p>
                  <button className="text-sm border-b border-white pb-1 hover:opacity-80 transition-opacity">
                    Read More
                  </button>
                </div>
              </div>
            </div>
            <div className="relative aspect-[1/1] md:aspect-[4/3] overflow-hidden">
              <Image
                src="/images/photo_5_2025-05-22_19-27-23.png"
                alt="Investment Value"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-2xl font-light mb-4">Investment Value</h3>
                  <p className="text-sm opacity-90 mb-6">
                    Understanding the long-term value of luxury timepieces
                  </p>
                  <button className="text-sm border-b border-white pb-1 hover:opacity-80 transition-opacity">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-10 md:pt-10 pb-8 mt-0 relative">
        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div
            className="h-[80vh] bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/28697832/pexels-photo-28697832/free-photo-of-elegant-display-of-luxury-watches-in-retail-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            }}
          ></div>
          <div
            className="w-11/12 max-w-[500px] sm:w-[500px] absolute right-10 
                  top-[calc(theme(spacing.20)+80vh)]
                  -translate-y-1/2 
                 bg-[#232323] rounded-none shadow-xl p-10 flex flex-col items-center text-center text-white z-10"
          >
            <h2 className="text-4xl font-light mb-4 tracking-wide">
              PLACE YOUR
              <br />
              ORDER TODAY
            </h2>
            <p className="mb-8 text-gray-300 text-sm">
              To order your dream watch, whatsapp us at
            </p>
            <h1 className="text-3xl font-light mb-4 tracking-wide">
              +1 1111-2222-3333
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <button
                type="submit"
                className="flex items-center justify-center h-25 w-25 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors ml-2"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M6 16L16 6M16 6H7M16 6V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p>Click to Chat</p>
            </div>
            <hr className="w-full border-gray-700 mb-4 mt-6" />
            <p className="text-xs text-gray-400">
              Our customer service is available 24/7.
            </p>
          </div>
          <div className="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-12 mb-36">
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Follow Us
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Contact Us
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a href="mailto:abc@gmail.com" className="hover:underline">
                      abc@gmail.com
                    </a>
                  </li>
                  <li>1111-2222-3333</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-row items-end justify-between border-t border-gray-200 pt-8">
              <div className="mb-0">
                <span className="font-bold text-lg text-gray-900">Luxe</span>
                <p className="text-xs text-gray-500 mt-2">
                  Curated Luxury Timepieces
                  <br />
                  Exceptional Watches for Discerning Collectors
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-4 text-xs text-gray-400">
                  <a href="#" className="hover:underline">
                    Disclaimer
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  © 2025 Luxe, All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="block md:hidden">
          <div
            className="h-[40vh] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/28697832/pexels-photo-28697832/free-photo-of-elegant-display-of-luxury-watches-in-retail-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            }}
          ></div>

          {/* Contact Section - Integrated */}
          <div className="bg-[#232323] mx-4 -mt-30 relative z-10 rounded-lg shadow-xl p-6 flex flex-col items-center text-center text-white mb-12">
            <h2 className="text-xl font-light mb-4 tracking-wide">
              PLACE YOUR
              <br />
              ORDER TODAY
            </h2>
            <p className="mb-6 text-gray-300 text-sm">
              To order your dream watch, whatsapp us at
            </p>
            <h1 className="text-xl font-light mb-4 tracking-wide">
              +1 1111-2222-3333
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <button
                type="submit"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M6 16L16 6M16 6H7M16 6V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="text-sm">Click to Chat</p>
            </div>
            <hr className="w-full border-gray-700 mb-4 mt-6" />
            <p className="text-xs text-gray-400">
              Our customer service is available 24/7.
            </p>
          </div>

          {/* Footer Links */}
          <div className="px-4">
            <div className="grid grid-cols-1 gap-8 mb-12">
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Follow Us
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Contact Us
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a href="mailto:abc@gmail.com" className="hover:underline">
                      abc@gmail.com
                    </a>
                  </li>
                  <li>1111-2222-3333</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <div className="mb-8">
                <span className="font-bold text-lg text-gray-900">Luxe</span>
                <p className="text-xs text-gray-500 mt-2">
                  Curated Luxury Timepieces
                  <br />
                  Exceptional Watches for Discerning Collectors
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 text-xs text-gray-400">
                  <a href="#" className="hover:underline">
                    Disclaimer
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  © 2025 Luxe, All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
