"use client";
import { SiteSettings } from "@/types";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

interface CTASectionProps {
  settings: SiteSettings;
}

export function CTASection({ settings }: CTASectionProps) {
  const waUrl =
    settings.bitlyWaLink ||
    `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(settings.waMessage)}`;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a3318 0%, #145a2e 40%, #1a7a3c 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-green-500/10 blur-[80px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 rounded-full bg-yellow-400/10 blur-[80px]" />
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {["🌾", "✨", "🍃"].map((e, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-10 animate-float"
            style={{ left: `${10 + i * 35}%`, top: `${20 + i * 20}%`, animationDelay: `${i * 0.7}s` }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block bg-white/10 border border-white/20 text-yellow-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          Pesan Sekarang
        </span>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Siap Merasakan Brem{" "}
          <span className="text-yellow-400">Terbaik Wonogiri?</span>
        </h2>

        <p className="text-green-100/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Hubungi kami sekarang dan dapatkan informasi harga terbaik.
          Kami siap melayani pesanan eceran maupun grosir dengan penuh dedikasi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-main-wa-btn"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold text-lg px-10 py-4.5 rounded-2xl shadow-2xl shadow-green-950/50 hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-1"
            style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
          >
            <MessageCircle size={22} />
            Pesan via WhatsApp
          </a>
          <a
            href="#produk"
            className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-bold text-lg px-10 rounded-2xl transition-all duration-300"
            style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
          >
            Lihat Produk
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-green-200 text-sm">
          {["✅ Harga Bersaing", "✅ Kualitas Premium", "✅ Respon Cepat", "✅ Pengiriman Aman"].map((b, i) => (
            <span key={i} className="font-medium">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const waUrl =
    settings.bitlyWaLink ||
    `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(settings.waMessage)}`;

  const socialLinks = [
    {
      show: !!settings.instagramUrl,
      href: settings.instagramUrl || "",
      hoverColor: "hover:bg-pink-600",
      svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
    },
    {
      show: !!settings.facebookUrl,
      href: settings.facebookUrl || "",
      hoverColor: "hover:bg-blue-600",
      svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    },
    {
      show: !!settings.youtubeUrl,
      href: settings.youtubeUrl || "",
      hoverColor: "hover:bg-red-600",
      svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
    },
    {
      show: !!settings.tiktokUrl,
      href: settings.tiktokUrl || "",
      hoverColor: "hover:bg-gray-600",
      svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.83a8.27 8.27 0 004.84 1.56V6.94a4.85 4.85 0 01-1.07-.25z" /></svg>,
    },
  ];

  return (
    <footer id="kontak" className="bg-green-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="relative w-16 h-16 mb-4 overflow-hidden rounded-full bg-transparent flex items-center justify-center">
              <img src="/logo.png" alt="Brem Mekar Sari 1" className="w-full h-full object-contain" />
            </div>
            <p className="text-green-300 text-sm leading-relaxed mb-5">
              Produsen brem tradisional premium khas Wonogiri, Jawa Tengah.
              Warisan cita rasa autentik yang telah dipercaya selama tiga generasi.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.filter(s => s.show).map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 bg-green-800 ${s.hoverColor} rounded-xl flex items-center justify-center transition-colors`}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#hero", label: "Beranda" },
                { href: "#tentang", label: "Tentang Kami" },
                { href: "#produk", label: "Produk" },
                { href: "#galeri", label: "Galeri" },
                { href: "#kontak", label: "Kontak" },
                { href: "/admin", label: "⚙️ Admin Panel" },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-green-300 hover:text-white text-sm transition-colors hover:underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5">
              Hubungi Kami
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-green-400 mt-0.5 shrink-0" />
                <p className="text-green-300 text-sm leading-relaxed">{settings.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-green-400 shrink-0" />
                <p className="text-green-300 text-sm">{settings.operationalHours}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-green-400 shrink-0" />
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="text-green-300 hover:text-white text-sm transition-colors">
                  {settings.waNumber}
                </a>
              </div>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-wa-btn"
              className="flex items-center justify-center gap-2 mt-6 bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors w-full"
            >
              <MessageCircle size={15} />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-green-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Brem Mekar Sari 1 — Pak Sugeng. Hak Cipta Dilindungi.
          </p>
          <p className="text-green-700 text-xs">
            Tenggar, Gebang, Nguntoronadi, Wonogiri · Jawa Tengah
          </p>
        </div>
      </div>
    </footer>
  );
}
