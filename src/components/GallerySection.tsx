"use client";
import { ContentItem } from "@/types";
import { getGoogleDriveImageUrl, getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from "@/lib/sheets";
import { useState } from "react";
import { Play, X, ZoomIn, Image as ImageIcon } from "lucide-react";

function isVideoUrl(url: string, tipe?: string) {
  return tipe === "video" || url?.includes("youtube") || url?.includes("youtu.be");
}

interface MediaCardProps {
  item: ContentItem;
  onClick: () => void;
}

function MediaCard({ item, onClick }: MediaCardProps) {
  const [imgError, setImgError] = useState(false);
  const isVid = isVideoUrl(item.link, item.tipe);
  const imageUrl = isVid ? getYoutubeThumbnailUrl(item.link) : getGoogleDriveImageUrl(item.link);

  return (
    <div
      onClick={onClick}
      id={`gallery-item-${item.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-gray-100 animate-fade-in-up"
    >
      {/* Thumbnail */}
      <div className="relative w-full bg-gradient-to-br from-green-50 to-amber-50" style={{ paddingBottom: "62.5%" }}>
        <div className="absolute inset-0">
          {isVid && imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={item.judul || "Video Brem"}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/45 flex items-center justify-center group-hover:bg-black/35 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>
            </>
          ) : isVid ? (
            /* Video fallback if no thumbnail */
            <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-950 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
                <p className="text-white/70 text-xs font-medium">Klik untuk putar</p>
              </div>
            </div>
          ) :
 !imgError && imageUrl ? (
            <>
              {/* Use plain img to avoid Next.js Image redirect issues with Google Drive */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={item.judul || "Galeri Brem Mekar Sari"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <ZoomIn size={18} className="text-green-700" />
                </div>
              </div>
            </>
          ) : (
            /* Fallback */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-300">
              <ImageIcon size={40} />
              <span className="text-xs">Foto tidak tersedia</span>
            </div>
          )}
        </div>

        {/* Type badge */}
        <span className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full shadow text-white ${isVid ? "bg-red-500" : "bg-green-600"}`}>
          {isVid ? "▶ VIDEO" : "📷 FOTO"}
        </span>
      </div>

      {/* Label */}
      {(item.judul || item.deskripsi) && (
        <div className="p-4">
          {item.judul && <p className="text-sm font-bold text-gray-800 truncate">{item.judul}</p>}
          {item.deskripsi && <p className="text-xs text-gray-400 mt-0.5 truncate">{item.deskripsi}</p>}
        </div>
      )}
    </div>
  );
}

interface ModalProps {
  item: ContentItem;
  onClose: () => void;
}

function MediaModal({ item, onClose }: ModalProps) {
  const isVid = isVideoUrl(item.link, item.tipe);
  const embedUrl = isVid ? getYoutubeEmbedUrl(item.link) : getGoogleDriveImageUrl(item.link);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {isVid ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`${embedUrl}?autoplay=1`}
              title={item.judul}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={embedUrl}
              alt={item.judul || "Galeri"}
              className="absolute inset-0 w-full h-full object-contain bg-gray-50"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {(item.judul || item.deskripsi) && (
          <div className="p-5">
            {item.judul && <h3 className="font-bold text-gray-900">{item.judul}</h3>}
            {item.deskripsi && <p className="text-gray-500 text-sm mt-1">{item.deskripsi}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// Fallback items shown when Google Sheets has no content yet
const FALLBACK_ITEMS: ContentItem[] = [
  { id: "f1", judul: "Proses Produksi Brem", tipe: "foto", link: "", deskripsi: "Pembuatan brem tradisional setiap hari" },
  { id: "f2", judul: "Produk Unggulan", tipe: "foto", link: "", deskripsi: "Brem premium siap kirim" },
  { id: "f3", judul: "Kemasan Higienis", tipe: "foto", link: "", deskripsi: "Dikemas dengan standar kebersihan tinggi" },
];

interface GallerySectionProps {
  contents: ContentItem[];
}

export default function GallerySection({ contents }: GallerySectionProps) {
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const items = contents.length > 0 ? contents : FALLBACK_ITEMS;

  return (
    <section id="galeri" className="py-20 bg-[#f8fbf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-green-100">
            Galeri & Konten
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Lihat Langsung{" "}
            <span className="text-green-700">Proses Kami</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Transparansi adalah prioritas kami. Saksikan sendiri bagaimana brem premium
            Mekar Sari 1 diproduksi dengan penuh dedikasi dan standar terbaik.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <MediaCard
              key={item.id || i}
              item={item}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>

        {contents.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-8">
            Tambahkan foto & video dari Google Sheets (sheet KONTEN) atau via Admin Panel.
          </p>
        )}
      </div>

      {selected && (
        <MediaModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
