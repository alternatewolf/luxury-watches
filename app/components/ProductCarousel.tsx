// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: string;
  primaryImageUrl: string | null;
  brandId: string;
};

interface ProductCarouselProps {
  products: Product[];
}

function ProductCarousel({ products }: ProductCarouselProps) {
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.97 }}
        dragElastic={0.5}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex will-change-transform cursor-grab active:cursor-grabbing gap-0.5"
      >
        {products.slice(0, 10)?.map((product) => {
          // Check if this is a Patek Philippe watch but exclude the specific watch ID
          const isPatekPhilippe =
            product.brandId === "cmaz2zl8j000erc4bn7b39zxc" &&
            product.id !== "cmb3fvpio0010rc640ghwqbaw";

          return (
            <motion.div
              key={product.id}
              className="min-w-[20rem] min-h-[25rem] p-2 bg-[#F8F5EE] relative"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  text-black bg-white">
                  New
                </span>
              </div>
              <div className="relative h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  {product.primaryImageUrl && (
                    <img
                      src={product.primaryImageUrl}
                      alt={product.name}
                      className={`w-2/3 h-auto object-fit pointer-events-none ${
                        isPatekPhilippe ? "scale-170" : ""
                      }`}
                    />
                  )}
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xs font-medium text-gray-900 truncate uppercase">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">${product.price}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ProductCarousel;
