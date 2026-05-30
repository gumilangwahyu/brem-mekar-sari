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
    desc: "Beras ketan super pilihan dari berbagai daerah, termasuk impor dari Kamboja, Filipina, dan Vietnam untuk menjamin kualitas terbaik.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Award,
    title: "Cita Rasa Autentik",
    desc: "Resep tradisional turun-temurun yang dipertahankan selama tiga generasi, menghadirkan rasa original yang tak tertandingi.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Shield,
    title: "Tahan Lama & Aman",
    desc: "Produk kami mampu bertahan hingga 6 bulan tanpa bahan pengawet berbahaya, menjadikannya pilihan ideal untuk oleh-oleh dan stok.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Globe,
    title: "Jaringan Bahan Global",
    desc: "Kami mendatangkan bahan baku berkualitas dari Batang, Kamboja, Filipina, dan Vietnam untuk standar produksi kelas dunia.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Users,
    title: "Tenaga Kerja Berpengalaman",
    desc: "Dikelola oleh keluarga dengan didukung 8 karyawan berpengalaman yang terlatih dalam standar produksi brem premium.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Clock,
    title: "Produksi Konsisten",
    desc: "Beroperasi dari pukul 06.30–16.00 WIB setiap hari dengan kapasitas hingga 170 kg/hari untuk memenuhi permintaan pasar.",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="tentang" className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-premium inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Tentang Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900">
            Warisan Rasa yang Tak Lekang
          </h2>
          <p className="mt-4 text-gray-500 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            {settings.aboutText}
          </p>
        </div>

        {/* Story timeline */}
        <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-3xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-green-700/30 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-yellow-400/10 translate-y-1/2 -translate-x-1/4" />

          <div className="relative grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-yellow-300 mb-2">3</div>
              <div className="text-lg font-bold text-white">Generasi Bertahan</div>
              <div className="text-green-300 text-sm mt-1">
                Diwariskan dari kakek hingga cucu dengan penuh cinta dan dedikasi
              </div>
            </div>
            <div className="md:border-x border-white/20 px-4">
              <div className="text-5xl font-black text-yellow-300 mb-2">170<span className="text-2xl">kg</span></div>
              <div className="text-lg font-bold text-white">Produksi Harian</div>
              <div className="text-green-300 text-sm mt-1">
                Kapasitas produksi besar yang siap memenuhi pesanan skala besar
              </div>
            </div>
            <div>
              <div className="text-5xl font-black text-yellow-300 mb-2">6<span className="text-2xl">bln</span></div>
              <div className="text-lg font-bold text-white">Ketahanan Produk</div>
              <div className="text-green-300 text-sm mt-1">
                Daya simpan panjang tanpa mengorbankan rasa dan kualitas
              </div>
            </div>
          </div>
        </div>

        {/* Advantages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, i) => (
            <div
              key={i}
              className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon size={22} />
              </div>
              <h3 className="font-bold text-green-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Location card */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-md border border-green-100 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin size={32} className="text-green-600" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-green-900 mb-1">Lokasi Kami</h3>
            <p className="text-gray-600">{settings.address}</p>
            <p className="text-green-600 text-sm mt-1 font-medium">
              ⏰ Jam Operasional: {settings.operationalHours}
            </p>
          </div>
          <div className="md:ml-auto">
            <a
              href={`https://maps.google.com/?q=Nguntoronadi+Wonogiri+Brem+Mekar+Sari`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
            >
              <MapPin size={15} />
              Lihat di Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
