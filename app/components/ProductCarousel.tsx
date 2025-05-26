// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
        className="flex will-change-transform cursor-grab active:cursor-grabbing gap-2"
      >
        {products.slice(0, 10)?.map((product) => {
          // Check if this is a Patek Philippe watch but exclude the specific watch ID
          const isPatekPhilippe =
            product.brandId === "cmaz2zl8j000erc4bn7b39zxc" &&
            product.id !== "cmb3fvpio0010rc640ghwqbaw";

          return (
            <motion.div
              key={product.id}
              className="min-w-[20rem] min-h-[30rem] p-2 bg-[#F4F4F4] relative rounded-xl"
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
                        isPatekPhilippe ? "scale-250" : "scale-140"
                      }`}
                    />
                  )}
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-md font-medium text-gray-900 truncate ">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-md text-center text-gray-700 text-extralight">
                    ${product.price}
                  </p>
                </div>
                <Link
                  href={`/shop/${product.id}`}
                  className="w-6/7 mx-auto flex justify-center mt-2 mb-2"
                >
                  <button className="w-full bg-white text-black py-2 rounded-full font-extralight cursor-pointer">
                    View
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ProductCarousel;
