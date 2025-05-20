import Image from "next/image";

export default function ShopPage() {
  // Placeholder data for watches
  const watches = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Luxury Watch ${i + 1}`,
    price: 5000 + i * 1000,
    brand: ["Rolex", "Omega", "Patek Philippe", "Audemars Piguet"][i % 4],
    image: "/placeholder-watch.jpg",
  }));

  // Split watches into sections for different grid layouts
  const firstSectionWatches = watches.slice(0, 4);
  const secondSectionWatches = watches.slice(4, 12);
  const thirdSectionWatches = watches.slice(12, 20);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Our Collection
          </h1>
          <p className="text-gray-400">
            Discover our curated selection of luxury timepieces
          </p>
        </div>
      </div>

      <div className="flex px-8 py-4">
        <p>Sort / Filter +</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-0.5">
        <div className="w-full">
          {/* First Grid Section - 2 columns with promotional */}

          <div className="grid grid-cols-2 gap-0.5">
            {/* Promotional Column */}
            <div className="col-span-1">
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </div>

            {/* Watch Columns */}
            <div className="col-span-1 grid grid-cols-2 gap-0.5">
              {firstSectionWatches.map((watch) => (
                <div key={watch.id} className="group">
                  <div className="h-full bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Grid Section - 4 columns */}
          <div className="grid grid-cols-4 gap-0.5 mt-0.5">
            {secondSectionWatches.map((watch) => (
              <div key={watch.id} className="group">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          {/* First Grid Section - 2 columns with promotional */}

          <div className="grid grid-cols-2 gap-0.5">
            {/* Watch Columns */}
            <div className="col-span-1 grid grid-cols-2 gap-0.5">
              {firstSectionWatches.map((watch) => (
                <div key={watch.id} className="group">
                  <div className="h-full bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            {/* Promotional Column */}
            <div className="col-span-1">
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </div>
          </div>

          {/* Second Grid Section - 4 columns */}
          <div className="grid grid-cols-4 gap-0.5 mt-0.5">
            {secondSectionWatches.map((watch) => (
              <div key={watch.id} className="group">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
