import React, { useState } from "react";
import { CheckoutPayload, initialPayload, Product } from "@/type/product";
import { ArrowLeft, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { useCheckout } from "@/lib/httpCall/useCheckout";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
}) => {
  // State untuk quantity, default 1
  const [quantity, setQuantity] = useState<number>(1);
  const [payload, setPayload] = useState<CheckoutPayload>(initialPayload);

  // Batas maksimal stok (default 100 jika tidak ada data dari backend)
  const maxStock = product.stock || 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100,
  );

  // Logika Increment
  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Logika Decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Logika Input Manual (TextField)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    // Validasi: Hanya angka, minimal 1, maksimal stock
    if (!isNaN(value)) {
      if (value < 1) setQuantity(1);
      else if (value > maxStock) setQuantity(maxStock);
      else {
        setQuantity(value);
        setPayload((prev) => ({ ...prev, quantity: value }));
      }
    } else {
      // Jika input kosong atau bukan angka, reset ke 1
      setQuantity(1);
    }
  };

  const { isPending, mutate } = useCheckout(payload);
  const handleCheckout = () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Navigasi */}
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Kembali</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Gambar Produk */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Detail Produk */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Review */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.reviewCount} ulasan)
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Harga & Aksi */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.discountPrice)}
                </span>
                {product.discountPrice < product.price && (
                  <span className="text-sm text-gray-400 line-through mb-1">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              {/* Quantity Counter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Barang
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Kurangi jumlah"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={quantity}
                    onChange={handleInputChange}
                    className="w-16 text-center border-none focus:ring-0 text-gray-900 font-semibold p-0"
                    aria-label="Input jumlah"
                  />

                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= maxStock}
                    className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Tambah jumlah"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Tersedia: {maxStock} unit
                </p>
              </div>

              {/* Tombol Checkout */}
              <button
                onClick={handleCheckout}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors focus:ring-4 focus:ring-blue-200 ${isPending && "animate-pulse"}`}
              >
                <ShoppingCart className="w-5 h-5" />
                Checkout ({quantity} Item)
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Garansi uang kembali 30 hari • Pengiriman instan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
