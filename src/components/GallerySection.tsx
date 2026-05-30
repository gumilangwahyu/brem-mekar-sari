"use client";
import { ContentItem } from "@/types";
import { getGoogleDriveImageUrl, getYoutubeEmbedUrl } from "@/lib/sheets";
import { useState } from "react";
import Image from "next/image";
import { Play, X, ZoomIn } from "lucide-react";

interface GallerySectionProps {
  contents: ContentItem[];
}

function MediaCard({ item, onClick }: { item: ContentItem; onClick: () => void }) {
  const isVideo =
    item.tipe === "video" ||
    item.link?.includes("youtube") ||
    item.link?.includes("youtu.be");
  const imageUrl = getGoogleDriveImageUrl(item.link);

  return (
    <div
      className="card-hover rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer group relative"
      onClick={onClick}
      id={`gallery-item-${item.id}`}
    >
      <div className="aspect-video relative bg-gradient-to-br from-green-50 to-yellow-50">
        {isVideo ? (
          <div className="absolute inset-0 flex items-center justify-center bg-green-900/10">
            <div className="w-16 h-16 rounded-full bg-green-600/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play size={24} className="text-white ml-1" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-800/30 to-transparent" />
          </div>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={item.judul || "Galeri Brem"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <ZoomIn size={20} className="text-green-700" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Label */}
      {item.judul && (
        <div className="p-3">
          <p className="text-sm font-semibold text-green-900 truncate">{item.judul}</p>
          {item.deskripsi && (
            <p className="text-xs text-gray-400 truncate mt-0.5">{item.deskripsi}</p>
          )}
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-2 right-2">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isVideo
              ? "bg-red-500 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {isVideo ? "VIDEO" : "FOTO"}
        </span>
      </div>
    </div>
  );
}

function MediaModal({ item, onClose }: { item: ContentItem; onClose: () => void }) {
  const isVideo =
    item.tipe === "video" ||
    item.link?.includes("youtube") ||
    item.link?.includes("youtu.be");
  const embedUrl = isVideo ? getYoutubeEmbedUrl(item.link) : getGoogleDriveImageUrl(item.link);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={18} />
        </button>

        {isVideo ? (
          <div className="video-responsive">
            <iframe
              src={`${embedUrl}?autoplay=1`}
              title={item.judul}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video">
            <Image
              src={embedUrl}
              alt={item.judul || "Galeri"}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}

        {item.judul && (
          <div className="p-4 bg-white">
            <h3 className="font-bold text-green-900">{item.judul}</h3>
            {item.deskripsi && <p className="text-gray-500 text-sm mt-1">{item.deskripsi}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GallerySection({ contents }: GallerySectionProps) {
  const [selected, setSelected] = useState<ContentItem | null>(null);

  // Fallback gallery items if no contents
  const items =
    contents.length > 0
      ? contents
      : [
          { id: "1", judul: "Proses Produksi", tipe: "foto", link: "", deskripsi: "Pembuatan brem tradisional" },
          { id: "2", judul: "Produk Unggulan", tipe: "foto", link: "", deskripsi: "Brem premium siap kirim" },
          { id: "3", judul: "Kemasan Produk", tipe: "foto", link: "", deskripsi: "Kemasan higienis & menarik" },
        ];

  return (
    <section id="galeri" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge-premium inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Galeri & Konten
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900">
            Lihat Langsung Proses Kami
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Transparansi adalah prioritas kami. Saksikan sendiri bagaimana brem premium
            Mekar Sari 1 diproduksi dengan penuh dedikasi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <MediaCard
              key={item.id || index}
              item={item as ContentItem}
              onClick={() => setSelected(item as ContentItem)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <MediaModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
