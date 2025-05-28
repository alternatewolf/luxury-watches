"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Types based on Prisma schema
type Brand = {
  id: string;
  name: string;
};

type Material = {
  id: string;
  name: string;
};

type Color = {
  id: string;
  name: string;
};

type WatchStyle = {
  id: string;
  name: string;
};

type ClaspType = {
  id: string;
  name: string;
};

type Complication = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  brandId: string;
  modelNumber: string;
  sku?: string;
  descriptionShort?: string;
  descriptionLong?: string;
  price: string;
  discountPrice?: string;
  currency: string;
  gender?: string;
  watchStyleId?: string;
  collectionSeries?: string;
  caseMaterialId?: string;
  caseMaterialDetails?: string;
  caseDiameterMm?: string;
  caseThicknessMm?: string;
  caseShape?: string;
  caseBack?: string;
  waterResistanceM?: string;
  dialColorId?: string;
  dialTypeMarkers?: string;
  dialDetails?: string;
  crystalMaterialId?: string;
  crystalFeatures?: string;
  bezelMaterialId?: string;
  bezelType?: string;
  bezelDescription?: string;
  braceletStrapMaterialId?: string;
  braceletStrapColorId?: string;
  braceletStyleDescription?: string;
  claspTypeId?: string;
  claspDetails?: string;
  lugWidthMm?: string;
  crownDetails?: string;
  movementType?: string;
  movementCaliber?: string;
  powerReserveHours?: string;
  numberOfJewels?: string;
  condition?: string;
  yearOfManufacture?: string;
  purchaseYear?: string;
  box?: string;
  papers?: string;
  warrantyDetails?: string;
  certifications: string[];
  countryOfOrigin?: string;
  manufacturerDetails?: string;
  packerDetails?: string;
  importerDetails?: string;
  hoverImg?: string;
  videoUrl?: string;
  stockQuantity: number;
  availabilityStatus: string;
  isFeatured: boolean;
  status: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  slug: string;
  complications: string[];
};

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [watchStyles, setWatchStyles] = useState<WatchStyle[]>([]);
  const [claspTypes, setClaspTypes] = useState<ClaspType[]>([]);
  const [complications, setComplications] = useState<Complication[]>([]);

  // Enum options
  const genderOptions = ["MENS", "WOMENS", "UNISEX"];
  const conditionOptions = [
    "NEW",
    "UNWORN",
    "MINT",
    "EXCELLENT",
    "VERY_GOOD",
    "GOOD",
    "VINTAGE",
    "USED",
  ];
  const itemInclusionOptions = [
    "ORIGINAL",
    "GENERIC",
    "SERVICE_PAPERS",
    "WARRANTY_CARD",
    "NONE",
  ];
  const availabilityStatusOptions = ["IN_STOCK", "OUT_OF_STOCK", "ON_ORDER"];
  const productStatusOptions = ["PUBLISHED", "DRAFT", "ARCHIVED"];
  const movementTypeOptions = [
    "AUTOMATIC",
    "MANUAL_WINDING",
    "QUARTZ",
    "SPRING_DRIVE",
  ];

  useEffect(() => {
    fetchData();
  }, [resolvedParams.id]);

  const fetchData = async () => {
    try {
      // Fetch product data
      const productRes = await fetch(
        `/api/admin/products/${resolvedParams.id}`
      );
      const productData = await productRes.json();
      setProduct(productData);

      // Fetch reference data
      const [
        brandsRes,
        materialsRes,
        colorsRes,
        watchStylesRes,
        claspTypesRes,
        complicationsRes,
      ] = await Promise.all([
        fetch("/api/admin/brands"),
        fetch("/api/admin/materials"),
        fetch("/api/admin/colors"),
        fetch("/api/admin/watch-styles"),
        fetch("/api/admin/clasp-types"),
        fetch("/api/admin/complications"),
      ]);

      setBrands(await brandsRes.json());
      setMaterials(await materialsRes.json());
      setColors(await colorsRes.json());
      setWatchStyles(await watchStylesRes.json());
      setClaspTypes(await claspTypesRes.json());
      setComplications(await complicationsRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error loading product data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        router.push("/admin");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProduct((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleArrayChange = (field: string, value: string) => {
    setProduct((prev) => {
      if (!prev) return null;
      const currentArray = (prev[field as keyof Product] as string[]) || [];
      const newArray = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      return { ...prev, [field]: newArray };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12 flex items-center justify-center">
        <div className="text-lg text-red-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Product
            </h1>
            <p className="text-gray-600">Update product information</p>
          </div>
          <Link
            href="/admin"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Admin
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <select
                  value={product.brandId}
                  onChange={(e) => handleInputChange("brandId", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Number *
                </label>
                <input
                  type="text"
                  value={product.modelNumber}
                  onChange={(e) =>
                    handleInputChange("modelNumber", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  value={product.sku || ""}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.discountPrice || ""}
                  onChange={(e) =>
                    handleInputChange("discountPrice", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  value={product.currency}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={product.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                value={product.descriptionShort || ""}
                onChange={(e) =>
                  handleInputChange("descriptionShort", e.target.value)
                }
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Description
              </label>
              <textarea
                value={product.descriptionLong || ""}
                onChange={(e) =>
                  handleInputChange("descriptionLong", e.target.value)
                }
                rows={5}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={product.gender || ""}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Watch Style
                </label>
                <select
                  value={product.watchStyleId || ""}
                  onChange={(e) =>
                    handleInputChange("watchStyleId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Watch Style</option>
                  {watchStyles.map((style) => (
                    <option key={style.id} value={style.id}>
                      {style.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Series
                </label>
                <input
                  type="text"
                  value={product.collectionSeries || ""}
                  onChange={(e) =>
                    handleInputChange("collectionSeries", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  value={product.condition || ""}
                  onChange={(e) =>
                    handleInputChange("condition", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Condition</option>
                  {conditionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Manufacture
                </label>
                <input
                  type="text"
                  value={product.yearOfManufacture || ""}
                  onChange={(e) =>
                    handleInputChange("yearOfManufacture", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Year
                </label>
                <input
                  type="number"
                  value={product.purchaseYear || ""}
                  onChange={(e) =>
                    handleInputChange("purchaseYear", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Box
                </label>
                <select
                  value={product.box || ""}
                  onChange={(e) => handleInputChange("box", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Box Status</option>
                  {itemInclusionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Papers
                </label>
                <select
                  value={product.papers || ""}
                  onChange={(e) => handleInputChange("papers", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Papers Status</option>
                  {itemInclusionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Case Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Case Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Material
                </label>
                <select
                  value={product.caseMaterialId || ""}
                  onChange={(e) =>
                    handleInputChange("caseMaterialId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Case Material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Material Details
                </label>
                <input
                  type="text"
                  value={product.caseMaterialDetails || ""}
                  onChange={(e) =>
                    handleInputChange("caseMaterialDetails", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Diameter (mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.caseDiameterMm || ""}
                  onChange={(e) =>
                    handleInputChange("caseDiameterMm", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Thickness (mm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.caseThicknessMm || ""}
                  onChange={(e) =>
                    handleInputChange("caseThicknessMm", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Shape
                </label>
                <input
                  type="text"
                  value={product.caseShape || ""}
                  onChange={(e) =>
                    handleInputChange("caseShape", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Back
                </label>
                <input
                  type="text"
                  value={product.caseBack || ""}
                  onChange={(e) =>
                    handleInputChange("caseBack", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Water Resistance
                </label>
                <input
                  type="text"
                  value={product.waterResistanceM || ""}
                  onChange={(e) =>
                    handleInputChange("waterResistanceM", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Dial Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Dial Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dial Color
                </label>
                <select
                  value={product.dialColorId || ""}
                  onChange={(e) =>
                    handleInputChange("dialColorId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Dial Color</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dial Type/Markers
                </label>
                <input
                  type="text"
                  value={product.dialTypeMarkers || ""}
                  onChange={(e) =>
                    handleInputChange("dialTypeMarkers", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dial Details
                </label>
                <input
                  type="text"
                  value={product.dialDetails || ""}
                  onChange={(e) =>
                    handleInputChange("dialDetails", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Crystal & Bezel */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Crystal & Bezel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crystal Material
                </label>
                <select
                  value={product.crystalMaterialId || ""}
                  onChange={(e) =>
                    handleInputChange("crystalMaterialId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Crystal Material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crystal Features
                </label>
                <input
                  type="text"
                  value={product.crystalFeatures || ""}
                  onChange={(e) =>
                    handleInputChange("crystalFeatures", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bezel Material
                </label>
                <select
                  value={product.bezelMaterialId || ""}
                  onChange={(e) =>
                    handleInputChange("bezelMaterialId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Bezel Material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bezel Type
                </label>
                <input
                  type="text"
                  value={product.bezelType || ""}
                  onChange={(e) =>
                    handleInputChange("bezelType", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bezel Description
                </label>
                <input
                  type="text"
                  value={product.bezelDescription || ""}
                  onChange={(e) =>
                    handleInputChange("bezelDescription", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Bracelet/Strap & Clasp */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Bracelet/Strap & Clasp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bracelet/Strap Material
                </label>
                <select
                  value={product.braceletStrapMaterialId || ""}
                  onChange={(e) =>
                    handleInputChange("braceletStrapMaterialId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bracelet/Strap Color
                </label>
                <select
                  value={product.braceletStrapColorId || ""}
                  onChange={(e) =>
                    handleInputChange("braceletStrapColorId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bracelet Style Description
                </label>
                <input
                  type="text"
                  value={product.braceletStyleDescription || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "braceletStyleDescription",
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clasp Type
                </label>
                <select
                  value={product.claspTypeId || ""}
                  onChange={(e) =>
                    handleInputChange("claspTypeId", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Clasp Type</option>
                  {claspTypes.map((clasp) => (
                    <option key={clasp.id} value={clasp.id}>
                      {clasp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clasp Details
                </label>
                <input
                  type="text"
                  value={product.claspDetails || ""}
                  onChange={(e) =>
                    handleInputChange("claspDetails", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lug Width (mm)
                </label>
                <input
                  type="number"
                  value={product.lugWidthMm || ""}
                  onChange={(e) =>
                    handleInputChange("lugWidthMm", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Movement Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Movement Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Movement Type
                </label>
                <select
                  value={product.movementType || ""}
                  onChange={(e) =>
                    handleInputChange("movementType", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Movement Type</option>
                  {movementTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Movement Caliber
                </label>
                <input
                  type="text"
                  value={product.movementCaliber || ""}
                  onChange={(e) =>
                    handleInputChange("movementCaliber", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Power Reserve (hours)
                </label>
                <input
                  type="text"
                  value={product.powerReserveHours || ""}
                  onChange={(e) =>
                    handleInputChange("powerReserveHours", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Jewels
                </label>
                <input
                  type="number"
                  value={product.numberOfJewels || ""}
                  onChange={(e) =>
                    handleInputChange("numberOfJewels", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complications (comma-separated)
                </label>
                <input
                  type="text"
                  value={product.complications.join(", ")}
                  onChange={(e) =>
                    handleArrayChange("complications", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Chronograph, Date, GMT"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crown Details
                </label>
                <input
                  type="text"
                  value={product.crownDetails || ""}
                  onChange={(e) =>
                    handleInputChange("crownDetails", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country of Origin
                </label>
                <input
                  type="text"
                  value={product.countryOfOrigin || ""}
                  onChange={(e) =>
                    handleInputChange("countryOfOrigin", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warranty Details
                </label>
                <input
                  type="text"
                  value={product.warrantyDetails || ""}
                  onChange={(e) =>
                    handleInputChange("warrantyDetails", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={product.videoUrl || ""}
                  onChange={(e) =>
                    handleInputChange("videoUrl", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications (comma-separated)
                </label>
                <input
                  type="text"
                  value={product.certifications.join(", ")}
                  onChange={(e) =>
                    handleArrayChange("certifications", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., COSC, Superlative Chronometer"
                />
              </div>
            </div>
          </div>

          {/* Inventory & Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Inventory & Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={product.stockQuantity}
                  onChange={(e) =>
                    handleInputChange(
                      "stockQuantity",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability Status
                </label>
                <select
                  value={product.availabilityStatus}
                  onChange={(e) =>
                    handleInputChange("availabilityStatus", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {availabilityStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Status
                </label>
                <select
                  value={product.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {productStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={product.isFeatured}
                    onChange={(e) =>
                      handleInputChange("isFeatured", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured Product
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={product.metaTitle || ""}
                  onChange={(e) =>
                    handleInputChange("metaTitle", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  value={product.metaDescription || ""}
                  onChange={(e) =>
                    handleInputChange("metaDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={product.metaKeywords || ""}
                  onChange={(e) =>
                    handleInputChange("metaKeywords", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin"
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
