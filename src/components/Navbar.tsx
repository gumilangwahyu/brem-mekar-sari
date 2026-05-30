"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#produk", label: "Produk" },
  { href: "#galeri", label: "Galeri" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar({ waNumber }: { waNumber?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const finalWaNumber = waNumber || process.env.NEXT_PUBLIC_WA_NUMBER || "6285212312312";
  const waUrl = `https://wa.me/${finalWaNumber}?text=${encodeURIComponent("Halo Brem Mekar Sari 1! Saya ingin bertanya mengenai pemesanan grosir.")}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-green-950/95 backdrop-blur-md shadow-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 overflow-hidden rounded-full bg-transparent group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Brem Mekar Sari 1"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-green-100 hover:text-white text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={15} />
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-950/98 backdrop-blur-lg border-t border-green-800/50">
          <div className="px-5 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-green-100 hover:text-white py-3 px-3 text-sm font-medium border-b border-green-800/30 last:border-0 hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle size={16} />
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
