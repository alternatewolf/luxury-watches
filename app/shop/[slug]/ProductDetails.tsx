"use client";

import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle } from "lucide-react";

type ProductDetailsProps = {
  product: Omit<
    Product,
    "price" | "discountPrice" | "caseDiameterMm" | "caseThicknessMm"
  > & {
    price: string;
    discountPrice: string | null;
    caseDiameterMm: string | null;
    caseThicknessMm: string | null;
    brand: { name: string };
    watchStyle?: { name: string };
    caseMaterial?: { name: string };
    dialColor?: { name: string };
    crystalMaterial?: { name: string };
    bezelMaterial?: { name: string };
    braceletStrapMaterial?: { name: string };
    braceletStrapColor?: { name: string };
    claspType?: { name: string };
    complications: { name: string }[];
    yearOfManufacture?: string;
    box?: string | null;
    papers?: string | null;
  };
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const handleWhatsAppClick = () => {
    const message = `Hello, I'm interested in the ${product.name} (${product.modelNumber}). Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Brand and Model */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {product.name}
        </h1>
        <p className="text-lg text-gray-500 mt-2">{product.brand.name}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4 border-b pb-6">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.discountPrice && (
          <span className="text-xl text-gray-500 line-through">
            {formatPrice(product.discountPrice)}
          </span>
        )}
      </div>

      {/* Quick Info */}
      <div className="flex flex-wrap gap-2 border-b pb-6">
        {product.gender && (
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {product.gender}
          </Badge>
        )}
        {product.watchStyle?.name && (
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {product.watchStyle.name}
          </Badge>
        )}
        {product.condition && (
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {product.condition}
          </Badge>
        )}
      </div>

      {/* Box & Papers */}
      <div className="border-b pb-6">
        <h2 className="text-xl font-semibold mb-4">Box & Papers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Box Status */}
          <div
            className={`rounded-lg p-4 border ${
              product.box && product.box !== "NONE"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.box && product.box !== "NONE"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></div>
              <div>
                <p className="font-semibold text-gray-900">
                  {product.box && product.box !== "NONE"
                    ? "Box Included"
                    : "No Box"}
                </p>
                <p className="text-sm text-gray-600">
                  {product.box && product.box !== "NONE"
                    ? product.box === "ORIGINAL"
                      ? "Original manufacturer box"
                      : product.box === "GENERIC"
                      ? "Generic presentation box"
                      : product.box
                    : "Watch sold without box"}
                </p>
              </div>
            </div>
          </div>

          {/* Papers Status */}
          <div
            className={`rounded-lg p-4 border ${
              product.papers && product.papers !== "NONE"
                ? "bg-blue-50 border-blue-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.papers && product.papers !== "NONE"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              ></div>
              <div>
                <p className="font-semibold text-gray-900">
                  {product.papers && product.papers !== "NONE"
                    ? "Papers Included"
                    : "No Papers"}
                </p>
                <p className="text-sm text-gray-600">
                  {product.papers && product.papers !== "NONE"
                    ? product.papers === "ORIGINAL"
                      ? "Original manufacturer papers"
                      : product.papers === "GENERIC"
                      ? "Generic documentation"
                      : product.papers === "SERVICE_PAPERS"
                      ? "Service documentation"
                      : product.papers === "WARRANTY_CARD"
                      ? "Warranty card included"
                      : product.papers
                    : "Watch sold without papers"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.descriptionShort && (
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {product.descriptionShort}
          </p>
        </div>
      )}

      {/* Specifications */}
      <div className="space-y-4 border-b pb-6">
        <h2 className="text-xl font-semibold">Specifications</h2>
        <div className="grid grid-cols-2 gap-6">
          {product.modelNumber && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Model Number</p>
              <p className="font-medium text-gray-900">{product.modelNumber}</p>
            </div>
          )}
          {product.caseDiameterMm && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Case Diameter</p>
              <p className="font-medium text-gray-900">
                {product.caseDiameterMm}mm
              </p>
            </div>
          )}
          {product.caseMaterial?.name && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Case Material</p>
              <p className="font-medium text-gray-900">
                {product.caseMaterial.name}
              </p>
            </div>
          )}
          {product.dialColor?.name && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Dial Color</p>
              <p className="font-medium text-gray-900">
                {product.dialColor.name}
              </p>
            </div>
          )}
          {product.movementType && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Movement</p>
              <p className="font-medium text-gray-900">
                {product.movementType}
              </p>
            </div>
          )}
          {product.waterResistanceM && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Water Resistance</p>
              <p className="font-medium text-gray-900">
                {product.waterResistanceM}
              </p>
            </div>
          )}
          {product.yearOfManufacture && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Year of Manufacture</p>
              <p className="font-medium text-gray-900">
                {product.yearOfManufacture}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Complications */}
      {product.complications.length > 0 && (
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-3">Complications</h2>
          <div className="flex flex-wrap gap-2">
            {product.complications.map((complication) => (
              <Badge
                key={complication.name}
                variant="outline"
                className="px-3 py-1 text-sm"
              >
                {complication.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Additional Details */}
      {product.descriptionLong && (
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-3">Additional Details</h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            {product.descriptionLong}
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="pt-6">
        <Button
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center gap-2"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="w-5 h-5" />
          Message us on WhatsApp
        </Button>
      </div>
    </div>
  );
}
