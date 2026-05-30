"use client";
import { Product } from "@/types";
import { formatRupiah, getGoogleDriveImageUrl } from "@/lib/sheets";
import { ShoppingBag, Star, Package } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  waNumber: string;
  index: number;
}

function ProductCard({ product, waNumber, index }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = getGoogleDriveImageUrl(product.link_gambar);

  const hasValidImage = !imgError && !!product.link_gambar;

  const orderMsg = `Halo Mekar Sari 1! Saya tertarik untuk memesan grosir produk *${product.nama}* (Rp ${Number(product.harga).toLocaleString("id-ID")}) dengan minimal pemesanan 10 KG.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(orderMsg)}`;

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-green-100 transition-all duration-400 hover:-translate-y-2 flex flex-col border border-gray-100"
      id={`product-${product.id || index}`}
    >
      {/* Image area */}
      <div className="relative w-full bg-gradient-to-br from-green-50 to-amber-50 overflow-hidden"
        style={{ paddingBottom: "75%" }}>
        <div className="absolute inset-0">
          {hasValidImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageUrl}
              alt={product.nama}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="text-6xl">🍬</div>
              <span className="text-green-600 text-xs font-semibold bg-white/80 px-3 py-1 rounded-full">
                Brem Premium
              </span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category badge */}
        {product.kategori && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-green-900 text-xs font-black px-3 py-1 rounded-full shadow">
            {product.kategori}
          </span>
        )}

        {/* Stars */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-gray-900 text-base leading-snug">{product.nama}</h3>

        {product.deksripsi && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">{product.deksripsi}</p>
        )}

        {product.berat && (
          <p className="text-green-600 text-xs font-medium flex items-center gap-1.5">
            <Package size={12} /> {product.berat}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Harga</p>
            <p className="text-lg font-extrabold text-green-700">
              {formatRupiah(product.harga)}
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`order-btn-${product.id || index}`}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
          >
            <ShoppingBag size={13} />
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
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Mekar Sari 1! Saya ingin menanyakan harga grosir brem.")}`;

  return (
    <section id="produk" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-green-100">
            Produk Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Pilihan Brem{" "}
            <span className="text-green-700">Premium</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Setiap produk dibuat dengan standar kualitas tinggi menggunakan beras ketan super pilihan.
            <strong className="text-green-800 block mt-2">Kami hanya melayani pemesanan grosir dengan minimal pembelian 10 KG.</strong>
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={product.id || i}
                product={product}
                waNumber={waNumber}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <Package size={48} className="opacity-30" />
            <p className="text-lg font-medium">Memuat produk dari database...</p>
            <p className="text-sm">Data diambil dari Google Sheets</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14 bg-green-50 rounded-3xl p-8 border border-green-100">
          <p className="text-green-800 font-bold text-lg mb-1">Pemesanan Grosir Minimal 10 KG</p>
          <p className="text-gray-500 text-sm mb-5">Kami melayani pemesanan grosir skala besar untuk reseller, toko oleh-oleh, dan distributor resmi.</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="bulk-order-btn"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hubungi untuk Harga Grosir
          </a>
        </div>
      </div>
    </section>
  );
}
