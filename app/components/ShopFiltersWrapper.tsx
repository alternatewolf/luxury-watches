"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ShopFilters from "./ShopFilters";

type ShopFiltersWrapperProps = {
  brands: { id: string; name: string }[];
  watchStyles: { id: string; name: string }[];
};

export default function ShopFiltersWrapper({
  brands,
  watchStyles,
}: ShopFiltersWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filters", JSON.stringify(filters));
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`?${params.toString()}`);
  };

  return (
    <ShopFilters
      brands={brands}
      watchStyles={watchStyles}
      onFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
    />
  );
}
