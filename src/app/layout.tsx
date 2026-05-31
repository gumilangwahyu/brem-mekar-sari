import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brem Mekar Sari 1 | Brem Premium Wonogiri – Warisan 3 Generasi",
  description:
    "Produsen brem tradisional premium khas Wonogiri sejak generasi ke-3. Dibuat dari beras ketan super pilihan, kapasitas 170 kg/hari, tahan hingga 6 bulan. Pesan sekarang via WhatsApp!",
  keywords:
    "brem wonogiri, brem premium, brem mekar sari, brem tradisional, makanan khas wonogiri, oleh-oleh wonogiri",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Brem Mekar Sari 1 | Brem Premium Wonogiri",
    description:
      "Produsen brem tradisional premium khas Wonogiri, warisan generasi ke-3. Pesan sekarang!",
    type: "website",
    locale: "id_ID",
  },
  verification: {
    google: "sz-YKYtFfyyFxDnMi4460zt3CweFh42Bar98B8tvH-w",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
