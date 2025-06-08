"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);

  const brands = [
    { name: "Rolex", id: "cmawb7z070002rcc4rxq214jz" },
    { name: "Omega", id: "cmawcxgzm002brcc4nsxkgt2t" },
    { name: "Cartier", id: "cmawdkwv30034rcc49zoi7uhn" },
    { name: "IWC Schaffhausen", id: "cmaweddkj004trcc43x63rw3r" },
    { name: "Richard Mille", id: "cmaz2wicy0000rc4bgi9syncq" },
    { name: "Patek Philippe", id: "cmaz2zl8j000erc4bn7b39zxc" },
    { name: "Audemars Piguet", id: "cmaz34u6h0013rc4baxhttp46" },
    { name: "Bulgari", id: "cmaz3f8qv001urc4b5fw1ibhu" },
    { name: "Panerai", id: "cmaz3p0xa002qrc4b3ghncqvp" },
  ];

  return (
    <header className="absolute w-full bg-transparent z-100 text-white">
      <div className="px-4 sm:px-6 lg:px-0">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-3 items-center justify-between py-4 px-24 mt-8 bg-black/5 backdrop-blur-md border-b border-white/50">
          {/* Navigation below logo */}
          <nav className="flex items-center space-x-8 relative">
            <Link
              href="/shop"
              className="text-md transition-colors hover:text-gray-300 tracking-wide"
            >
              Shop
            </Link>

            {/* Brands Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-md data-[state=open]:bg-transparent data-[state=open]:text-white flex items-center justify-center gap-1 p-0 tracking-wide">
                    Brands
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-1 p-3 w-[500px]">
                      {brands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/shop?brand=${brand.id}`}
                          className="block px-3 py-2.5 text-sm text-gray-800 hover:text-black hover:bg-gray-100 transition-colors duration-150 text-center font-light tracking-wide"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/trade-in"
              className="text-md transition-colors hover:text-gray-300 tracking-wide"
            >
              Trade-In
            </Link>
          </nav>

          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Luxury Watches"
                width="40"
                height="40"
                loading="lazy"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-8">
            <Link
              href="/location"
              className="text-md transition-colors hover:text-gray-300 tracking-wide"
            >
              Location
            </Link>
            <Link
              href="https://wa.me/447520644012"
              className="flex items-center justify-end gap-2 text-md transition-colors hover:text-gray-300 tracking-wide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="WhatsApp"
                role="img"
                viewBox="0 0 512 512"
                className="h-5 w-5"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="512" height="512" rx="15%" fill="#25d366"></rect>
                  <path
                    fill="#25d366"
                    stroke="#ffffff"
                    strokeWidth="26"
                    d="M123 393l14-65a138 138 0 1150 47z"
                  ></path>
                  <path
                    fill="#ffffff"
                    d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                  ></path>
                </g>
              </svg>
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-home.png"
                alt="Luxe"
                width={500}
                height={500}
                className="hidden h-12 w-auto object-contain"
              />
            </Link>

            {/* Mobile menu button */}
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-4 h-4 relative">
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-200 ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transform transition-all duration-200 ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="py-4 border-t border-white/20 bg-white rounded-lg mt-2 mx-4">
              <nav className="flex flex-col space-y-4 px-4">
                <Link
                  href="/shop"
                  className="text-sm transition-colors text-black hover:text-gray-600 tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SHOP
                </Link>

                {/* Mobile Brands Section */}
                <div>
                  <button
                    onClick={() => setIsMobileBrandsOpen(!isMobileBrandsOpen)}
                    className="flex items-center justify-between w-full text-sm transition-colors text-left text-black hover:text-gray-600 tracking-wide"
                  >
                    BRANDS
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${
                        isMobileBrandsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isMobileBrandsOpen && (
                    <div className="mt-3 ml-4 space-y-3">
                      {brands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/shop?brand=${brand.id}`}
                          className="block text-sm transition-colors text-gray-600 hover:text-black"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileBrandsOpen(false);
                          }}
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/shop?filters=%7B%22condition%22%3A%5B%22USED%22%5D%7D"
                  className="text-sm transition-colors text-black hover:text-gray-600 tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  USED
                </Link>

                <Link
                  href="/trade-in"
                  className="text-sm transition-colors text-black hover:text-gray-600 tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  TRADE-IN
                </Link>

                <Link
                  href="/location"
                  className="text-sm transition-colors text-black hover:text-gray-600 tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOCATION
                </Link>

                <Link
                  href="https://wa.me/447520644012"
                  className="flex items-center gap-2 text-sm transition-colors text-black hover:text-gray-600 tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="WhatsApp"
                    role="img"
                    viewBox="0 0 512 512"
                    className="h-5 w-5"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <rect
                        width="512"
                        height="512"
                        rx="15%"
                        fill="#25d366"
                      ></rect>
                      <path
                        fill="#25d366"
                        stroke="#ffffff"
                        strokeWidth="26"
                        d="M123 393l14-65a138 138 0 1150 47z"
                      ></path>
                      <path
                        fill="#ffffff"
                        d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                      ></path>
                    </g>
                  </svg>
                  CONTACT
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
