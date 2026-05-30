"use client";
import { SiteSettings } from "@/types";
import { Leaf, Award, Clock, Shield, Users, MapPin, Globe } from "lucide-react";

interface AboutSectionProps {
  settings: SiteSettings;
}

const advantages = [
  {
    icon: Leaf,
    title: "Bahan Baku Premium",
    desc: "Beras ketan super pilihan dari berbagai daerah, termasuk impor dari Kamboja, Filipina, dan Vietnam untuk kualitas terbaik.",
    bg: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-100",
  },
  {
    icon: Award,
    title: "Cita Rasa Autentik",
    desc: "Resep tradisional turun-temurun selama tiga generasi, menghadirkan rasa original yang tak tertandingi.",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    border: "border-yellow-100",
  },
  {
    icon: Shield,
    title: "Tahan Lama & Aman",
    desc: "Produk kami mampu bertahan hingga 6 bulan tanpa bahan pengawet berbahaya — ideal untuk oleh-oleh dan stok.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: Globe,
    title: "Jaringan Bahan Global",
    desc: "Mendatangkan bahan baku berkualitas dari Batang, Kamboja, Filipina, dan Vietnam untuk standar produksi kelas dunia.",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-100",
  },
  {
    icon: Users,
    title: "Tenaga Kerja Profesional",
    desc: "Dikelola keluarga dengan 8 karyawan berpengalaman yang terlatih dalam standar produksi brem premium.",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
    border: "border-rose-100",
  },
  {
    icon: Clock,
    title: "Produksi Konsisten",
    desc: "Beroperasi setiap hari pukul 06.30–16.00 WIB dengan kapasitas hingga 170 kg/hari untuk memenuhi permintaan pasar.",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "border-orange-100",
  },
];

export default function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="tentang" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 border border-green-200">
            Tentang Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Warisan Rasa yang{" "}
            <span className="text-green-700">Tak Lekang</span>
          </h2>
          <p className="mt-5 text-gray-500 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            {settings.aboutText}
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="relative bg-green-900 rounded-3xl p-8 md:p-12 mb-14 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-700/40 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { num: "3", unit: "", label: "Generasi Bertahan", desc: "Diwariskan dari kakek hingga cucu dengan penuh cinta dan dedikasi" },
              { num: "170", unit: "kg", label: "Produksi per Hari", desc: "Kapasitas besar siap memenuhi pesanan skala grosir" },
              { num: "6", unit: "bln", label: "Ketahanan Produk", desc: "Daya simpan panjang tanpa mengorbankan rasa dan kualitas" },
            ].map((item, i) => (
              <div key={i} className={`${i === 1 ? "md:border-x border-white/10" : ""} px-4`}>
                <div className="text-5xl md:text-6xl font-black text-yellow-400 leading-none">
                  {item.num}
                  <span className="text-2xl md:text-3xl">{item.unit}</span>
                </div>
                <div className="text-white font-bold text-lg mt-2">{item.label}</div>
                <div className="text-green-300 text-sm mt-1.5 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {advantages.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} ${item.border} border rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4`}>
                <item.icon size={20} className={item.iconColor} />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-3xl p-7 shadow-md border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin size={28} className="text-green-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Lokasi Kami</h3>
            <p className="text-gray-600 text-sm">{settings.address}</p>
            <p className="text-green-600 text-sm font-semibold mt-1">
              ⏰ Jam Operasional: {settings.operationalHours}
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/bF3uchYt86BrDp8m7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors shrink-0"
          >
            <MapPin size={14} /> Lihat di Maps
          </a>
        </div>

      </div>
    </section>
  );
}
