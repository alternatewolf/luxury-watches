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
            src="https://media.fastdl.app/get?__sig=2CDNO8OEVLK2uv6sElOlBA&__expires=1747770325&uri=https%3A%2F%2Finstagram.fphl1-1.fna.fbcdn.net%2Fv%2Ft51.2885-15%2F499552837_18508368010027120_8679493673769328971_n.jpg%3Fstp%3Ddst-jpg_e15_fr_p1080x1080_tt6%26_nc_ht%3Dinstagram.fphl1-1.fna.fbcdn.net%26_nc_cat%3D104%26_nc_oc%3DQ6cZ2QFGsBWf20wpM6g1dLA7gbTOqioCgo1ekvIwYXorBl0BuQSPqCh87M9GKfDQp7Vd3VuSLoYjEK60rwgBDdrZOCQW%26_nc_ohc%3DK5n13pmEf9oQ7kNvwFVE5vB%26_nc_gid%3DBUzzBUZAjsmP_vr1GsTCBQ%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfJFktd-yFVcwEzJkrXR60OX5F168IBGnq9qbsCspVCOwg%26oe%3D68329A6E%26_nc_sid%3Dd885a2&filename=499552837_18508368010027120_8679493673769328971_n.jpg"
            alt="Luxury Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column */}
        <div className="relative bg-[#F8F5EE]">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://media.fastdl.app/get?__sig=c5Lu-sZv6UOynDJZIlUXXg&__expires=1747769932&uri=https%3A%2F%2Finstagram.fphl1-1.fna.fbcdn.net%2Fv%2Ft51.2885-15%2F491438518_18522501988049800_4642885160736309726_n.jpg%3Fstp%3Ddst-jpg_e15_tt6%26_nc_ht%3Dinstagram.fphl1-1.fna.fbcdn.net%26_nc_cat%3D104%26_nc_oc%3DQ6cZ2QG_cmmgS0hT4FIGSLWgRC9f4DJw4l3GQ7GBZmpJl3TqNpH7r9PLidxencFmZ2DhEoM3Eghv2VynpiKuLGGkpyh3%26_nc_ohc%3DscT2v_cjTREQ7kNvwEJF0in%26_nc_gid%3DP80FMnFVYI3WiuJcQeO_zQ%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfJgF57jJFUEAG4IEYLr4p_LQiAEQcwn09kdr_Sx9SXgMw%26oe%3D6832A8F6%26_nc_sid%3Dd885a2&filename=491438518_18522501988049800_4642885160736309726_n.jpg"
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
