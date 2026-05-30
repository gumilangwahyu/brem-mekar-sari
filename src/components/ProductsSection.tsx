"use client";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah, getGoogleDriveImageUrl } from "@/lib/sheets";
import { ShoppingBag, MessageCircle, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  waNumber: string;
  waMessage?: string;
  index: number;
}

export function ProductCard({ product, waNumber, waMessage, index }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getGoogleDriveImageUrl(product.link_gambar);

  const orderMessage = `Halo Mekar Sari 1! Saya ingin memesan *${product.nama}* seharga ${formatRupiah(product.harga)}. Apakah stok tersedia?`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage || orderMessage)}`;

  return (
    <div
      className="card-hover rounded-3xl overflow-hidden bg-white shadow-md border border-green-50 flex flex-col"
      style={{ animationDelay: `${index * 100}ms` }}
      id={`product-${product.id}`}
    >
      {/* Image */}
      <div className="aspect-product relative overflow-hidden bg-gradient-to-br from-green-50 to-yellow-50">
        {!imgError && product.link_gambar ? (
          <Image
            src={imageUrl}
            alt={product.nama}
            fill
            className="product-img object-cover"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-7xl">🍬</span>
            <span className="text-green-600 text-sm font-medium mt-2">Brem Premium</span>
          </div>
        )}

        {/* Badge */}
        {product.kategori && (
          <span className="absolute top-3 left-3 badge-premium text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {product.kategori}
          </span>
        )}

        {/* Stars overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-green-900 text-lg leading-tight">{product.nama}</h3>
        {product.deksripsi && (
          <p className="text-gray-500 text-sm mt-1.5 line-clamp-2 flex-1">{product.deksripsi}</p>
        )}
        {product.berat && (
          <p className="text-green-600 text-xs font-medium mt-1">📦 {product.berat}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Harga</p>
            <p className="text-xl font-extrabold text-green-700">
              {formatRupiah(product.harga)}
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa flex items-center gap-2 px-4 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-md"
            id={`order-btn-${product.id}`}
          >
            <ShoppingBag size={14} />
            Pesan
          </a>
        </div>
      </div>
    </div>
  );
}

interface ProductsSectionProps {
  products: Product[];
  waNumber: string;
}

export default function ProductsSection({ products, waNumber }: ProductsSectionProps) {
  return (
    <section id="produk" className="py-20 section-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge-premium inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Produk Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900">
            Pilihan Brem Premium
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            Setiap produk dibuat dengan standar kualitas tinggi menggunakan beras ketan super pilihan.
            Tersedia dalam berbagai kemasan sesuai kebutuhan Anda.
          </p>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={product.id || index}
                product={product}
                waNumber={waNumber}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg">Memuat produk...</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Butuh pesanan khusus atau pembelian dalam jumlah besar?
          </p>
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Mekar Sari 1! Saya ingin menanyakan harga grosir dan ketersediaan stok brem.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base shadow-lg"
            id="bulk-order-btn"
          >
            <MessageCircle size={20} />
            Hubungi untuk Harga Grosir
          </a>
        </div>
      </div>
    </section>
  );
}
