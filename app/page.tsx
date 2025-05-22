import Image from "next/image";
import { getProductsWithPrimaryImages } from "@/app/actions/product-actions";
import ProductCarousel from "./components/ProductCarousel";
import ProductCarousel2 from "./components/ProductCarousel2";
import TestimonialsCarousel from "./components/TestimonialsCarousel";

export default async function Home() {
  // Fetch products with their primary images
  const products = await getProductsWithPrimaryImages();

  // Convert products to a format safe for client components
  const clientSafeProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));

  return (
    <div className="">
      {/* Hero Section - 2 Column Grid */}
      <section className="grid grid-cols-2 h-[120vh] gap-0.5">
        {/* Left Column */}
        <div className="relative bg-[#F8F5EE]">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="/1.jpg"
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column */}
        <div className="relative bg-[#F8F5EE]">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="/2.jpeg"
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Single Row Section */}
      <section className="h-[100vh] mt-0.5 relative bg-[#F8F5EE]">
        <div className="absolute inset-0 bg-black/5" />
        <img
          src="https://images.unsplash.com/photo-1564595076323-71cc27edacf8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury Watch"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Featured Products Grid */}
      <section className="grid grid-cols-5 gap-0.5 mt-0.5">
        {products.slice(0, 5).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col aspect-3/4"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.primaryImageUrl && (
                <img
                  src={product.primaryImageUrl}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
            </div>
            <div className="px-8 pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Showcase Section */}
      <section className="pt-20 mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">Our Showcase</h2>

        <div className="grid grid-cols-2">
          <div className="h-[120vh] bg-gray-100 flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/14569229/pexels-photo-14569229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-26">
            <div className="flex items-center justify-between ml-16 mr-16">
              <h1 className="text-2xl uppercase">Exclusives</h1>
              <button className="group relative flex h-12 w-12 items-center justify-between rounded-full cursor-pointer scale-130">
                <div className="relative h-9 w-9 overflow-hidden bg-black rounded-full mr-1">
                  <div className="absolute top-[0.8em] left-[-0.0em] grid gap-0.1 place-content-center transition-all w-full h-full duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-white"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1 -translate-x-4 fill-white"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-8">
              <ProductCarousel products={clientSafeProducts.slice(0, 4)} />
            </div>
            <div className="pl-16 mt-8">
              <p className="uppercase text-xs text-gray-500 leading-6">
                Lorem ipsum dolor sit amet consectetur <br />
                adipisicing elit. Quisquam,
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="mt-32">
            <div className="flex items-center justify-between ml-16 mr-16">
              <h1 className="text-2xl uppercase">New Arrivals</h1>
              <button className="group relative flex h-12 w-12 items-center justify-between rounded-full cursor-pointer scale-130">
                <div className="relative h-9 w-9 overflow-hidden bg-black rounded-full mr-1">
                  <div className="absolute top-[0.8em] left-[-0.0em] grid gap-0.1 place-content-center transition-all w-full h-full duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-white"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mb-1 -translate-x-4 fill-white"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-8">
              <ProductCarousel2 products={clientSafeProducts.slice(0, 4)} />
            </div>
            <div className="pl-16 mt-8">
              <p className="uppercase text-xs text-gray-500 leading-6">
                Lorem ipsum dolor sit amet consectetur <br />
                adipisicing elit. Quisquam,
              </p>
            </div>
          </div>
          <div className="h-[120vh] w-full bg-gray-100 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">Our Brands</h2>
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
      <section className="pt-10 pb-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">
          What Our Clients Say
        </h2>
        <TestimonialsCarousel />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-8 mt-0 relative">
        <div
          className="h-[80vh] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/28697832/pexels-photo-28697832/free-photo-of-elegant-display-of-luxury-watches-in-retail-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        ></div>
        <div
          className="w-11/12 max-w-[500px] sm:w-[500px] absolute right-10 top-[calc(theme(spacing.20)+80vh)] 
                -translate-y-1/2 
               bg-[#232323] rounded-none shadow-xl p-10 flex flex-col items-center text-center text-white z-10"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-36">
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
            <div></div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-t border-gray-200 pt-8">
            <div className="mb-8 md:mb-0">
              <span className="font-bold text-lg text-gray-900">Luxe</span>
              <p className="text-xs text-gray-500 mt-2">
                Curated Luxury Timepieces
                <br />
                Exceptional Watches for Discerning Collectors
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
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
      </footer>
    </div>
  );
}
