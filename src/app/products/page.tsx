"use client";

import { useState } from "react";
import ProductFilter from "@/components/ProductFilter";
import ProductGrid from "@/components/ProductGrid";

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  availability: "in-stock" | "out-of-stock" | "pre-order";
  features: string[];
  shape: string;
  price: number;
  isFirstLook?: boolean;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Ezra Reclaimed Wood 3Dwr Console Table",
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "console",
    availability: "in-stock",
    features: ["reclaimed-wood", "handcrafted"],
    shape: "rectangular",
    price: 1299,
    isFirstLook: true,
  },
  {
    id: "2",
    name: "Mattai Reclaimed Wood 4Dwr Console",
    image:
      "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "console",
    availability: "in-stock",
    features: ["reclaimed-wood", "four-drawer"],
    shape: "rectangular",
    price: 1599,
    isFirstLook: true,
  },
  {
    id: "3",
    name: "Itsa Reclaimed Wood Bench",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "bench",
    availability: "in-stock",
    features: ["reclaimed-wood", "dining"],
    shape: "linear",
    price: 799,
    isFirstLook: true,
  },
  {
    id: "4",
    name: "Rustic Oak Dining Table",
    image:
      "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "table",
    availability: "in-stock",
    features: ["solid-wood", "dining"],
    shape: "rectangular",
    price: 2199,
  },
  {
    id: "5",
    name: "Modern Leather Armchair",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "chair",
    availability: "out-of-stock",
    features: ["leather", "modern"],
    shape: "curved",
    price: 1299,
  },
  {
    id: "6",
    name: "Industrial Metal Bookshelf",
    image:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "storage",
    availability: "pre-order",
    features: ["metal", "industrial"],
    shape: "rectangular",
    price: 899,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(sampleProducts);
  const [sortBy, setSortBy] = useState<string>("new");

  const handleFilterChange = (filters: {
    availability: string[];
    category: string[];
    features: string[];
    shape: string[];
  }) => {
    let filtered = [...products];

    // Apply availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter((product) =>
        filters.availability.includes(product.availability)
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    // Apply features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter((product) =>
        filters.features.some((feature) => product.features.includes(feature))
      );
    }

    // Apply shape filter
    if (filters.shape.length > 0) {
      filtered = filtered.filter((product) =>
        filters.shape.includes(product.shape)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "new":
      default:
        // Keep original order for "new"
        break;
    }

    setFilteredProducts(sorted);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-4">
            ALL PRODUCTS
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our complete collection of handcrafted furniture
          </p>
        </div>

        {/* Filter Component */}
        <ProductFilter
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          productCount={filteredProducts.length}
          sortBy={sortBy}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}
