"use client";

import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import Image from "next/image";

export default function LocationPage() {
  const storeDetails = {
    name: "Luxe Watch Boutique",
    address: "Al Shafar Building 7 - 117 Al Wasl Rd",
    area: "Al Bada'a - Jumeirah 1",
    city: "Dubai - United Arab Emirates",
    phone: "+971 4 XXX XXXX",
    email: "luxuriouswatchesinfo@gmail.com",
    hours: {
      weekdays: "10:00 AM - 10:00 PM",
      weekend: "10:00 AM - 11:00 PM",
    },
    coordinates: {
      lat: 25.2048,
      lng: 55.2708,
    },
  };

  const handleDirections = () => {
    window.open(
      "https://www.google.com/maps?sca_esv=ca6a2bedbd114e2c&sxsrf=AE3TifML-A5wx5F8KKPzzJV2ZBra47R6AA:1748199730893&lsig=AB86z5W5imicXQIUxRaKB_kAyVm7&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KeVf_LBCQl8-MfGofmHHzuSU&daddr=6775%2BGC7+-+Al+Bada%27a+-+Dubai+-+United+Arab+Emirates",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white pt-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[url('/Store7.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
              Visit Our Boutique
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Experience luxury timepieces in the heart of Dubai's prestigious
              Jumeirah district
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Store Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Store Information
              </h2>

              {/* Store Image */}
              <div className="mb-8">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/store-img.webp"
                    alt="Luxe Watch Boutique Interior"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Our elegant boutique in the heart of Jumeirah
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {storeDetails.address}
                    <br />
                    {storeDetails.area}
                    <br />
                    {storeDetails.city}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 mb-6">
                <Clock className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Opening Hours
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Thursday: {storeDetails.hours.weekdays}</p>
                    <p>Friday - Sunday: {storeDetails.hours.weekend}</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4 mb-6">
                <Phone className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>{storeDetails.phone}</p>
                    <a
                      href={`mailto:${storeDetails.email}`}
                      className="text-black hover:underline"
                    >
                      {storeDetails.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDirections}
                className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </button>
              <a
                href="https://wa.me/11111222233333"
                className="flex items-center justify-center gap-2 border border-black text-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <rect
                    width="512"
                    height="512"
                    rx="15%"
                    fill="currentColor"
                  ></rect>
                  <path
                    fill="white"
                    d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
                  ></path>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900">Find Us</h2>

            {/* Embedded Map */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1234567890123!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43425042e55f%3A0x94e7f1a6f1234567!2sAl%20Wasl%20Rd%20-%20Al%20Bada%27a%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Location Highlights */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4">
                Why Visit Our Location?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Prime location in Jumeirah 1, Dubai's luxury district
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>Easy access from major Dubai landmarks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dedicated parking available</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>Private viewing rooms for exclusive collections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white pt-10 md:pt-10 pb-8 mt-0 relative">
        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div
            className="h-[80vh] bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/28697832/pexels-photo-28697832/free-photo-of-elegant-display-of-luxury-watches-in-retail-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            }}
          ></div>
          <div
            className="w-11/12 max-w-[500px] sm:w-[500px] absolute right-10 
                  top-[calc(theme(spacing.20)+80vh)]
                  -translate-y-1/2 
                 bg-[#232323] rounded-none shadow-xl p-10 flex flex-col items-center text-center text-white z-10"
          >
            <h2 className="text-4xl font-light mb-4 tracking-wide">
              PLACE YOUR
              <br />
              ORDER TODAY
            </h2>
            <p className="mb-8 text-gray-300 text-sm">
              To order your dream watch, whatsapp us at
            </p>
            <h1 className="text-3xl font-light mb-4 tracking-wide">
              +1 1111-2222-3333
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <button
                type="submit"
                className="flex items-center justify-center h-25 w-25 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors ml-2"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M6 16L16 6M16 6H7M16 6V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p>Click to Chat</p>
            </div>
            <hr className="w-full border-gray-700 mb-4 mt-6" />
            <p className="text-xs text-gray-400">
              Our customer service is available 24/7.
            </p>
          </div>
          <div className="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-36">
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Contact Us
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="mailto:luxuriouswatchesinfo@gmail.com"
                      className="hover:underline"
                    >
                      luxuriouswatchesinfo@gmail.com
                    </a>
                  </li>
                  <li>1111-2222-3333</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Location
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Al Shafar Building 7 - 117 Al Wasl Rd</li>
                  <li>Al Bada'a - Jumeirah 1</li>
                  <li>Dubai - United Arab Emirates</li>
                  <li>
                    <a
                      href="/location"
                      className="hover:underline text-black font-medium"
                    >
                      View Store Details →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-row items-end justify-between border-t border-gray-200 pt-8">
              <div className="mb-0">
                <span className="font-bold text-lg text-gray-900">Luxe</span>
                <p className="text-xs text-gray-500 mt-2">
                  Curated Luxury Timepieces
                  <br />
                  Exceptional Watches for Discerning Collectors
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-4 text-xs text-gray-400">
                  <a href="#" className="hover:underline">
                    Disclaimer
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  © 2025 Luxe, All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="block md:hidden">
          <div
            className="h-[40vh] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/28697832/pexels-photo-28697832/free-photo-of-elegant-display-of-luxury-watches-in-retail-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            }}
          ></div>

          {/* Contact Section - Integrated */}
          <div className="bg-[#232323] mx-4 -mt-30 relative z-10 rounded-lg shadow-xl p-6 flex flex-col items-center text-center text-white mb-12">
            <h2 className="text-xl font-light mb-4 tracking-wide">
              PLACE YOUR
              <br />
              ORDER TODAY
            </h2>
            <p className="mb-6 text-gray-300 text-sm">
              To order your dream watch, whatsapp us at
            </p>
            <h1 className="text-xl font-light mb-4 tracking-wide">
              +1 1111-2222-3333
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <button
                type="submit"
                className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M6 16L16 6M16 6H7M16 6V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="text-sm">Click to Chat</p>
            </div>
            <hr className="w-full border-gray-700 mb-4 mt-6" />
            <p className="text-xs text-gray-400">
              Our customer service is available 24/7.
            </p>
          </div>

          {/* Footer Links */}
          <div className="px-4">
            <div className="grid grid-cols-1 gap-8 mb-12">
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Contact Us
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="mailto:luxuriouswatchesinfo@gmail.com"
                      className="hover:underline"
                    >
                      luxuriouswatchesinfo@gmail.com
                    </a>
                  </li>
                  <li>1111-2222-3333</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900 uppercase text-xs tracking-widest">
                  Location
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Al Shafar Building 7 - 117 Al Wasl Rd</li>
                  <li>Al Bada'a - Jumeirah 1</li>
                  <li>Dubai - United Arab Emirates</li>
                  <li>
                    <a
                      href="/location"
                      className="hover:underline text-black font-medium"
                    >
                      View Store Details →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col border-t border-gray-200 pt-8">
              <div className="mb-8">
                <span className="font-bold text-lg text-gray-900">Luxe</span>
                <p className="text-xs text-gray-500 mt-2">
                  Curated Luxury Timepieces
                  <br />
                  Exceptional Watches for Discerning Collectors
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 text-xs text-gray-400">
                  <a href="#" className="hover:underline">
                    Disclaimer
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  © 2025 Luxe, All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
