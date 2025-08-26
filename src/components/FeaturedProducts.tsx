"use client";

import Image from "next/image";

interface FeaturedItem {
  id: string;
  title: string;
  image: string;
}

const FeaturedProducts = () => {
  const featuredItems: FeaturedItem[] = [
    {
      id: "design",
      title: "DESIGN",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "craftsmanship",
      title: "CRAFTSMANSHIP",
      image:
        "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "sustainability",
      title: "SUSTAINABILITY",
      image:
        "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900">
            FEATURED PRODUCTS
          </h2>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              {/* Tall Image */}
              <div className="relative overflow-hidden mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={500}
                  className="w-full h-96 md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-light tracking-[0.2em] text-gray-900">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
