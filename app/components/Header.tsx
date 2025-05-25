"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

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

  const updateDropdown = (triggerElement: HTMLElement) => {
    if (!dropdownRef.current || !bgLayerRef.current || !navigationRef.current)
      return;

    const dropdown = dropdownRef.current;
    const bgLayer = bgLayerRef.current;
    const navigation = navigationRef.current;

    // Calculate dimensions and position
    const dropdownWidth = 500; // w-96 equivalent
    const dropdownHeight = 200; // Approximate height for 3x3 grid
    const triggerRect = triggerElement.getBoundingClientRect();
    const navigationRect = navigation.getBoundingClientRect();

    // Position dropdown relative to trigger
    const left =
      triggerRect.left -
      navigationRect.left +
      triggerRect.width / 2 -
      dropdownWidth / 2;

    // Update dropdown position and size
    dropdown.style.transform = `translateX(${left}px)`;
    dropdown.style.width = `${dropdownWidth}px`;
    dropdown.style.height = `${dropdownHeight}px`;

    // Update background layer scale
    bgLayer.style.transform = `scaleX(${dropdownWidth}) scaleY(${dropdownHeight})`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropdownVisible(true);
    setActiveDropdown("brands");
    updateDropdown(e.currentTarget);
  };

  const handleMouseLeave = () => {
    // Small delay to allow moving to dropdown
    setTimeout(() => {
      if (
        !dropdownRef.current?.matches(":hover") &&
        !navigationRef.current?.querySelector(".brands-trigger:hover")
      ) {
        setIsDropdownVisible(false);
        setActiveDropdown(null);
      }
    }, 100);
  };

  const handleDropdownMouseLeave = () => {
    if (!navigationRef.current?.querySelector(".brands-trigger:hover")) {
      setIsDropdownVisible(false);
      setActiveDropdown(null);
    }
  };

  return (
    <header className="fixed w-full bg-white text-black border-b border-gray-100 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-dark.png"
              alt="Luxe"
              width={80}
              height={32}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex space-x-8 relative"
            ref={navigationRef}
          >
            <Link
              href="/shop"
              className="text-xs transition-colors hover:text-gray-600"
            >
              Shop
            </Link>

            {/* Brands Trigger */}
            <button
              className="brands-trigger flex items-center gap-1 text-xs transition-colors focus:outline-none hover:text-gray-600"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Brands
              <ChevronDown className="h-3 w-3" />
            </button>

            <Link
              href="/shop?filters=%7B%22condition%22%3A%5B%22USED%22%5D%7D"
              className="text-xs transition-colors hover:text-gray-600"
            >
              Used
            </Link>

            <Link
              href="/trade-in"
              className="text-xs transition-colors hover:text-gray-600"
            >
              Trade-In
            </Link>

            <Link
              href="/location"
              className="text-xs transition-colors hover:text-gray-600"
            >
              Location
            </Link>

            {/* Stripe-style Dropdown */}
            <div
              className={`absolute top-full left-0 pt-3 transition-opacity duration-300 ${
                isDropdownVisible
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              <div
                ref={dropdownRef}
                className="relative overflow-hidden transition-all duration-300 ease-out"
                onMouseLeave={handleDropdownMouseLeave}
                style={{ transformOrigin: "top left" }}
              >
                {/* Background Layer */}
                <div
                  ref={bgLayerRef}
                  className="absolute top-0 left-0 w-px h-px bg-white transition-transform duration-300 ease-out"
                  style={{
                    transformOrigin: "top left",
                  }}
                />

                {/* Dropdown Content */}
                <div
                  className={`relative z-10 p-6 transition-opacity duration-300 ${
                    activeDropdown === "brands" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-3 gap-1 items-center">
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/shop?brand=${brand.id}`}
                        className="block px-3 py-2.5 text-sm text-gray-800 hover:text-black hover:bg-gray-50 transition-colors duration-150 text-center font-light tracking-wide"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
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
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-black transform transition-all duration-200 ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 w-full h-0.5 bg-black transform transition-all duration-200 ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className="text-sm transition-colors hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>

              {/* Mobile Brands Section */}
              <div>
                <button
                  onClick={() => setIsMobileBrandsOpen(!isMobileBrandsOpen)}
                  className="flex items-center justify-between w-full text-sm transition-colors text-left hover:text-gray-600"
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
                        className="block text-sm transition-colors text-gray-600 hover:text-gray-900"
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
                className="text-sm transition-colors hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                USED
              </Link>

              <Link
                href="/trade-in"
                className="text-sm transition-colors hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                TRADE-IN
              </Link>

              <Link
                href="/location"
                className="text-sm transition-colors hover:text-gray-600"
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
