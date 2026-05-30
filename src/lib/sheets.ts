import { Product, ContentItem, SiteSettings } from "@/types";

const SHEETS_ID = process.env.NEXT_PUBLIC_SHEETS_ID;
const BASE_URL = `https://docs.google.com/spreadsheets/d/e/${SHEETS_ID}/pub`;

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}?sheet=PRODUK&output=csv`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const text = await res.text();
    return parseCSV<Product>(text);
  } catch (error) {
    console.error("Error fetching products:", error);
    return getDefaultProducts();
  }
}

export async function fetchContents(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${BASE_URL}?sheet=KONTEN&output=csv`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch contents");
    const text = await res.text();
    return parseCSV<ContentItem>(text);
  } catch (error) {
    console.error("Error fetching contents:", error);
    return [];
  }
}

function parseCSV<T>(text: string): T[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/\r/g, ""));
  const results: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle CSV fields with commas inside quotes
    const values: string[] = [];
    let inQuote = false;
    let current = "";
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        values.push(current.trim().replace(/\r/g, ""));
        current = "";
      } else {
        current += ch;
      }
    }
    values.push(current.trim().replace(/\r/g, ""));

    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || "";
    });
    results.push(obj as unknown as T);
  }

  return results;
}

export function getGoogleDriveImageUrl(driveUrl: string): string {
  if (!driveUrl) return "/placeholder-product.jpg";

  // Handle different Google Drive URL formats
  const fileIdMatch =
    driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    driveUrl.match(/id=([a-zA-Z0-9_-]+)/);

  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
  }

  return driveUrl;
}

export function getYoutubeEmbedUrl(url: string): string {
  if (!url) return "";
  const ytMatch =
    url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) ||
    url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export function formatRupiah(amount: number | string): string {
  const num = typeof amount === "string" ? parseInt(amount.replace(/\D/g, "")) : amount;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

export function getDefaultProducts(): Product[] {
  return [
    {
      id: "1",
      nama: "Brem 10KG",
      deksripsi: "Kemasan grosir 10KG, cocok untuk reseller dan usaha kuliner",
      harga: 640000,
      link_gambar: "",
      kategori: "Grosir",
    },
  ];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Brem Mekar Sari 1",
  tagline: "Cita Rasa Asli, Warisan Tiga Generasi",
  heroTitle: "Brem Premium Wonogiri",
  heroSubtitle:
    "Kenikmatan brem tradisional khas Wonogiri yang telah teruji selama tiga generasi. Dibuat dari beras ketan pilihan dengan cita rasa autentik yang tak tertandingi.",
  aboutText:
    "UMKM Brem Mekar Sari 1 adalah produsen brem tradisional premium yang telah berdiri kokoh di Planjen, Nguntoronadi, Wonogiri. Dengan warisan resep turun-temurun hingga generasi ketiga, kami menghadirkan brem berkualitas tinggi menggunakan beras ketan super pilihan dari berbagai penjuru Nusantara dan mancanegara.",
  waNumber: "6285212312312",
  waMessage:
    "Halo Mekar Sari 1, saya ingin memesan brem premium. Bisa bantu informasi harga dan stok?",
  address: "Planjen, Kecamatan Nguntoronadi, Kabupaten Wonogiri, Jawa Tengah",
  operationalHours: "06.30 - 16.00 WIB",
  productionCapacity: "170 kg/hari",
  shelfLife: "6 bulan",
  generation: "Generasi ke-3",
  employees: "8 Karyawan",
  bitlyWaLink: "",
  facebookUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
};
