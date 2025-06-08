import Image from "next/image";
import Link from "next/link";
import {
  getProductsWithPrimaryImages,
  getProductReferenceData,
  getFilteredProducts,
} from "@/app/actions/product-actions";
import FilterDrawer from "@/app/components/FilterDrawer";
import FilterSidebar from "@/app/components/FilterSidebar";

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

type Brand = {
  id: string;
  name: string;
};

type Condition = string;
type BoxOption = string;
type PapersOption = string;
type ManufacturingYear = string;

// Set revalidation time to 1 hour
export const revalidate = 3600;

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

  // Fetch data in parallel using direct database queries
  const [referenceData, products] = await Promise.all([
    getProductReferenceData(),
    getFilteredProducts(
      {
        brands: selectedBrands,
        condition: selectedConditions,
        box: selectedBox,
        papers: selectedPapers,
        manufacturingYears: selectedYears,
      },
      sort
    ),
  ]);

  const { brands, conditions, boxOptions, papersOptions, manufacturingYears } =
    referenceData;

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
          conditions={
            conditions.filter((c: string | null) => c !== null) as string[]
          }
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
          {/* Use the new client-side FilterSidebar component */}
          <FilterSidebar
            brands={brands}
            conditions={
              conditions.filter((c: string | null) => c !== null) as string[]
            }
            boxOptions={boxOptions}
            papersOptions={papersOptions}
            manufacturingYears={manufacturingYears}
            sort={sort}
            selectedBrands={selectedBrands}
            selectedConditions={selectedConditions}
            selectedBox={selectedBox}
            selectedPapers={selectedPapers}
            selectedYears={selectedYears}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  prefetch={false}
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
                          product.id === "cmb7iv3kp0003rcfkqevddz88" ||
                          product.id === "cmbavh2490002rc3tt4i2w6hn"
                            ? "scale-110"
                            : product.brand.name === "Patek Philippe" &&
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
