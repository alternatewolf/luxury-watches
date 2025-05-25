import {
  getProductBySlug,
  getProductRecommendations,
} from "@/app/actions/product-actions";
import { notFound } from "next/navigation";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";
import ProductRecommendations from "./ProductRecommendations";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const recommendations = await getProductRecommendations(product);

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="lg:sticky lg:top-8">
            <ProductImageGallery images={product.images} />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Product Recommendations */}
        <ProductRecommendations products={recommendations} />
      </div>
    </div>
  );
}
