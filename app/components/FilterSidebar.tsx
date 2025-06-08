"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import SortSelect from "./SortSelect";

// Helper functions
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

interface FilterSidebarProps {
  brands: Brand[];
  conditions: string[];
  boxOptions: string[];
  papersOptions: string[];
  manufacturingYears: string[];
  sort: string;
  selectedBrands: string[];
  selectedConditions: string[];
  selectedBox: string[];
  selectedPapers: string[];
  selectedYears: string[];
}

export default function FilterSidebar({
  brands,
  conditions,
  boxOptions,
  papersOptions,
  manufacturingYears,
  sort,
  selectedBrands,
  selectedConditions,
  selectedBox,
  selectedPapers,
  selectedYears,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Get current values for this filter
      const currentValues = params.getAll(name);

      // If value exists, remove it; otherwise add it
      if (currentValues.includes(value)) {
        params.delete(name);
        currentValues
          .filter((v) => v !== value)
          .forEach((v) => params.append(name, v));
      } else {
        params.append(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    const queryString = createQueryString(name, value);
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-20 h-[calc(100vh)] overflow-y-auto space-y-4 pr-2">
        {/* Sort Options */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
          <SortSelect value={sort} />
        </div>

        {/* Brand Filter */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => handleFilterChange("brand", brand.id)}
                />
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
              </label>
            ))}
          </div>
        </div>

        {/* Condition Filter */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Condition</h3>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <label
                key={condition}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleFilterChange("condition", condition)}
                />
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
              </label>
            ))}
          </div>
        </div>

        {/* Box Filter */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Original Box
          </h3>
          <div className="space-y-2">
            {boxOptions.map((box) => (
              <label
                key={box}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedBox.includes(box)}
                  onChange={() => handleFilterChange("box", box)}
                />
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
              </label>
            ))}
          </div>
        </div>

        {/* Papers Filter */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Original Papers
          </h3>
          <div className="space-y-2">
            {papersOptions.map((papers) => (
              <label
                key={papers}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedPapers.includes(papers)}
                  onChange={() => handleFilterChange("papers", papers)}
                />
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
              </label>
            ))}
          </div>
        </div>

        {/* Manufacturing Year Filter */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Year of Manufacture
          </h3>
          <div className="space-y-2">
            {manufacturingYears.map((year) => (
              <label
                key={year}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedYears.includes(year)}
                  onChange={() => handleFilterChange("year", year)}
                />
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
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
