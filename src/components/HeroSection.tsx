"use client";
import Image from "next/image";
import { SiteSettings } from "@/types";
import {
  MapPin,
  Clock,
  Phone,
  Award,
  Leaf,
  Shield,
  Truck,
  Users,
  ChevronDown,
} from "lucide-react";

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const waUrl = settings.bitlyWaLink ||
    `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(settings.waMessage)}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center hero-gradient overflow-hidden"
    >
      {/* Decorative overlay */}
      <div className="hero-overlay absolute inset-0 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-green-400/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["🌾", "✨", "🍃", "⭐", "🌿"].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Award size={14} className="text-yellow-300" />
            <span className="text-yellow-200 text-xs font-semibold tracking-wide uppercase">
              {settings.generation} · Wonogiri, Jawa Tengah
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Brem{" "}
            <span className="relative">
              <span className="text-yellow-300">Premium</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="#fde68a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <span className="text-green-200">Wonogiri</span>
          </h1>

          {/* Subtitle */}
          <p className="text-green-100 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            {settings.heroSubtitle}
          </p>

          {/* Key highlights */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
            {[
              { icon: Leaf, text: "Bahan Ketan Super" },
              { icon: Shield, text: "Tahan 6 Bulan" },
              { icon: Truck, text: "Kirim Seluruh Indonesia" },
            ].map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium"
              >
                <Icon size={12} className="text-green-300" />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-wa-btn"
              className="btn-wa flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white text-base font-bold shadow-2xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pesan via WhatsApp
            </a>
            <a
              href="#produk"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white text-base font-bold hover:bg-white/10 transition-all"
            >
              Lihat Produk
            </a>
          </div>

          {/* Quick info */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 text-green-200 text-sm justify-center lg:justify-start">
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{settings.operationalHours}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>Nguntoronadi, Wonogiri</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Main card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl max-w-sm w-full">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-28 h-28 rounded-full bg-white shadow-xl p-2 ring-4 ring-white/30 animate-float">
                  <Image
                    src="/logo.png"
                    alt="Brem Mekar Sari 1"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-white font-black text-2xl">{settings.siteName}</h2>
                <p className="text-green-300 text-sm">{settings.tagline}</p>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Produksi/Hari", value: settings.productionCapacity, icon: "⚡" },
                  { label: "Ketahanan", value: settings.shelfLife, icon: "🏆" },
                  { label: "Karyawan", value: settings.employees, icon: "👷" },
                  { label: "Generasi", value: settings.generation, icon: "👨‍👩‍👧‍👦" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-white font-bold text-sm">{item.value}</div>
                    <div className="text-green-300 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="mt-4 bg-yellow-400/20 rounded-xl p-3 flex items-center justify-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-yellow-200 text-xs font-medium">Kualitas Premium Terjamin</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-green-900 font-black text-xs px-3 py-1.5 rounded-full shadow-lg animate-bounce">
              🏅 Best Seller
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-green-800 font-semibold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
              <Users size={12} />
              Dipercaya ribuan pelanggan
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#tentang"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white flex flex-col items-center gap-2 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>

      {/* Bottom wave */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#fdf8f0"
            d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z"
          />
        </svg>
      </div>
    </section>
  );
}
