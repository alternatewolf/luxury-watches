import Image from "next/image";
import Link from "next/link";
import {
  getProductsWithPrimaryImages,
  getProductReferenceData,
  getFilteredProducts,
} from "@/app/actions/product-actions";
import { prisma } from "@/app/lib/prisma";
import SortSelect from "@/app/components/SortSelect";
import FilterDrawer from "@/app/components/FilterDrawer";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { sort?: string; brand?: string };
}) {
  // Get brands for filter
  const { brands } = await getProductReferenceData();

  // Get sort and brand filter from URL params
  const sort = searchParams.sort || "newest";
  const selectedBrands = searchParams.brand
    ? searchParams.brand.split(",")
    : [];

  // Fetch products with filters
  const products = await getFilteredProducts(
    {
      brands: selectedBrands,
    },
    sort
  );

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
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        {/* Mobile Filters */}
        <FilterDrawer
          brands={brands}
          selectedBrands={selectedBrands}
          sort={sort}
        />

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-16 space-y-4">
              {/* Sort Options */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Sort By
                </h3>
                <SortSelect value={sort} />
              </div>

              {/* Brand Filter */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Brands
                </h3>
                <div className="space-y-2">
                  {brands.map((brand) => {
                    const newBrands = selectedBrands.includes(brand.id)
                      ? selectedBrands.filter((id) => id !== brand.id)
                      : [...selectedBrands, brand.id];

                    const query = {
                      ...(sort !== "newest" && { sort }),
                      ...(newBrands.length > 0 && {
                        brand: newBrands.join(","),
                      }),
                    };

                    return (
                      <Link
                        key={brand.id}
                        href={{
                          pathname: "/shop",
                          query,
                        }}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center ${
                            selectedBrands.includes(brand.id)
                              ? "bg-black border-black"
                              : "border-gray-300 group-hover:border-black"
                          }`}
                        >
                          {selectedBrands.includes(brand.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            selectedBrands.includes(brand.id)
                              ? "text-black font-medium"
                              : "text-gray-600 group-hover:text-black"
                          }`}
                        >
                          {brand.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group bg-[#F4F4F4] hover:bg-black/5 relative overflow-hidden flex flex-col min-h-[300px] sm:min-h-[400px] lg:min-h-[28rem] rounded-xl cursor-pointer"
                >
                  <div className="flex-1 flex items-center justify-center p-6">
                    {product.images[0]?.url && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className={`w-full h-auto object-contain ${
                          product.brandId === "cmaz2zl8j000erc4bn7b39zxc" &&
                          product.id !== "cmb3fvpio0010rc640ghwqbaw"
                            ? "scale-170"
                            : "scale-110"
                        }`}
                      />
                    )}
                    {product.condition === "USED" && (
                      <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider rounded">
                        Used
                      </div>
                    )}
                  </div>
                  <div className="px-6 pb-6">
                    <h3 className="text-sm font-medium text-gray-900 truncate uppercase">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      ${product.price.toString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
