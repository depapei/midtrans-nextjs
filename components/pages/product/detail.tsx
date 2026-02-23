"use client";
import { useCheckout } from "@/lib/httpCall/useCheckout";
import { CustomerData } from "@/type/customer";
import { CheckoutPayload, initialPayload, Product } from "@/type/product"; // Sesuaikan path import
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, X } from "lucide-react"; // Tambahkan icon X untuk tutup modal
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  // set up midtrans
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT || "";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const router = useRouter();
  // State untuk payload
  const [payload, setPayload] = useState<CheckoutPayload>(initialPayload);

  // State untuk Quantity
  const [quantity, setQuantity] = useState<number>(1);

  // State untuk Modal dan Formulir
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customer, setCustomer] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const maxStock = product.stock;
  const handleIncrement = () =>
    setQuantity((prev) => (prev < maxStock ? prev + 1 : prev));
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handler untuk input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev: CustomerData) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  // Fungsi saat form di-submit di dalam modal
  const { isPending, mutate, isSuccess, data } = useCheckout(payload);
  const [token, setToken] = useState<string>();
  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    const newPayload: CheckoutPayload = {
      product: product,
      quantity: quantity,
      totalPrice: product.discountPrice * quantity,
      customer: customer, // Masukkan data formulir ke payload
    };

    setPayload(newPayload);

    mutate();
    // onCheckout(payload);
    // setIsModalOpen(false); // Tutup modal setelah submit
  };

  // if berhasil
  useEffect(() => {
    if (isSuccess) {
      (window as any).snap.pay(data.token);
      setIsModalOpen(false);
    }
  }, [isSuccess]);

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Navigasi */}
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button
            onClick={() => {
              router.back();
            }}
            className="hover:cursor-pointer flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Kembali</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Bagian Gambar Produk */}
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

          {/* Bagian Detail Produk */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Review Stars */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "text-gray-300"
                      }`}
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

            {/* Bagian Harga & Counter */}
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
              <div className="flex items-center justify-between mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  Kuantitas:
                </span>
                <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900 border-x border-gray-300 py-1">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 text-sm">Total Harga:</span>
                <span className="text-lg font-bold text-gray-700">
                  {formatCurrency(product.discountPrice * quantity)}
                </span>
              </div>

              {/* Tombol yang sekarang hanya memunculkan Modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors focus:ring-4 focus:ring-blue-200 hover:cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                Lanjut ke Pembayaran
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Garansi uang kembali 30 hari • Pengiriman instan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL FORMULIR PEMESANAN ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative">
            {/* Header Modal */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                Detail Pemesan
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body / Formulir Modal */}
            <form onSubmit={handleConfirmCheckout} className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={customer.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                    placeholder="Budi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={customer.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                    placeholder="Santoso"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                  placeholder="081234567890"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={customer.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm"
                  placeholder="budi@example.com"
                />
              </div>

              {/* Rangkuman Singkat di dalam Modal */}
              <div className="bg-blue-50 p-3 rounded-lg mb-6 text-sm text-gray-700 flex justify-between items-center">
                <span>Total dibayar ({quantity} item)</span>
                <span className="font-bold">
                  {formatCurrency(product.discountPrice * quantity)}
                </span>
              </div>

              {/* Aksi Modal */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium hover:cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`w-2/3 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors font-medium flex justify-center items-center gap-2 hover:cursor-pointer ${isPending && "animate-pulse"}`}
                >
                  {isPending ? "Menunggu ..." : "Konfirmasi Pesanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
