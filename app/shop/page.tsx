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

// Helper function to format condition names
function formatCondition(condition: string): string {
  switch (condition) {
    case "NEW":
      return "New";
    case "UNWORN":
      return "Unworn";
    case "MINT":
      return "Mint";
    case "EXCELLENT":
      return "Excellent";
    case "VERY_GOOD":
      return "Very Good";
    case "GOOD":
      return "Good";
    case "VINTAGE":
      return "Vintage";
    case "USED":
      return "Used";
    default:
      return condition;
  }
}

// Helper function to format inclusion options
function formatInclusion(inclusion: string): string {
  switch (inclusion) {
    case "ORIGINAL":
      return "Original";
    case "GENERIC":
      return "Generic";
    case "SERVICE_PAPERS":
      return "Service Papers";
    case "WARRANTY_CARD":
      return "Warranty Card";
    case "NONE":
      return "None";
    default:
      return inclusion;
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: {
    sort?: string;
    brand?: string;
    condition?: string;
    box?: string;
    papers?: string;
    year?: string;
  };
}) {
  // Get all reference data for filters
  const { brands, conditions, manufacturingYears, boxOptions, papersOptions } =
    await getProductReferenceData();

  // Get sort and filter params from URL
  const sort = searchParams.sort || "newest";
  const selectedBrands = searchParams.brand
    ? searchParams.brand.split(",")
    : [];
  const selectedConditions = searchParams.condition
    ? searchParams.condition.split(",")
    : [];
  const selectedBox = searchParams.box ? searchParams.box.split(",") : [];
  const selectedPapers = searchParams.papers
    ? searchParams.papers.split(",")
    : [];
  const selectedYears = searchParams.year ? searchParams.year.split(",") : [];

  // Fetch products with filters
  const products = await getFilteredProducts(
    {
      brands: selectedBrands,
      condition: selectedConditions,
      box: selectedBox,
      papers: selectedPapers,
      manufacturingYears: selectedYears,
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
    <div className="min-h-screen bg-white pt-12">
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        {/* Mobile Filters */}
        <FilterDrawer
          brands={brands}
          selectedBrands={selectedBrands}
          conditions={conditions.filter((c) => c !== null) as string[]}
          selectedConditions={selectedConditions}
          boxOptions={boxOptions}
          selectedBox={selectedBox}
          papersOptions={papersOptions}
          selectedPapers={selectedPapers}
          manufacturingYears={manufacturingYears}
          selectedYears={selectedYears}
          sort={sort}
        />

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-16 h-[calc(100vh)] overflow-y-auto space-y-4 pr-2">
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
                      ...(selectedConditions.length > 0 && {
                        condition: selectedConditions.join(","),
                      }),
                      ...(selectedBox.length > 0 && {
                        box: selectedBox.join(","),
                      }),
                      ...(selectedPapers.length > 0 && {
                        papers: selectedPapers.join(","),
                      }),
                      ...(selectedYears.length > 0 && {
                        year: selectedYears.join(","),
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

              {/* Condition Filter */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Condition
                </h3>
                <div className="space-y-2">
                  {(conditions.filter((c) => c !== null) as string[]).map(
                    (condition) => {
                      const newConditions = selectedConditions.includes(
                        condition
                      )
                        ? selectedConditions.filter((c) => c !== condition)
                        : [...selectedConditions, condition];

                      const query = {
                        ...(sort !== "newest" && { sort }),
                        ...(selectedBrands.length > 0 && {
                          brand: selectedBrands.join(","),
                        }),
                        ...(newConditions.length > 0 && {
                          condition: newConditions.join(","),
                        }),
                        ...(selectedBox.length > 0 && {
                          box: selectedBox.join(","),
                        }),
                        ...(selectedPapers.length > 0 && {
                          papers: selectedPapers.join(","),
                        }),
                        ...(selectedYears.length > 0 && {
                          year: selectedYears.join(","),
                        }),
                      };

                      return (
                        <Link
                          key={condition}
                          href={{
                            pathname: "/shop",
                            query,
                          }}
                          className="flex items-center gap-2 group"
                        >
                          <div
                            className={`w-4 h-4 border rounded flex items-center justify-center ${
                              selectedConditions.includes(condition)
                                ? "bg-black border-black"
                                : "border-gray-300 group-hover:border-black"
                            }`}
                          >
                            {selectedConditions.includes(condition) && (
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
                              selectedConditions.includes(condition)
                                ? "text-black font-medium"
                                : "text-gray-600 group-hover:text-black"
                            }`}
                          >
                            {formatCondition(condition)}
                          </span>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Box Filter */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Original Box
                </h3>
                <div className="space-y-2">
                  {boxOptions.map((box) => {
                    const newBox = selectedBox.includes(box)
                      ? selectedBox.filter((b) => b !== box)
                      : [...selectedBox, box];

                    const query = {
                      ...(sort !== "newest" && { sort }),
                      ...(selectedBrands.length > 0 && {
                        brand: selectedBrands.join(","),
                      }),
                      ...(selectedConditions.length > 0 && {
                        condition: selectedConditions.join(","),
                      }),
                      ...(newBox.length > 0 && { box: newBox.join(",") }),
                      ...(selectedPapers.length > 0 && {
                        papers: selectedPapers.join(","),
                      }),
                      ...(selectedYears.length > 0 && {
                        year: selectedYears.join(","),
                      }),
                    };

                    return (
                      <Link
                        key={box}
                        href={{
                          pathname: "/shop",
                          query,
                        }}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center ${
                            selectedBox.includes(box)
                              ? "bg-black border-black"
                              : "border-gray-300 group-hover:border-black"
                          }`}
                        >
                          {selectedBox.includes(box) && (
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
                            selectedBox.includes(box)
                              ? "text-black font-medium"
                              : "text-gray-600 group-hover:text-black"
                          }`}
                        >
                          {formatInclusion(box)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Papers Filter */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Original Papers
                </h3>
                <div className="space-y-2">
                  {papersOptions.map((papers) => {
                    const newPapers = selectedPapers.includes(papers)
                      ? selectedPapers.filter((p) => p !== papers)
                      : [...selectedPapers, papers];

                    const query = {
                      ...(sort !== "newest" && { sort }),
                      ...(selectedBrands.length > 0 && {
                        brand: selectedBrands.join(","),
                      }),
                      ...(selectedConditions.length > 0 && {
                        condition: selectedConditions.join(","),
                      }),
                      ...(selectedBox.length > 0 && {
                        box: selectedBox.join(","),
                      }),
                      ...(newPapers.length > 0 && {
                        papers: newPapers.join(","),
                      }),
                      ...(selectedYears.length > 0 && {
                        year: selectedYears.join(","),
                      }),
                    };

                    return (
                      <Link
                        key={papers}
                        href={{
                          pathname: "/shop",
                          query,
                        }}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center ${
                            selectedPapers.includes(papers)
                              ? "bg-black border-black"
                              : "border-gray-300 group-hover:border-black"
                          }`}
                        >
                          {selectedPapers.includes(papers) && (
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
                            selectedPapers.includes(papers)
                              ? "text-black font-medium"
                              : "text-gray-600 group-hover:text-black"
                          }`}
                        >
                          {formatInclusion(papers)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Manufacturing Year Filter */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Year of Manufacture
                </h3>
                <div className="space-y-2">
                  {manufacturingYears.map((year) => {
                    const newYears = selectedYears.includes(year)
                      ? selectedYears.filter((y) => y !== year)
                      : [...selectedYears, year];

                    const query = {
                      ...(sort !== "newest" && { sort }),
                      ...(selectedBrands.length > 0 && {
                        brand: selectedBrands.join(","),
                      }),
                      ...(selectedConditions.length > 0 && {
                        condition: selectedConditions.join(","),
                      }),
                      ...(selectedBox.length > 0 && {
                        box: selectedBox.join(","),
                      }),
                      ...(selectedPapers.length > 0 && {
                        papers: selectedPapers.join(","),
                      }),
                      ...(newYears.length > 0 && { year: newYears.join(",") }),
                    };

                    return (
                      <Link
                        key={year}
                        href={{
                          pathname: "/shop",
                          query,
                        }}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center ${
                            selectedYears.includes(year)
                              ? "bg-black border-black"
                              : "border-gray-300 group-hover:border-black"
                          }`}
                        >
                          {selectedYears.includes(year) && (
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
                            selectedYears.includes(year)
                              ? "text-black font-medium"
                              : "text-gray-600 group-hover:text-black"
                          }`}
                        >
                          {year}
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
                  href={`/shop/${product.id}`}
                  className="group bg-[#F8F5EE] hover:bg-black/5 relative overflow-hidden flex flex-col min-h-[300px] sm:min-h-[400px] lg:min-h-[28rem] rounded-xl cursor-pointer"
                >
                  <div className="flex-1 flex items-center justify-center p-6">
                    {product.images[0]?.url && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className={`w-full h-auto object-contain ${
                          product.id === "cmb7lntdh003wrcfk51xwuj6o" ||
                          product.id === "cmb7lh7zk0039rcfkgriaetr6" ||
                          product.id === "cmb7iv3kp0003rcfkqevddz88"
                            ? "scale-110"
                            : product.brandId === "cmaz2zl8j000erc4bn7b39zxc" &&
                              product.id !== "cmb3fvpio0010rc640ghwqbaw" &&
                              product.id !== "cmb7iv3kp0003rcfkqevddz88"
                            ? "scale-170"
                            : "scale-110"
                        }`}
                      />
                    )}
                    {product.condition === "NEW" && (
                      <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] px-2 py-1 uppercase tracking-wider rounded font-medium">
                        New
                      </div>
                    )}
                  </div>
                  <div className="px-6 pb-6">
                    <p className="md:text-xs text-xs text-gray-600 uppercase tracking-wider mb-2 text-center">
                      {product.brand?.name}
                    </p>
                    <h3 className="md:text-sm text-xs font-medium text-gray-900 truncate uppercase text-center">
                      {product.name}
                    </h3>
                    <p className="md:mt-4 mt-3 text-sm text-gray-500 text-center">
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
