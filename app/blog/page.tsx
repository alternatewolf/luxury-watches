import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

const blogPosts = [
  {
    slug: "the-art-of-watchmaking",
    title: "The Art of Watchmaking",
    subtitle:
      "Discover the intricate craftsmanship behind every luxury timepiece",
    image: "/images/photo_4_2025-05-22_19-27-23.png",
    author: "Master Horologist",
    date: "January 15, 2025",
    readTime: "8 min read",
    excerpt:
      "In the world of luxury timepieces, every tick of the second hand represents centuries of accumulated knowledge, passion, and artistry. The art of watchmaking is not merely about assembling components—it's about breathing life into mechanical poetry that will outlast generations.",
  },
  {
    slug: "investment-value",
    title: "Investment Value",
    subtitle: "Understanding the long-term value of luxury timepieces",
    image: "/images/photo_5_2025-05-22_19-27-23.png",
    author: "Investment Specialist",
    date: "January 12, 2025",
    readTime: "6 min read",
    excerpt:
      "In an era of digital everything, luxury mechanical watches have emerged as one of the most compelling alternative investments. Unlike stocks or bonds, these tangible assets offer the unique combination of personal enjoyment and potential financial appreciation.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white pt-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-bodoni text-4xl md:text-6xl font-light mb-6 tracking-wide">
            Watch Stories
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Explore the fascinating world of luxury timepieces through our
            curated collection of stories, insights, and expertise.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>

                <div className="space-y-4">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div>
                    <h2 className="font-bodoni text-2xl md:text-3xl font-light mb-2 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-lg mb-4">
                      {post.subtitle}
                    </p>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-4">
                    <span className="text-black font-medium border-b border-black pb-1 group-hover:border-gray-600 transition-colors">
                      Read Full Article →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gray-50 p-12 rounded-lg">
            <h3 className="font-bodoni text-3xl font-light mb-4">
              Discover Our Collection
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to explore luxury timepieces? Browse our carefully curated
              collection of exceptional watches from the world's most
              prestigious manufacturers.
            </p>
            <Link
              href="/shop"
              prefetch={false}
              className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              Browse Watches
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
