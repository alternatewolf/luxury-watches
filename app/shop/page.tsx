import Image from "next/image";
import { getProductsWithPrimaryImages } from "@/app/actions/product-actions";

export default async function ShopPage() {
  // Fetch products with their primary images
  const products = await getProductsWithPrimaryImages();

  // Add this debug section
  if (process.env.NODE_ENV === "development") {
    console.log("[ShopPage] Products:", products);
    if (products.length === 0) {
      console.warn("[ShopPage] No products found with primary images");
    } else if (!products[0].primaryImageUrl) {
      console.error(
        "[ShopPage] First product missing primaryImageUrl:",
        products[0]
      );
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex px-8 py-4 mt-4">
        <p>Sort / Filter +</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 grid-rows-8 gap-0.5">
        {/* Large Promotional Item */}
        <div className="col-span-2 row-span-2 bg-[#F8F5EE] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://www.breda.com/cdn/shop/files/breda-jane-1741c-fall-3-2023-gold-metal-bracelet-watch-studio-01_e6ee2eb7-61b2-4c1b-b1ad-40501395366b_1440x.jpg?v=1696518796"
            alt="Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Items */}
        {products.slice(0, 2).map((product, index) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 2 */}
        {products.slice(2, 4).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 3 */}
        {products.slice(4, 8).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 4 */}
        {products.slice(8, 12).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Large Promotional Item */}
        <div className="col-span-2 row-span-2 col-start-3 row-start-5 bg-[#F8F5EE] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://www.breda.com/cdn/shop/files/breda-pulse-tandem-1747b-fall-3-2023-silver-metal-bracelet-watch-lifestyle-06_1440x.jpg?v=1707945649"
            alt="Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Items Row 5 */}
        {products.slice(12, 14).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 6 */}
        {products.slice(14, 16).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 7 */}
        {products.slice(16, 20).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {products.slice(20, 24).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-0.5 mt-0.5">
        {/* Large Promotional Item */}
        <div className="col-span-2 row-span-2 bg-[#F8F5EE] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://www.breda.com/cdn/shop/files/breda-jane-1741c-fall-3-2023-gold-metal-bracelet-watch-studio-01_e6ee2eb7-61b2-4c1b-b1ad-40501395366b_1440x.jpg?v=1696518796"
            alt="Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Items */}
        {products.slice(24, 26).map((product, index) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 2 */}
        {products.slice(26, 28).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 3 */}
        {products.slice(28, 32).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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

        {/* Product Items Row 4 */}
        {products.slice(32, 36).map((product) => (
          <div
            key={product.id}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col"
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
      </div>
    </div>
  );
}
