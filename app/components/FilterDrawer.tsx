"use client";

import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import SortSelect from "./SortSelect";
import Link from "next/link";

type FilterDrawerProps = {
  brands: { id: string; name: string }[];
  selectedBrands: string[];
  conditions: string[];
  selectedConditions: string[];
  boxOptions: string[];
  selectedBox: string[];
  papersOptions: string[];
  selectedPapers: string[];
  manufacturingYears: string[];
  selectedYears: string[];
  sort: string;
};

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

export default function FilterDrawer({
  brands,
  selectedBrands,
  conditions,
  selectedConditions,
  boxOptions,
  selectedBox,
  papersOptions,
  selectedPapers,
  manufacturingYears,
  selectedYears,
  sort,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total active filters
  const totalActiveFilters =
    selectedBrands.length +
    selectedConditions.length +
    selectedBox.length +
    selectedPapers.length +
    selectedYears.length;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Filter Header */}
      <div className="lg:hidden mb-4 flex items-center justify-between bg-white p-4 border-b">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="w-4 h-4" />
          Filters
          {totalActiveFilters > 0 && (
            <span className="ml-1.5 rounded-full bg-black px-2 py-0.5 text-xs text-white">
              {totalActiveFilters}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Content */}
        <div className="absolute inset-y-0 left-0 w-80 bg-white shadow-xl">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Sort Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Sort By
                </h3>
                <SortSelect value={sort} />
              </div>

              {/* Brand Filter */}
              <div>
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
                        onClick={() => setIsOpen(false)}
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
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Condition
                </h3>
                <div className="space-y-2">
                  {conditions.map((condition) => {
                    const newConditions = selectedConditions.includes(condition)
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
                        onClick={() => setIsOpen(false)}
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
                  })}
                </div>
              </div>

              {/* Box Filter */}
              <div>
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
                        onClick={() => setIsOpen(false)}
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
              <div>
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
                        onClick={() => setIsOpen(false)}
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
              <div>
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
                        onClick={() => setIsOpen(false)}
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
        </div>
      </div>
    </>
  );
}
