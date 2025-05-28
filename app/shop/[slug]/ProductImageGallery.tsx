// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ProductImage } from "@prisma/client";

type ProductImageGalleryProps = {
  images: ProductImage[];
};

function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeItem, setActiveItem] = useState(images[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel]);

  if (!images.length) return null;

  return (
    <motion.div
      layoutId={"activeItems"}
      className="rounded-md w-fit pb-4 pt-4 gap-2 items-center mx-auto cursor-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {activeItem && (
          <motion.figure
            key={activeItem.id}
            className="dark:bg-gray-900/60 bg-gray-100/60 border rounded-md p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  type: "ease",
                  ease: "easeInOut",
                  duration: 0.3,
                  delay: 0.2,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  type: "ease",
                  ease: "easeInOut",
                  duration: 0.2,
                },
              }}
            >
              <Image
                src={activeItem.url}
                width={1000}
                height={1000}
                alt={activeItem.altText || "Product image"}
                className="object-contain h-96 mx-auto rounded-md"
              />
            </motion.div>
          </motion.figure>
        )}
      </AnimatePresence>

      <motion.div className="w-full mt-4 mx-auto overflow-hidden dark:bg-gray-900/60 bg-gray-100/60 border rounded-md">
        <motion.div
          ref={carousel}
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{ bounceDamping: 30 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex"
        >
          {images.slice(0, 8)?.map((itemData) => (
            <motion.div
              key={itemData.id}
              className="relative p-2 flex-shrink-0"
              onClick={() => setActiveItem(itemData)}
            >
              <Image
                src={itemData.url}
                width={400}
                height={400}
                alt={itemData.altText || "Product thumbnail"}
                className="w-28 h-16 object-cover cursor-pointer relative z-[2] rounded-md pointer-events-none"
              />
              {itemData.id === activeItem?.id && (
                <motion.div
                  layoutId="slider"
                  transition={{
                    layout: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                  className="absolute top-0 left-0 h-full w-full dark:bg-gray-100 bg-gray-800 rounded-md"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProductImageGallery;
