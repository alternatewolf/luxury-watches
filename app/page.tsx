import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover our collection of exceptional timepieces
          </p>
          <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-all">
            Shop Collection
          </button>
        </div>
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
