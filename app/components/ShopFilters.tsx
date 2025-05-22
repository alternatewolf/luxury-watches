"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FilterProps = {
  brands: { id: string; name: string }[];
  watchStyles: { id: string; name: string }[];
  onFilterChange: (filters: any) => void;
  onSortChange: (sort: string) => void;
};

export default function ShopFilters({
  brands,
  watchStyles,
  onFilterChange,
  onSortChange,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [] as string[],
    gender: [] as string[],
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-24 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          Sort / Filter{" "}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <div className="px-4 md:px-24 py-4 bg-[#FFFFFF]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">Sort By</h3>
              <select
                onChange={handleSortChange}
                className="w-full px-3 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-sm font-medium mb-3">Brands</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-3 py-1"
                  >
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand.id)}
                      onChange={(e) => {
                        const newBrands = e.target.checked
                          ? [...filters.brands, brand.id]
                          : filters.brands.filter((id) => id !== brand.id);
                        handleFilterChange("brands", newBrands);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-200"
                    />
                    <span className="text-sm">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <h3 className="text-sm font-medium mb-3">Gender</h3>
              <div className="space-y-2">
                {["MENS", "WOMENS", "UNISEX"].map((gender) => (
                  <label key={gender} className="flex items-center gap-3 py-1">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(gender)}
                      onChange={(e) => {
                        const newGender = e.target.checked
                          ? [...filters.gender, gender]
                          : filters.gender.filter((g) => g !== gender);
                        handleFilterChange("gender", newGender);
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-200"
                    />
                    <span className="text-sm">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
