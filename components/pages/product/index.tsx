"use client";

import React, { useState } from "react";
import { Product } from "@/type/product"; // Sesuaikan path import
import { Search, Star } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductClick,
}) => {
  // State untuk menyimpan teks pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi Format Mata Uang (IDR)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Logika Filter Produk berdasarkan nama
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* === HEADER & FILTER === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>
            <p className="text-gray-500 mt-1">
              Temukan produk terbaik untuk Anda
            </p>
          </div>

          {/* Textfield Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm"
            />
          </div>
        </div>

        {/* === KONDISI JIKA PRODUK TIDAK DITEMUKAN === */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">
              Oops, produk "{searchQuery}" tidak ditemukan.
            </p>
          </div>
        )}

        {/* === GRID LIST PRODUK === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            // Hitung persentase diskon untuk masing-masing card
            const discountPercentage = Math.round(
              ((product.price - product.discountPrice) / product.price) * 100,
            );

            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                // --- ANIMASI HOVER DI SINI ---
                // hover:-translate-y-2 (mengangkat card)
                // hover:shadow-xl (mempertebal bayangan)
                // transition-all duration-300 (membuat transisi mulus)
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
              >
                {/* Bagian Gambar */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    // Animasi zoom halus pada gambar saat card di hover
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {discountPercentage > 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Bagian Info Produk */}
                <div className="p-5 flex flex-col grow">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating Bintang */}
                  <div className="flex items-center mb-3 mt-1">
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 ml-1.5">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col">
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(product.discountPrice)}
                    </span>
                    {product.discountPrice < product.price && (
                      <span className="text-xs text-gray-400 line-through mt-0.5">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
