import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

// Blog posts data
const blogPosts = {
  "the-art-of-watchmaking": {
    title: "The Art of Watchmaking",
    subtitle:
      "Discover the intricate craftsmanship behind every luxury timepiece",
    image: "/images/photo_4_2025-05-22_19-27-23.png",
    author: "Master Horologist",
    date: "January 15, 2025",
    readTime: "8 min read",
    content: [
      {
        type: "paragraph",
        text: "In the world of luxury timepieces, every tick of the second hand represents centuries of accumulated knowledge, passion, and artistry. The art of watchmaking is not merely about assembling components—it's about breathing life into mechanical poetry that will outlast generations.",
      },
      {
        type: "heading",
        text: "The Foundation of Excellence",
      },
      {
        type: "paragraph",
        text: "At the heart of every exceptional timepiece lies the movement—the engine that drives time itself. Master watchmakers spend years perfecting their craft, learning to work with components so small that a single grain of dust can disrupt the entire mechanism. Each gear, spring, and jewel must be positioned with microscopic precision.",
      },
      {
        type: "paragraph",
        text: "The creation of a luxury watch movement can take anywhere from several months to over a year. Every component is meticulously crafted, often by hand, using techniques passed down through generations of artisans. The balance wheel, for instance, must be adjusted to oscillate at exactly 28,800 beats per hour—a testament to the incredible precision required in this ancient craft.",
      },
      {
        type: "heading",
        text: "The Human Touch in a Digital Age",
      },
      {
        type: "paragraph",
        text: "While modern technology has revolutionized many industries, the finest luxury watches still rely heavily on human expertise. Master watchmakers use tools that would be familiar to craftsmen from centuries past—loupes, tweezers, and steady hands guided by decades of experience.",
      },
      {
        type: "paragraph",
        text: "The decoration of watch movements is an art form in itself. Techniques like Geneva stripes, perlage, and anglage transform functional components into works of art. These finishing touches, often invisible to the casual observer, represent hours of painstaking work and demonstrate the manufacturer's commitment to excellence.",
      },
      {
        type: "heading",
        text: "Complications: The Pinnacle of Horological Art",
      },
      {
        type: "paragraph",
        text: "Beyond basic timekeeping, luxury watches often feature complications—additional functions that showcase the watchmaker's skill. From simple date displays to complex perpetual calendars, minute repeaters, and tourbillons, each complication adds layers of mechanical complexity.",
      },
      {
        type: "paragraph",
        text: "The most prestigious manufactures create grand complications—watches featuring multiple complex functions working in harmony. These timepieces can take years to complete and represent the absolute pinnacle of horological achievement.",
      },
      {
        type: "heading",
        text: "A Legacy of Time",
      },
      {
        type: "paragraph",
        text: "When you wear a luxury timepiece, you're not just wearing a watch—you're carrying a piece of history, a testament to human ingenuity, and a work of art that will continue to mark time long after we're gone. This is the true art of watchmaking: creating objects that transcend their utilitarian purpose to become eternal symbols of craftsmanship and beauty.",
      },
    ],
  },
  "investment-value": {
    title: "Investment Value",
    subtitle: "Understanding the long-term value of luxury timepieces",
    image: "/images/photo_5_2025-05-22_19-27-23.png",
    author: "Investment Specialist",
    date: "January 12, 2025",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "In an era of digital everything, luxury mechanical watches have emerged as one of the most compelling alternative investments. Unlike stocks or bonds, these tangible assets offer the unique combination of personal enjoyment and potential financial appreciation.",
      },
      {
        type: "heading",
        text: "The Fundamentals of Watch Investment",
      },
      {
        type: "paragraph",
        text: "Not all luxury watches are created equal when it comes to investment potential. The most successful watch investments typically share several key characteristics: prestigious brand heritage, limited production numbers, exceptional craftsmanship, and strong market demand.",
      },
      {
        type: "paragraph",
        text: "Brands like Rolex, Patek Philippe, and Audemars Piguet have consistently demonstrated strong value retention and appreciation over decades. Their watches often appreciate faster than inflation, making them effective hedges against economic uncertainty.",
      },
      {
        type: "heading",
        text: "Rarity and Exclusivity Drive Value",
      },
      {
        type: "paragraph",
        text: "The principle of supply and demand is particularly pronounced in the luxury watch market. Limited edition pieces, discontinued models, and watches with unique complications often command premium prices at auction. The Patek Philippe Nautilus, for example, has seen remarkable appreciation due to its limited availability and iconic design.",
      },
      {
        type: "paragraph",
        text: "Vintage pieces from respected manufacturers can be especially valuable, particularly those with interesting provenance or historical significance. A watch worn by a celebrity or associated with a significant event can command multiples of its original retail price.",
      },
      {
        type: "heading",
        text: "Market Performance and Trends",
      },
      {
        type: "paragraph",
        text: "The luxury watch market has shown remarkable resilience over the past decades. According to industry reports, certain segments have outperformed traditional investments like stocks and real estate. The key is understanding which brands and models have the strongest fundamentals.",
      },
      {
        type: "paragraph",
        text: "Sports watches from prestigious brands have been particularly strong performers. Models like the Rolex Submariner, GMT-Master, and Daytona have shown consistent appreciation, with some vintage examples selling for ten times their original retail price.",
      },
      {
        type: "heading",
        text: "Factors That Influence Value",
      },
      {
        type: "paragraph",
        text: "Several factors contribute to a watch's investment potential: condition (original papers and box significantly increase value), rarity, brand prestige, and market timing. Watches in excellent condition with complete documentation typically command the highest prices.",
      },
      {
        type: "paragraph",
        text: "The importance of authenticity cannot be overstated. The luxury watch market has unfortunately seen an increase in sophisticated counterfeits, making it crucial to purchase from reputable dealers who can guarantee authenticity.",
      },
      {
        type: "heading",
        text: "Building a Watch Portfolio",
      },
      {
        type: "paragraph",
        text: "Like any investment strategy, diversification is key. A well-balanced watch collection might include pieces from different eras, various complications, and multiple prestigious brands. This approach helps mitigate risk while maximizing potential returns.",
      },
      {
        type: "paragraph",
        text: "Remember, the best watch investments are often those you genuinely enjoy wearing. The pleasure derived from owning and wearing a beautiful timepiece adds intangible value that pure financial investments cannot provide. In the world of luxury watches, passion and profit can beautifully coexist.",
      },
    ],
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="font-bodoni text-4xl md:text-6xl font-light mb-6 tracking-wide">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              {post.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        {/* Article Meta */}
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-12 pb-6 border-b border-gray-200">
          <span>{post.date}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {post.content.map((section, index) => {
            if (section.type === "heading") {
              return (
                <h2
                  key={index}
                  className="font-bodoni text-2xl md:text-3xl font-light mt-12 mb-6 text-gray-900"
                >
                  {section.text}
                </h2>
              );
            }
            return (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-6 text-lg"
              >
                {section.text}
              </p>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gray-50 rounded-lg text-center">
          <h3 className="font-bodoni text-2xl font-light mb-4">
            Interested in Luxury Timepieces?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore our curated collection of exceptional watches
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            Browse Our Collection
          </Link>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: "the-art-of-watchmaking" }, { slug: "investment-value" }];
}
