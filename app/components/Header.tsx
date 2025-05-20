"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12  ">
          {/* Logo */}
          <Link href="/" className="text-md font-light tracking-wider">
            Luxe
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/shop"
              className="text-xs hover:text-gray-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="text-xs hover:text-gray-600 transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-xs hover:text-gray-600 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingBag className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block w-full h-px bg-black transform transition-transform ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-full h-px bg-black transition-opacity ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-full h-px bg-black transform transition-transform ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
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
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/collections"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                COLLECTIONS
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
