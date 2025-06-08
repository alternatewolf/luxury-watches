"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
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

interface FilterDrawerProps {
  brands: Brand[];
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="lg:hidden mb-4">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        onClick={() => setIsOpen(true)}
      >
        Filters
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Filters
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="space-y-6">
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
                              {brands.map((brand) => (
                                <label
                                  key={brand.id}
                                  className="flex items-center gap-2 group cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={() =>
                                      handleFilterChange("brand", brand.id)
                                    }
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
                            <h3 className="text-sm font-medium text-gray-900 mb-3">
                              Condition
                            </h3>
                            <div className="space-y-2">
                              {conditions.map((condition) => (
                                <label
                                  key={condition}
                                  className="flex items-center gap-2 group cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedConditions.includes(
                                      condition
                                    )}
                                    onChange={() =>
                                      handleFilterChange("condition", condition)
                                    }
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
                                    onChange={() =>
                                      handleFilterChange("box", box)
                                    }
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
                                    onChange={() =>
                                      handleFilterChange("papers", papers)
                                    }
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
                                    onChange={() =>
                                      handleFilterChange("year", year)
                                    }
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
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
