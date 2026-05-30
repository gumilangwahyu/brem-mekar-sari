"use client";
import Image from "next/image";
import { SiteSettings } from "@/types";
import { MapPin, Clock, ChevronDown, Leaf, Shield, Truck } from "lucide-react";

interface HeroSectionProps {
  settings: SiteSettings;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const waUrl =
    settings.bitlyWaLink ||
    `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(settings.waMessage)}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a3318 0%, #145a2e 35%, #1a7a3c 65%, #0f4a20 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-yellow-400/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-700/10 blur-[100px]" />
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {["🌾", "✨", "🍃", "⭐", "🌿"].map((e, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 3) * 22}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + i * 0.4}s`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-300 text-xs font-bold tracking-wider uppercase">
                {settings.generation} · Wonogiri, Jawa Tengah
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Brem{" "}
              <span className="relative inline-block">
                <span className="text-yellow-400">Premium</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 6" fill="none">
                  <path d="M2 4C50 1 150 1 198 4" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              <span className="text-green-300">Wonogiri</span>
            </h1>

            {/* Subtitle */}
            <p className="text-green-100/90 text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
              {settings.heroSubtitle}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start mb-10">
              {[
                { icon: Leaf, text: "Beras Ketan Super" },
                { icon: Shield, text: "Tahan 6 Bulan" },
                { icon: Truck, text: "Kirim Se-Indonesia" },
              ].map(({ icon: Icon, text }, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
                  <Icon size={11} className="text-green-300" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-wa-btn"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-2xl shadow-green-900/50 hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan via WhatsApp
              </a>
              <a
                href="#produk"
                className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Lihat Produk ↓
              </a>
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start text-green-300 text-xs">
              <span className="flex items-center gap-1.5"><Clock size={13} />{settings.operationalHours}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} />Nguntoronadi, Wonogiri</span>
            </div>
          </div>

          {/* RIGHT: Brand Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Floating badge */}
              <div className="absolute -top-4 -right-2 z-10 bg-yellow-400 text-green-950 text-xs font-black px-3 py-1.5 rounded-full shadow-lg animate-bounce">
                🏅 Best Seller
              </div>

              {/* Main brand card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                {/* Logo landscape display */}
                <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-white shadow-xl mb-5">
                  <Image
                    src="/logo.png"
                    alt="Brem Mekar Sari 1"
                    fill
                    className="object-contain p-3"
                    priority
                  />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "⚡", label: "Produksi/Hari", value: settings.productionCapacity },
                    { icon: "🏆", label: "Ketahanan", value: settings.shelfLife },
                    { icon: "👷", label: "Karyawan", value: settings.employees },
                    { icon: "👨‍👩‍👧‍👦", label: "Generasi", value: settings.generation },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-3.5 text-center border border-white/10">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-white font-bold text-sm leading-tight">{item.value}</div>
                      <div className="text-green-300 text-xs mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Rating bar */}
                <div className="mt-4 bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-3 flex items-center justify-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-yellow-200 text-xs font-semibold">Kualitas Premium Terjamin</span>
                </div>
              </div>

              {/* Bottom floating badge */}
              <div className="absolute -bottom-3 -left-3 bg-white text-green-800 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                <span>✅</span> Dipercaya ribuan pelanggan
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#tentang" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors group">
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 56C240 14 480 0 720 0C960 0 1200 14 1440 56V56H0V56Z" fill="#fdf8f0" />
        </svg>
      </div>
    </section>
  );
}
