"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

type ProductRecommendationsProps = {
  products: (Product & {
    brand: { name: string };
    images: { url: string }[];
  })[];
};

export default function ProductRecommendations({
  products,
}: ProductRecommendationsProps) {
  if (!products.length) return null;

  return (
    <div className="mt-16 border-t pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="group"
          >
            <div className="aspect-square relative bg-[#F8F5EE] rounded-lg overflow-hidden">
              {product.images[0]?.url && (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.brand.name}</p>
              <p className="text-sm font-medium text-gray-900">
                {formatPrice(product.price.toString())}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
