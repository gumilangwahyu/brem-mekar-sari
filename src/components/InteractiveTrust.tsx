"use client";
import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  Percent,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  Zap,
  Package,
} from "lucide-react";

import { FAQItem } from "@/types";

const commitments = [
  {
    icon: Award,
    title: "100% Beras Ketan Murni Pilihan",
    desc: "Kami berkomitmen hanya menggunakan beras ketan super kualitas terbaik tanpa tambahan tepung pengisi. Menghasilkan rasa legit alami dan sensasi langsung lumer di lidah yang autentik.",
    badge: "Kualitas Murni",
    iconColor: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    icon: Zap,
    title: "Kapasitas Produksi Skala Besar",
    desc: "Dengan kapasitas produksi mencapai 170 kg per hari, kami siap menjamin kontinuitas pasokan grosir Anda secara konsisten tanpa kendala kekurangan stok.",
    badge: "Suplai Lancar",
    iconColor: "text-green-700 bg-green-50 border-green-100",
  },
  {
    icon: Sparkles,
    title: "Standar Higienitas Keluarga",
    desc: "Resep legendaris 3 generasi diproduksi dalam lingkungan dapur bersih dengan pengawasan ketat standar mutu keluarga, memastikan kebersihan sempurna di setiap kemasan.",
    badge: "Higienis & Bersih",
    iconColor: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    icon: Package,
    title: "Garansi Pengemasan Ekstra Aman",
    desc: "Untuk pengiriman kargo antarpulau, setiap pesanan dikemas berlapis menggunakan kardus tebal khusus dan pembungkus pelindung untuk menjamin brem tiba dalam kondisi utuh sempurna.",
    badge: "Proteksi Maksimal",
    iconColor: "text-purple-600 bg-purple-50 border-purple-100",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-[#fdf8f0] border-t border-amber-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Percent,
              title: "Keuntungan Margin Tinggi",
              desc: "Harga grosir langsung dari produsen pertama, memberikan peluang profit maksimal untuk toko oleh-oleh dan reseller.",
            },
            {
              icon: ShieldCheck,
              title: "Jaminan Kualitas Ketan Murni",
              desc: "Dibuat dari 100% ketan pilihan tanpa campuran bahan tepung pengisi, menghasilkan rasa lumer autentik.",
            },
            {
              icon: Truck,
              title: "Pengiriman Kargo Aman",
              desc: "Didukung ekspedisi kargo tepercaya untuk pengiriman murah dan aman ke seluruh wilayah Indonesia.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-700 shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualityCommitmentSection() {
  return (
    <section className="py-20 bg-white" id="komitmen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-green-100">
            Jaminan Mutu
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            4 Komitmen Utama <span className="text-green-700">Mekar Sari 1</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Dedikasi kami untuk selalu menjaga kualitas produk dan keandalan kemitraan bisnis grosir jangka panjang dengan Anda.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commitments.map((c, i) => (
            <div
              key={i}
              className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-green-50/30 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-sm ${c.iconColor}`}>
                <c.icon size={26} />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{c.title}</h3>
                  <span className="text-[10px] font-black tracking-wider uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {c.badge}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ faqs }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeFaqs = faqs && faqs.length > 0 ? faqs : [];

  if (activeFaqs.length === 0) return null;

  return (
    <section className="py-20 bg-[#fdf8f0]/50" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-green-100">
            Tanya Jawab
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Pertanyaan yang <span className="text-green-700">Sering Diajukan</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            Semua hal yang perlu Anda ketahui mengenai sistem kemitraan dan grosir Brem Mekar Sari 1.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {activeFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.id || i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-gray-800 text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-green-700">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-50 animate-fade-in whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
