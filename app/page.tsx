import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section - 2 Column Grid */}
      <section className="grid grid-cols-2 h-[120vh] gap-0.5">
        {/* Left Column */}
        <div className="relative bg-[#F8F5EE]">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://www.breda.com/cdn/shop/files/breda-jane-1741c-fall-3-2023-gold-metal-bracelet-watch-studio-01_e6ee2eb7-61b2-4c1b-b1ad-40501395366b_1440x.jpg?v=1696518796"
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column */}
        <div className="relative bg-[#F8F5EE]">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://www.breda.com/cdn/shop/files/breda-pulse-tandem-1747b-fall-3-2023-silver-metal-bracelet-watch-lifestyle-06_1440x.jpg?v=1707945649"
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Single Row Section */}
      <section className="h-[100vh] mt-0.5 relative bg-[#F8F5EE]">
        <div className="absolute inset-0 bg-black/5" />
        <img
          src="https://www.breda.com/cdn/shop/files/breda-jane-1741c-fall-3-2023-gold-metal-bracelet-watch-studio-01_e6ee2eb7-61b2-4c1b-b1ad-40501395366b_1440x.jpg?v=1696518796"
          alt="Luxury Watch"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
              </div>
              <h3 className="text-xl font-light mb-2">Collection Name</h3>
              <p className="text-gray-600">Starting from $5,000</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <div className="aspect-square bg-gray-200 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
                </div>
                <h3 className="text-lg font-light mb-2">Watch Model</h3>
                <p className="text-gray-600">$8,500</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">Our Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-[3/2] bg-gray-100 flex items-center justify-center"
            >
              <span className="text-gray-400">Brand Logo</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">Join Our Newsletter</h2>
          <p className="mb-8 text-gray-400">
            Subscribe to receive updates on new collections and exclusive offers
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-transparent border border-white/20 focus:border-white/40 outline-none"
            />
            <button className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
