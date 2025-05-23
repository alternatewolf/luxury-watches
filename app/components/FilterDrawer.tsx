"use client";

import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import SortSelect from "./SortSelect";
import Link from "next/link";

type FilterDrawerProps = {
  brands: { id: string; name: string }[];
  selectedBrands: string[];
  sort: string;
};

export default function FilterDrawer({
  brands,
  selectedBrands,
  sort,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          {selectedBrands.length > 0 && (
            <span className="ml-1.5 rounded-full bg-black px-2 py-0.5 text-xs text-white">
              {selectedBrands.length}
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
        </div>
      </div>
    </>
  );
}
