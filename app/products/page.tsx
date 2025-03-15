"use client";
import React, { useState } from "react";
import { Search, Star, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type SkinConcern =
  | "dryness"
  | "acne"
  | "aging"
  | "sensitivity"
  | "pigmentation";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  ingredients: string[];
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hydrating Serum",
    brand: "SkinCare Plus",
    description: "Deep hydration with hyaluronic acid",
    price: 45,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80",
    ingredients: ["Hyaluronic Acid", "Glycerin", "Niacinamide"],
  },
  {
    id: "2",
    name: "Brightening Cream",
    brand: "GlowUp",
    description: "Vitamin C enriched brightening formula",
    price: 65,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=300&q=80",
    ingredients: ["Vitamin C", "Alpha Arbutin", "Peptides"],
  },
];

export default function ProductsPage() {
  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const concerns: { value: SkinConcern; label: string }[] = [
    { value: "dryness", label: "乾燥" },
    { value: "acne", label: "ニキビ" },
    { value: "aging", label: "エイジング" },
    { value: "sensitivity", label: "敏感肌" },
    { value: "pigmentation", label: "シミ" },
  ];

  const toggleConcern = (concern: SkinConcern) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                className="dark:invert"
                src="/logo.jpeg"
                alt="logo"
                width={180}
                height={38}
                priority
              />
            </div>
            <Link
              href="/"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <span>AIアシスタント</span>
              <LinkIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="商品名や成分を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Concerns Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            お悩みを選択してください
          </h2>
          <div className="flex flex-wrap gap-2">
            {concerns.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => toggleConcern(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedConcerns.includes(value)
                      ? "bg-pink-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-pink-50"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                    詳細を見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
