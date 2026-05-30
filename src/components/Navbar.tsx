"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#produk", label: "Produk" },
  { href: "#galeri", label: "Galeri" },
  { href: "#kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6285212312312";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Mekar Sari 1, saya ingin memesan brem premium!")}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-blur shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-green-400/30 group-hover:ring-green-400/60 transition-all">
              <Image
                src="/logo.png"
                alt="Brem Mekar Sari 1"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Brem Mekar Sari 1</p>
              <p className="text-green-300 text-xs">Wonogiri · Est. 3 Generasi</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-green-100 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-md"
            >
              <Phone size={15} />
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-900/95 backdrop-blur-lg border-t border-green-800/50 mt-2">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-green-100 hover:text-white py-2 text-sm font-medium border-b border-green-800/30 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-semibold mt-4"
            >
              <Phone size={15} />
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
