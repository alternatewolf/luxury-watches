import Image from "next/image";
import Link from "next/link";
import {
  getProductsWithPrimaryImages,
  getFilteredProducts,
} from "@/app/actions/product-actions";
import ShopFiltersWrapper from "@/app/components/ShopFiltersWrapper";
import { prisma } from "@/app/lib/prisma";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get filter and sort parameters from URL
  const filters = searchParams.filters
    ? JSON.parse(searchParams.filters as string)
    : {};
  const sort = (searchParams.sort as string) || "newest";

  // Fetch brands and watch styles for filter options
  const [brands, watchStyles] = await Promise.all([
    prisma.brand.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.watchStyle.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Fetch filtered products
  const products = await getFilteredProducts(filters, sort);

  // Add this debug section
  if (process.env.NODE_ENV === "development") {
    console.log("[ShopPage] Products:", products);
    if (products.length === 0) {
      console.warn("[ShopPage] No products found with primary images");
    } else if (!products[0].images[0]?.url) {
      console.error(
        "[ShopPage] First product missing primary image URL:",
        products[0]
      );
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mt-4">
        <ShopFiltersWrapper brands={brands} watchStyles={watchStyles} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-8 gap-0.5">
        {/* Large Promotional Item */}
        <div className="col-span-2 row-span-2 bg-[#F8F5EE] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://i.pinimg.com/1200x/d8/7c/b8/d87cb862eb3f8ab44105b0ab8c56ed69.jpg"
            alt="Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Items */}
        {products.slice(0, 2).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 2 */}
        {products.slice(2, 4).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 3 */}
        {products.slice(4, 8).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 4 */}
        {products.slice(8, 12).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Large Promotional Item */}
        <div className="col-span-2 row-span-2 col-start-1 md:col-start-3 row-start-5 bg-[#F8F5EE] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://www.breda.com/cdn/shop/files/breda-pulse-tandem-1747b-fall-3-2023-silver-metal-bracelet-watch-lifestyle-06_1440x.jpg?v=1707945649"
            alt="Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Items Row 5 */}
        {products.slice(12, 14).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 6 */}
        {products.slice(14, 16).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 7 */}
        {products.slice(16, 20).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 8 */}
        {products.slice(20, 24).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 gap-0.5 mt-0.5">
        {/* Large Promotional Item */}
        <div className="col-span-2 row-span-2 bg-[#F8F5EE] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <img
            src="https://i.pinimg.com/1200x/a8/86/b9/a886b92aca15e277271354579149811f.jpg"
            alt="Watch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Items */}
        {products.slice(24, 26).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 2 */}
        {products.slice(26, 28).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 3 */}
        {products.slice(28, 32).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}

        {/* Product Items Row 4 */}
        {products.slice(32, 36).map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col min-h-[300px] md:min-h-0"
          >
            <div className="flex-1 flex items-center justify-center">
              {product.images[0]?.url && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-2/3 h-auto object-fit"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              {product.condition === "USED" && (
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
                  Used
                </div>
              )}
            </div>
            <div className="px-4 md:px-8 pb-4 md:pb-8">
              <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                ${product.price.toString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
