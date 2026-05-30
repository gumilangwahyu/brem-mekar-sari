"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("id-ID")}{suffix}
    </span>
  );
}

const stats = [
  {
    label: "Generasi Keluarga",
    value: 3,
    suffix: " Gen",
    prefix: "",
    icon: "👨‍👩‍👧‍👦",
    desc: "Diwariskan turun-temurun",
  },
  {
    label: "Kapasitas Produksi",
    value: 170,
    suffix: " kg",
    prefix: "",
    icon: "⚡",
    desc: "Setiap hari produksi",
  },
  {
    label: "Karyawan Tetap",
    value: 8,
    suffix: " orang",
    prefix: "",
    icon: "👷",
    desc: "Tim berpengalaman",
  },
  {
    label: "Ketahanan Produk",
    value: 6,
    suffix: " bulan",
    prefix: "",
    icon: "🏆",
    desc: "Tanpa pengawet berbahaya",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#f0fdf4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="badge-premium inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            Angka Bicara
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
            Komitmen Kami dalam Angka
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Setiap angka mencerminkan dedikasi kami terhadap kualitas dan kepercayaan pelanggan
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-green-800">
                <Counter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-sm font-bold text-green-700 mt-1">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
