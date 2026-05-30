"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 1800 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <div ref={ref}>{prefix}{count.toLocaleString("id-ID")}{suffix}</div>;
}

const STATS = [
  { icon: "👨‍👩‍👧‍👦", label: "Generasi Keluarga", end: 3, suffix: " Gen", desc: "Diwariskan turun-temurun", color: "from-green-500 to-green-700" },
  { icon: "⚡", label: "Kapasitas Produksi", end: 170, suffix: " kg", desc: "Per hari nonstop", color: "from-yellow-500 to-orange-500" },
  { icon: "👷", label: "Karyawan Tetap", end: 8, suffix: " Orang", desc: "Tim profesional berpengalaman", color: "from-blue-500 to-blue-700" },
  { icon: "🏆", label: "Ketahanan Produk", end: 6, suffix: " Bulan", desc: "Tanpa bahan pengawet berbahaya", color: "from-purple-500 to-purple-700" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#fdf8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 border border-yellow-200">
            Angka Bicara
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
            Komitmen Kami dalam Angka
          </h2>
          <p className="mt-3 text-gray-500 text-sm md:text-base max-w-lg mx-auto">
            Setiap angka mencerminkan dedikasi penuh terhadap kualitas dan kepercayaan pelanggan
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 text-center border border-gray-100 overflow-hidden relative group"
            >
              {/* Accent bar top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-t-3xl`} />

              <div className="text-4xl mb-3 mt-1">{stat.icon}</div>
              <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold text-gray-800 mt-1.5">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-1 leading-snug">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
