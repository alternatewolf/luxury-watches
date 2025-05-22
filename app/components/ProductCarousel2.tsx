"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: string;
  primaryImageUrl: string | null;
};

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel2({ products }: ProductCarouselProps) {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.92 }}
        dragElastic={0.2}
        dragConstraints={{ right: 665, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex will-change-transform cursor-grab active:cursor-grabbing pr-14 flex-row-reverse"
      >
        {products.map((product) => (
          <motion.div key={product.id} className="w-[19.5rem] pr-4">
            <div className="group bg-[#F8F5EE] relative overflow-hidden flex flex-col aspect-3/4 rounded-xl">
              <div className="flex-1 flex items-center justify-center">
                {product.primaryImageUrl && (
                  <img
                    src={product.primaryImageUrl}
                    alt={product.name}
                    className="w-2/3 h-auto object-contain"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all" />
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs text-gray-500">${product.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
