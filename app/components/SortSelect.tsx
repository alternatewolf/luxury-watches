"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <select
      value={value}
      onChange={handleSortChange}
      className="w-full text-sm bg-white border-gray-300 rounded-md focus:ring-black focus:border-black"
    >
      <option value="newest">Newest Arrivals</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}
