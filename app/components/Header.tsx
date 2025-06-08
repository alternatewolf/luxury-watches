"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Don't render header on homepage
  if (isHomePage) {
    return null;
  }

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
    <header className="fixed w-full bg-[#222222] text-white z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-12 md:py-8">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center space-x-8 relative">
            <Link
              href="/shop"
              prefetch={false}
              className="text-xs transition-colors hover:text-gray-300"
            >
              Shop
            </Link>

            {/* Brands Navigation Menu */}
            <NavigationMenu className="relative">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-xs data-[state=open]:bg-transparent data-[state=open]:text-white flex items-center justify-center gap-1 p-0">
                    Brands
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-1 p-3 w-[500px]">
                      {brands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/shop?brand=${brand.id}`}
                          prefetch={false}
                          className="block px-3 py-2.5 text-sm  text-gray-800 hover:text-black hover:bg-gray-100 transition-colors duration-150 text-center font-bold tracking-wide"
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
              className="text-xs transition-colors hover:text-gray-300"
            >
              Trade-In
            </Link>

            <Link
              href="/location"
              className="text-xs transition-colors hover:text-gray-300"
            >
              Location
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://wa.me/447520644012"
              className="hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="WhatsApp"
                role="img"
                viewBox="0 0 512 512"
                className="h-7 w-7"
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
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-4 h-4 relative">
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-white md:bg-black transform transition-all duration-200 ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-white md:bg-black transform transition-all duration-200 ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-600 md:border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/shop"
                prefetch={false}
                className="text-sm transition-colors text-white md:text-black hover:text-gray-300 md:hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>

              {/* Mobile Brands Section */}
              <div>
                <button
                  onClick={() => setIsMobileBrandsOpen(!isMobileBrandsOpen)}
                  className="flex items-center justify-between w-full text-sm transition-colors text-left text-white md:text-black hover:text-gray-300 md:hover:text-gray-600"
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
                        prefetch={false}
                        className="block text-sm transition-colors text-gray-300 md:text-gray-600 hover:text-white md:hover:text-gray-900"
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
                href="/trade-in"
                className="text-sm transition-colors text-white md:text-black hover:text-gray-300 md:hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                TRADE-IN
              </Link>

              <Link
                href="/location"
                className="text-sm transition-colors text-white md:text-black hover:text-gray-300 md:hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                LOCATION
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
