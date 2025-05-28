"use client";

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

// Helper function to format condition names
function formatCondition(condition: string): string {
  switch (condition) {
    case "NEW":
      return "New";
    case "UNWORN":
      return "Unworn";
    case "MINT":
      return "Mint";
    case "EXCELLENT":
      return "Excellent";
    case "VERY_GOOD":
      return "Very Good";
    case "GOOD":
      return "Good";
    case "VINTAGE":
      return "Vintage";
    case "USED":
      return "Used";
    default:
      return condition;
  }
}

// Helper function to format inclusion options
function formatInclusion(inclusion: string): string {
  switch (inclusion) {
    case "ORIGINAL":
      return "Original";
    case "GENERIC":
      return "Generic";
    case "SERVICE_PAPERS":
      return "Service Papers";
    case "WARRANTY_CARD":
      return "Warranty Card";
    case "NONE":
      return "None";
    default:
      return inclusion;
  }
}

export default async function AdminPage() {
  // Fetch all products with their related data
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      images: {
        orderBy: {
          isPrimary: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your luxury watch inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Watches</h3>
            <p className="text-2xl font-bold text-gray-900">
              {products.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Published</h3>
            <p className="text-2xl font-bold text-green-600">
              {products.filter((p) => p.status === "PUBLISHED").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Draft</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {products.filter((p) => p.status === "DRAFT").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
            <p className="text-2xl font-bold text-gray-900">
              $
              {products
                .reduce((sum, p) => sum + Number(p.price), 0)
                .toLocaleString()}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">All Watches</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Watch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Box/Papers
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          {product.images[0]?.url ? (
                            <img
                              className="h-16 w-16 rounded-lg object-contain bg-gray-100"
                              src={product.images[0].url}
                              alt={product.name}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No Image
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.brand?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price?.toString() || "0"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {formatCondition(product.condition || "USED")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : product.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.yearOfManufacture || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div>Box: {formatInclusion(product.box || "NONE")}</div>
                        <div>
                          Papers: {formatInclusion(product.papers || "NONE")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/shop/${product.id}`}
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/edit/${product.id}`}
                          className="text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-md transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this watch?"
                              )
                            ) {
                              alert("Delete functionality coming soon!");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No watches found</div>
            <p className="text-gray-400 mt-2">
              Add your first watch to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
