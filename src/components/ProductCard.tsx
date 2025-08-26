"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/app/products/page";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group cursor-pointer block"
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-none mb-4">
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 p-2 bg-transparent hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted
                ? "fill-gray-800 text-gray-800"
                : "text-gray-400 hover:text-gray-800"
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Product Image */}
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </div>

        {/* QUICKVIEW Button */}
        <div className="absolute bottom-0 left-0 right-0">
          <button className="w-full py-3 bg-white text-gray-900 text-sm font-medium uppercase tracking-wider border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            QUICKVIEW
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {/* Product Name */}
        <h3 className="text-sm font-normal text-gray-900 line-clamp-2">
          {product.name}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
