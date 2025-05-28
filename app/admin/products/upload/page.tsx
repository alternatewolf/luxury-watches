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

  const handleImageReorder = (dragIndex: number, hoverIndex: number) => {
    const draggedImage = uploadedImages[dragIndex];
    const newImages = [...uploadedImages];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    setUploadedImages(newImages);
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
      movementType: "AUTOMATIC",
      movementCaliber: "3235",
      powerReserveHours: "70",
      numberOfJewels: "31",
      condition: "NEW",
      yearOfManufacture: "2023",
      purchaseYear: "2023",
      box: "ORIGINAL",
      papers: "ORIGINAL",
      warrantyDetails: "5 Year International Warranty",
      certifications: "COSC Certified",
      countryOfOrigin: "Switzerland",
      manufacturerDetails: "Rolex SA",
      packerDetails: "Rolex SA",
      importerDetails: "Rolex USA",
      videoUrl: "https://www.youtube.com/watch?v=example",
      stockQuantity: "1",
      availabilityStatus: "IN_STOCK",
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Upload New Watch
            </h1>
            <p className="text-gray-600 mt-2">
              Add a new luxury watch to your inventory
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowJsonInput(!showJsonInput)}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {showJsonInput ? "Hide JSON Input" : "Show JSON Input"}
            </button>
            <button
              type="button"
              onClick={fillTestData}
              className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Fill Test Data
            </button>
          </div>
        </div>

        {showJsonInput && (
          <div className="mb-8 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              JSON Input
            </h2>
            <div className="space-y-4">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste your JSON data here..."
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleJsonSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Map JSON to Form
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="font-semibold">Product created successfully!</p>
              <p className="text-sm text-green-700">
                You can now add another product or view the product list.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="text-green-600 hover:text-green-800 transition-colors"
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
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6 shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Images Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Product Images
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Upload product images. The first image will be used as the primary
              display image. Drag and drop to reorder.
            </p>
            <MultiImageUpload onChange={handleImageChange} maxImages={10} />

            {uploadedImages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-4 text-gray-900">
                  Uploaded Images ({uploadedImages.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="relative group cursor-move"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", index.toString());
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const dragIndex = parseInt(
                          e.dataTransfer.getData("text/plain")
                        );
                        handleImageReorder(dragIndex, index);
                      }}
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-colors">
                        <Image
                          src={image.url}
                          alt={image.altText || `Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                          Primary
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Basic Information Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Watch Name*
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex Submariner Date"
                />
              </div>

              <div>
                <label
                  htmlFor="modelNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Model Number*
                </label>
                <input
                  type="text"
                  name="modelNumber"
                  id="modelNumber"
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., 126610LN"
                />
              </div>

              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  id="sku"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., ROLEX-SUB-126610LN"
                />
              </div>

              <div>
                <label
                  htmlFor="brandId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Brand*
                </label>
                <input
                  type="text"
                  name="brandId"
                  id="brandId"
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex, Omega, Patek Philippe"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price*
                </label>
                <div className="relative rounded-lg shadow-sm">
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
                    className="block w-full pl-7 pr-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Discount Price
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="discountPrice"
                    id="discountPrice"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Watch Style
                </label>
                <select
                  name="watchStyleId"
                  id="watchStyleId"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Collection/Series
                </label>
                <input
                  type="text"
                  name="collectionSeries"
                  id="collectionSeries"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Datejust, Seamaster"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Description
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="descriptionShort"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Short Description
                </label>
                <textarea
                  name="descriptionShort"
                  id="descriptionShort"
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Brief description of the watch"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="descriptionLong"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Detailed Description
                </label>
                <textarea
                  name="descriptionLong"
                  id="descriptionLong"
                  rows={6}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Comprehensive description with all important details"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Condition & Provenance Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Condition & Provenance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Condition*
                </label>
                <select
                  name="condition"
                  id="condition"
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select Condition</option>
                  <option value="NEW">New</option>
                  <option value="UNWORN">Unworn</option>
                  <option value="MINT">Mint</option>
                  <option value="EXCELLENT">Excellent</option>
                  <option value="VERY_GOOD">Very Good</option>
                  <option value="GOOD">Good</option>
                  <option value="VINTAGE">Vintage</option>
                  <option value="USED">Used</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="yearOfManufacture"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Year of Manufacture
                </label>
                <input
                  type="text"
                  name="yearOfManufacture"
                  id="yearOfManufacture"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., 2023, Circa 1995"
                />
              </div>

              <div>
                <label
                  htmlFor="purchaseYear"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Purchase Year
                </label>
                <input
                  type="number"
                  name="purchaseYear"
                  id="purchaseYear"
                  min="1900"
                  max="2030"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="2023"
                />
              </div>

              <div>
                <label
                  htmlFor="box"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Box
                </label>
                <select
                  name="box"
                  id="box"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="NONE">No Box</option>
                  <option value="ORIGINAL">Original Box</option>
                  <option value="GENERIC">Generic Box</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="papers"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Papers
                </label>
                <select
                  name="papers"
                  id="papers"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="NONE">No Papers</option>
                  <option value="ORIGINAL">Original Papers</option>
                  <option value="SERVICE_PAPERS">Service Papers</option>
                  <option value="WARRANTY_CARD">Warranty Card</option>
                  <option value="GENERIC">Generic Papers</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="warrantyDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Warranty Details
                </label>
                <input
                  type="text"
                  name="warrantyDetails"
                  id="warrantyDetails"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., 5 Year International Warranty"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label
                  htmlFor="certifications"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Certifications
                </label>
                <input
                  type="text"
                  name="certifications"
                  id="certifications"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., COSC Certified, Superlative Chronometer (comma separated)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple certifications with commas
                </p>
              </div>
            </div>
          </div>

          {/* Physical Attributes Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Physical Attributes
            </h2>

            {/* Case Details */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Case Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="caseMaterialId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Case Material
                  </label>
                  <select
                    name="caseMaterialId"
                    id="caseMaterialId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Case Diameter (mm)
                  </label>
                  <input
                    type="number"
                    name="caseDiameterMm"
                    id="caseDiameterMm"
                    step="0.1"
                    min="0"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., 41"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caseThicknessMm"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Case Thickness (mm)
                  </label>
                  <input
                    type="number"
                    name="caseThicknessMm"
                    id="caseThicknessMm"
                    step="0.1"
                    min="0"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., 12.5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caseShape"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Case Shape
                  </label>
                  <input
                    type="text"
                    name="caseShape"
                    id="caseShape"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Round, Square, Tonneau"
                  />
                </div>

                <div>
                  <label
                    htmlFor="caseBack"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Case Back
                  </label>
                  <input
                    type="text"
                    name="caseBack"
                    id="caseBack"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Solid, Exhibition, Screw-down"
                  />
                </div>

                <div>
                  <label
                    htmlFor="waterResistanceM"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Water Resistance
                  </label>
                  <input
                    type="text"
                    name="waterResistanceM"
                    id="waterResistanceM"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., 300m / 30 ATM"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="caseMaterialDetails"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Case Material Details
                  </label>
                  <input
                    type="text"
                    name="caseMaterialDetails"
                    id="caseMaterialDetails"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Oystersteel with polished finish"
                  />
                </div>
              </div>
            </div>

            {/* Dial Details */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Dial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="dialColorId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Dial Color
                  </label>
                  <input
                    type="text"
                    name="dialColorId"
                    id="dialColorId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Black, Silver, Blue"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dialTypeMarkers"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Dial Type/Markers
                  </label>
                  <input
                    type="text"
                    name="dialTypeMarkers"
                    id="dialTypeMarkers"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Sunburst, Arabic Numerals, Luminous Hour Markers"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label
                    htmlFor="dialDetails"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Dial Details
                  </label>
                  <input
                    type="text"
                    name="dialDetails"
                    id="dialDetails"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., 18 ct gold hour markers, Chromalight display"
                  />
                </div>
              </div>
            </div>

            {/* Crystal & Bezel */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Crystal & Bezel
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="crystalMaterialId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Crystal Material
                  </label>
                  <input
                    type="text"
                    name="crystalMaterialId"
                    id="crystalMaterialId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Sapphire Crystal, Mineral Glass"
                  />
                </div>

                <div>
                  <label
                    htmlFor="crystalFeatures"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Crystal Features
                  </label>
                  <input
                    type="text"
                    name="crystalFeatures"
                    id="crystalFeatures"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Cyclops lens over the date, Anti-reflective coating"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bezelMaterialId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bezel Material
                  </label>
                  <input
                    type="text"
                    name="bezelMaterialId"
                    id="bezelMaterialId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Ceramic, Stainless Steel, Gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bezelType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bezel Type
                  </label>
                  <input
                    type="text"
                    name="bezelType"
                    id="bezelType"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Fixed, Unidirectional Rotating, Bidirectional"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="bezelDescription"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bezel Description
                  </label>
                  <input
                    type="text"
                    name="bezelDescription"
                    id="bezelDescription"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Fluted, Tachymeter Scale, Graduated 60-minute scale"
                  />
                </div>
              </div>
            </div>

            {/* Bracelet/Strap & Clasp */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Bracelet/Strap & Clasp
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="braceletStrapMaterialId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bracelet/Strap Material
                  </label>
                  <select
                    name="braceletStrapMaterialId"
                    id="braceletStrapMaterialId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                    htmlFor="braceletStrapColorId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bracelet/Strap Color
                  </label>
                  <input
                    type="text"
                    name="braceletStrapColorId"
                    id="braceletStrapColorId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Black, Brown, Silver"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lugWidthMm"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Lug Width (mm)
                  </label>
                  <input
                    type="number"
                    name="lugWidthMm"
                    id="lugWidthMm"
                    min="0"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., 20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="claspTypeId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Clasp Type
                  </label>
                  <select
                    name="claspTypeId"
                    id="claspTypeId"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Clasp Type</option>
                    {referenceData?.claspTypes?.map((clasp: any) => (
                      <option key={clasp.id} value={clasp.id}>
                        {clasp.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 lg:col-span-2">
                  <label
                    htmlFor="braceletStyleDescription"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bracelet Style Description
                  </label>
                  <input
                    type="text"
                    name="braceletStyleDescription"
                    id="braceletStyleDescription"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Oyster, flat three-piece links"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="claspDetails"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Clasp Details
                  </label>
                  <input
                    type="text"
                    name="claspDetails"
                    id="claspDetails"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Folding Oysterclasp with Easylink 5 mm comfort extension link"
                  />
                </div>
              </div>
            </div>

            {/* Crown Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Crown Details
              </h3>
              <div>
                <label
                  htmlFor="crownDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Crown Details
                </label>
                <input
                  type="text"
                  name="crownDetails"
                  id="crownDetails"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Screw-down, Twinlock double waterproofness system"
                />
              </div>
            </div>
          </div>

          {/* Movement Details Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Movement Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="movementType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Movement Type
                </label>
                <select
                  name="movementType"
                  id="movementType"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select Movement Type</option>
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="MANUAL_WINDING">Manual Winding</option>
                  <option value="QUARTZ">Quartz</option>
                  <option value="SPRING_DRIVE">Spring Drive</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="movementCaliber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Movement Caliber
                </label>
                <input
                  type="text"
                  name="movementCaliber"
                  id="movementCaliber"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Calibre 3235, ETA 2824-2"
                />
              </div>

              <div>
                <label
                  htmlFor="powerReserveHours"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Power Reserve
                </label>
                <input
                  type="text"
                  name="powerReserveHours"
                  id="powerReserveHours"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Approximately 70 hours, 42 hours"
                />
              </div>

              <div>
                <label
                  htmlFor="numberOfJewels"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Jewels
                </label>
                <input
                  type="number"
                  name="numberOfJewels"
                  id="numberOfJewels"
                  min="0"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., 31"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="complications"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Complications
                </label>
                <input
                  type="text"
                  name="complications"
                  id="complications"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Date, GMT, Chronograph (comma separated)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple complications with commas
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="countryOfOrigin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Country of Origin
                </label>
                <input
                  type="text"
                  name="countryOfOrigin"
                  id="countryOfOrigin"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Switzerland, Japan, Germany"
                />
              </div>

              <div>
                <label
                  htmlFor="manufacturerDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Manufacturer Details
                </label>
                <input
                  type="text"
                  name="manufacturerDetails"
                  id="manufacturerDetails"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex SA, Omega SA"
                />
              </div>

              <div>
                <label
                  htmlFor="packerDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Packer Details
                </label>
                <input
                  type="text"
                  name="packerDetails"
                  id="packerDetails"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex SA"
                />
              </div>

              <div>
                <label
                  htmlFor="importerDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Importer Details
                </label>
                <input
                  type="text"
                  name="importerDetails"
                  id="importerDetails"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex USA"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="videoUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  id="videoUrl"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="https://www.youtube.com/watch?v=example"
                />
              </div>
            </div>
          </div>

          {/* Inventory & Status Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Inventory & Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Stock Quantity*
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  id="stockQuantity"
                  required
                  min="0"
                  defaultValue="1"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="availabilityStatus"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Availability Status
                </label>
                <select
                  name="availabilityStatus"
                  id="availabilityStatus"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="IN_STOCK">In Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                  <option value="ON_ORDER">On Order</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="isFeatured"
                    name="isFeatured"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="isFeatured"
                    className="font-medium text-gray-700"
                  >
                    Featured Product
                  </label>
                  <p className="text-gray-500">
                    Display this product prominently on the homepage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              SEO & URL
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL Slug*
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., rolex-submariner-date-126610ln"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be used in the product URL. Use lowercase letters,
                  numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label
                  htmlFor="metaTitle"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  id="metaTitle"
                  maxLength={60}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex Submariner Date 126610LN - Luxury Diving Watch"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 50-60 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="metaDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  id="metaDescription"
                  rows={3}
                  maxLength={160}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Brief description for search engines (150-160 characters)"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 150-160 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="metaKeywords"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="metaKeywords"
                  id="metaKeywords"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Rolex, Submariner, diving watch, luxury watch, automatic watch"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Product...
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
