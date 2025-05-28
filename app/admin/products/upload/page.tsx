"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createProduct,
  getProductReferenceData,
} from "@/app/actions/product-actions";
import MultiImageUpload from "@/app/components/MultiImageUpload";
import Image from "next/image";

export default function ProductUploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [referenceData, setReferenceData] = useState<any>(null);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [showJsonInput, setShowJsonInput] = useState(false);

  // Fetch reference data for dropdowns when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductReferenceData();
        setReferenceData(data);
      } catch (err) {
        console.error("Error fetching reference data:", err);
        setError("Failed to load reference data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (images: any[]) => {
    setUploadedImages(images);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const formObject: Record<string, any> = {};

      // Convert FormData to object
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Add images to form data
      formObject.images = uploadedImages;

      // Convert complications array if present
      if (formObject.complications) {
        if (!Array.isArray(formObject.complications)) {
          formObject.complications = [formObject.complications];
        }
      }

      // Convert boolean values
      formObject.isFeatured = formObject.isFeatured === "on";

      const result = await createProduct(formObject);

      if (result.success) {
        setSuccess(true);
        // Reset form
        e.currentTarget.reset();
        setUploadedImages([]);
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(
          typeof result.error === "string"
            ? result.error
            : "Failed to create product. Please try again."
        );
        console.error(result.error);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred while creating the product.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestData = () => {
    const form = document.querySelector("form") as HTMLFormElement;
    if (!form) return;

    const testData = {
      name: "Rolex Submariner Date",
      modelNumber: "126610LN",
      sku: "ROLEX-SUB-126610LN",
      brandId: "Rolex",
      price: "10500",
      discountPrice: "9999",
      collectionSeries: "Submariner",
      descriptionShort:
        "The Rolex Submariner Date is the reference among diving watches. Waterproof to a depth of 300 metres.",
      descriptionLong:
        "The Rolex Submariner Date is the reference among diving watches. Waterproof to a depth of 300 metres, it features a unidirectional rotatable bezel with Cerachrom insert and graduated scale. The Submariner Date is equipped with a self-winding mechanical movement, the Calibre 3235, entirely developed and manufactured by Rolex. The movement is fitted with a Parachrom hairspring, offering great resistance to shocks and to magnetic fields.",
      caseShape: "Round",
      caseBack: "Solid",
      waterResistanceM: "300m / 30 ATM",
      dialColorId: "Black",
      dialTypeMarkers: "Luminous Hour Markers",
      dialDetails: "Chromalight display with long-lasting blue luminescence",
      crystalMaterialId: "Sapphire Crystal",
      crystalFeatures: "Cyclops lens over the date",
      bezelMaterialId: "Ceramic",
      bezelType: "Unidirectional Rotating",
      caseMaterialDetails: "Oystersteel with polished finish",
      caseDiameterMm: "41",
      caseThicknessMm: "12.5",
      lugWidthMm: "20",
      crownDetails: "Triplock triple waterproofness system",
      movementType: "Automatic",
      movementCaliber: "3235",
      powerReserveHours: "70",
      numberOfJewels: "31",
      condition: "New",
      yearOfManufacture: "2023",
      purchaseYear: "2023",
      box: "Original Rolex Box",
      papers: "Rolex Warranty Card",
      warrantyDetails: "5 Year International Warranty",
      certifications: "COSC Certified",
      countryOfOrigin: "Switzerland",
      manufacturerDetails: "Rolex SA",
      packerDetails: "Rolex SA",
      importerDetails: "Rolex USA",
      videoUrl: "https://www.youtube.com/watch?v=example",
      stockQuantity: "1",
      availabilityStatus: "In Stock",
      metaTitle: "Rolex Submariner Date 126610LN - Luxury Diving Watch",
      metaDescription:
        "Discover the iconic Rolex Submariner Date, a professional diving watch waterproof to 300 metres. Features include a unidirectional rotatable bezel and Chromalight display.",
      metaKeywords:
        "Rolex, Submariner, diving watch, luxury watch, automatic watch",
      slug: "rolex-submariner-date-126610ln",
    };

    // Fill all text inputs
    Object.entries(testData).forEach(([key, value]) => {
      const input = form.elements.namedItem(key) as HTMLInputElement;
      if (input) {
        input.value = value;
      }
    });

    // Set gender
    const genderSelect = form.elements.namedItem("gender") as HTMLSelectElement;
    if (genderSelect) {
      genderSelect.value = "MENS";
    }

    // Set watch style if available
    if (referenceData?.watchStyles?.length > 0) {
      const watchStyleSelect = form.elements.namedItem(
        "watchStyleId"
      ) as HTMLSelectElement;
      if (watchStyleSelect) {
        watchStyleSelect.value = referenceData.watchStyles[0].id;
      }
    }
  };

  const handleJsonSubmit = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const form = document.querySelector("form") as HTMLFormElement;
      if (!form) return;

      // Map JSON data to form fields
      Object.entries(jsonData).forEach(([key, value]) => {
        const input = form.elements.namedItem(key) as HTMLInputElement;
        if (input) {
          if (input.type === "checkbox") {
            input.checked = Boolean(value);
          } else if (input.type === "number") {
            // Handle numeric values
            if (value === null || value === undefined) {
              input.value = "";
            } else {
              // Convert to number and handle decimal places
              const numValue = Number(value);
              if (!isNaN(numValue)) {
                // For price fields, keep 2 decimal places
                if (key === "price" || key === "discountPrice") {
                  input.value = numValue.toFixed(2);
                } else {
                  // For other numeric fields, keep original precision
                  input.value = numValue.toString();
                }
              }
            }
          } else {
            // Handle other types
            if (value === null || value === undefined) {
              input.value = "";
            } else if (Array.isArray(value)) {
              input.value = value.join(",");
            } else {
              input.value = String(value);
            }
          }
        }
      });

      // Handle special cases
      if (jsonData.complications) {
        const complicationsInput = form.elements.namedItem(
          "complications"
        ) as HTMLInputElement;
        if (complicationsInput) {
          complicationsInput.value = Array.isArray(jsonData.complications)
            ? jsonData.complications.join(",")
            : String(jsonData.complications);
        }
      }

      setShowJsonInput(false);
      setJsonInput("");
    } catch (error) {
      setError("Invalid JSON format. Please check your input.");
      console.error("JSON parsing error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upload New Watch</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowJsonInput(!showJsonInput)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {showJsonInput ? "Hide JSON Input" : "Show JSON Input"}
          </button>
          <button
            type="button"
            onClick={fillTestData}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Fill Test Data
          </button>
        </div>
      </div>

      {showJsonInput && (
        <div className="mb-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">JSON Input</h2>
          <div className="space-y-4">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 p-4 border rounded-md font-mono text-sm"
              placeholder="Paste your JSON data here..."
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleJsonSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Map JSON to Form
              </button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Product created successfully!</p>
            <p className="text-sm">
              You can now add another product or view the product list.
            </p>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="text-green-700 hover:text-green-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form sections will go here */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Product Images</h2>
          <p className="text-sm text-gray-500 mb-4">
            Upload product images. The first image will be used as the primary
            display image.
          </p>
          <MultiImageUpload onChange={handleImageChange} maxImages={10} />

          {uploadedImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">
                Uploaded Images ({uploadedImages.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.altText || `Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Watch Name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="modelNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Model Number*
              </label>
              <input
                type="text"
                name="modelNumber"
                id="modelNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-700"
              >
                SKU
              </label>
              <input
                type="text"
                name="sku"
                id="sku"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="brandId"
                className="block text-sm font-medium text-gray-700"
              >
                Brand*
              </label>
              <input
                type="text"
                name="brandId"
                id="brandId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Rolex, Omega, Patek Philippe"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price*
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="discountPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Discount Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  min="0"
                  step="0.01"
                  className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="MENS">Men's</option>
                <option value="WOMENS">Women's</option>
                <option value="UNISEX">Unisex</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="watchStyleId"
                className="block text-sm font-medium text-gray-700"
              >
                Watch Style
              </label>
              <select
                name="watchStyleId"
                id="watchStyleId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select Style</option>
                {referenceData?.watchStyles?.map((style: any) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="collectionSeries"
                className="block text-sm font-medium text-gray-700"
              >
                Collection/Series
              </label>
              <input
                type="text"
                name="collectionSeries"
                id="collectionSeries"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Datejust, Seamaster"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Description</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="descriptionShort"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
              </label>
              <textarea
                name="descriptionShort"
                id="descriptionShort"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Brief description of the watch"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="descriptionLong"
                className="block text-sm font-medium text-gray-700"
              >
                Detailed Description
              </label>
              <textarea
                name="descriptionLong"
                id="descriptionLong"
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Comprehensive description with all important details"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Physical Attributes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Physical Attributes</h2>

          {/* Case Details */}
          <h3 className="font-medium text-gray-900 mb-2">Case Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="caseMaterialId"
                className="block text-sm font-medium text-gray-700"
              >
                Case Material
              </label>
              <select
                name="caseMaterialId"
                id="caseMaterialId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select Material</option>
                {referenceData?.materials?.map((material: any) => (
                  <option key={material.id} value={material.id}>
                    {material.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="caseDiameterMm"
                className="block text-sm font-medium text-gray-700"
              >
                Case Diameter (mm)
              </label>
              <input
                type="number"
                name="caseDiameterMm"
                id="caseDiameterMm"
                step="0.1"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="caseThicknessMm"
                className="block text-sm font-medium text-gray-700"
              >
                Case Thickness (mm)
              </label>
              <input
                type="number"
                name="caseThicknessMm"
                id="caseThicknessMm"
                step="0.1"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="caseShape"
                className="block text-sm font-medium text-gray-700"
              >
                Case Shape
              </label>
              <input
                type="text"
                name="caseShape"
                id="caseShape"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Round, Square"
              />
            </div>

            <div>
              <label
                htmlFor="caseBack"
                className="block text-sm font-medium text-gray-700"
              >
                Case Back
              </label>
              <input
                type="text"
                name="caseBack"
                id="caseBack"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Solid, Exhibition"
              />
            </div>

            <div>
              <label
                htmlFor="waterResistanceM"
                className="block text-sm font-medium text-gray-700"
              >
                Water Resistance
              </label>
              <input
                type="text"
                name="waterResistanceM"
                id="waterResistanceM"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., 100m / 10 ATM"
              />
            </div>
          </div>

          {/* Dial Details */}
          <h3 className="font-medium text-gray-900 mb-2">Dial Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label
                htmlFor="dialColorId"
                className="block text-sm font-medium text-gray-700"
              >
                Dial Color
              </label>
              <input
                type="text"
                name="dialColorId"
                id="dialColorId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Black, Silver, Blue"
              />
            </div>

            <div>
              <label
                htmlFor="dialTypeMarkers"
                className="block text-sm font-medium text-gray-700"
              >
                Dial Type/Markers
              </label>
              <input
                type="text"
                name="dialTypeMarkers"
                id="dialTypeMarkers"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Sunburst, Arabic Numerals"
              />
            </div>

            <div>
              <label
                htmlFor="dialDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Dial Details
              </label>
              <input
                type="text"
                name="dialDetails"
                id="dialDetails"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., 18 ct gold hour markers"
              />
            </div>
          </div>

          {/* Crystal & Bezel */}
          <h3 className="font-medium text-gray-900 mb-2">Crystal & Bezel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="crystalMaterialId"
                className="block text-sm font-medium text-gray-700"
              >
                Crystal Material
              </label>
              <input
                type="text"
                name="crystalMaterialId"
                id="crystalMaterialId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Sapphire Crystal"
              />
            </div>

            <div>
              <label
                htmlFor="crystalFeatures"
                className="block text-sm font-medium text-gray-700"
              >
                Crystal Features
              </label>
              <input
                type="text"
                name="crystalFeatures"
                id="crystalFeatures"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Cyclops lens over the date"
              />
            </div>

            <div>
              <label
                htmlFor="bezelMaterialId"
                className="block text-sm font-medium text-gray-700"
              >
                Bezel Material
              </label>
              <input
                type="text"
                name="bezelMaterialId"
                id="bezelMaterialId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Ceramic, Stainless Steel"
              />
            </div>

            <div>
              <label
                htmlFor="bezelType"
                className="block text-sm font-medium text-gray-700"
              >
                Bezel Type
              </label>
              <input
                type="text"
                name="bezelType"
                id="bezelType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Fixed, Unidirectional Rotating"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
