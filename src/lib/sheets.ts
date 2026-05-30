import { Product, ContentItem, SiteSettings } from "@/types";

// Support both published CSV key (2PACX-...) and direct spreadsheet ID (1GOh4bNJ-...)
const SHEETS_CONFIG = process.env.NEXT_PUBLIC_SHEETS_ID || "";

function buildSheetUrl(sheetName: string): string {
  const id = SHEETS_CONFIG;
  // If it's a published key (starts with 2PACX-), use the published URL
  if (id.startsWith("2PACX-")) {
    return `https://docs.google.com/spreadsheets/d/e/${id}/pub?sheet=${sheetName}&output=csv`;
  }
  // Otherwise treat it as a direct spreadsheet ID — use gviz/tq endpoint (works without publish)
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?sheet=${sheetName}&tqx=out:csv`;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const url = buildSheetUrl("PRODUK");
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const text = await res.text();
    const parsed = parseCSV<Product>(text, true);
    return parsed.length > 0 ? parsed : getDefaultProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    return getDefaultProducts();
  }
}

export async function fetchContents(): Promise<ContentItem[]> {
  try {
    const url = buildSheetUrl("KONTEN");
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Failed to fetch contents: ${res.status}`);
    const text = await res.text();
    return parseCSV<ContentItem>(text, false);
  } catch (error) {
    console.error("Error fetching contents:", error);
    return [];
  }
}

function parseCSV<T>(text: string, isProduct = false): T[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  // Normalize headers: trim, remove quotes, lowercase
  const rawHeaders = lines[0].split(",").map((h) =>
    h.trim().replace(/\r/g, "").replace(/^"|"$/g, "").toLowerCase()
  );

  const headers = rawHeaders.map((h) => {
    if (isProduct) {
      if (h === "link gambar" || h === "link_gambar" || h === "link_file" || h === "link file" || h === "link") return "link_gambar";
      if (h === "deskripsi" || h === "deksripsi") return "deksripsi";
    } else {
      if (h === "link gambar" || h === "link_gambar" || h === "link_file" || h === "link file") return "link";
      if (h === "deksripsi" || h === "deskripsi") return "deskripsi";
    }
    return h;
  });

  const results: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle CSV fields that may be quoted (including quoted with commas inside)
    const values: string[] = [];
    let inQuote = false;
    let current = "";
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        values.push(current.trim().replace(/\r/g, "").replace(/^"|"$/g, ""));
        current = "";
      } else {
        current += ch;
      }
    }
    values.push(current.trim().replace(/\r/g, "").replace(/^"|"$/g, ""));

    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || "";
    });

    // Skip rows where all values are empty
    if (Object.values(obj).every((v) => !v)) continue;

    results.push(obj as unknown as T);
  }

  return results;
}

export function getGoogleDriveImageUrl(driveUrl: string): string {
  if (!driveUrl) return "";

  // Handle lh3.googleusercontent.com (direct image URL — use as-is)
  if (driveUrl.includes("googleusercontent.com")) return driveUrl;

  // Extract Google Drive file ID from various URL formats
  const fileIdMatch =
    driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    driveUrl.match(/id=([a-zA-Z0-9_-]+)/);

  if (fileIdMatch) {
    // Use thumbnail endpoint — works without CORS issues in browser
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w600`;
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

export function getYoutubeThumbnailUrl(url: string): string {
  if (!url) return "";
  const ytMatch =
    url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) ||
    url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return "";
}

export function formatRupiah(amount: number | string): string {
  const num =
    typeof amount === "string" ? parseInt(amount.replace(/\D/g, "")) : amount;
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
    "UMKM Brem Mekar Sari 1 adalah produsen brem tradisional premium yang telah berdiri kokoh di Tenggar, Gebang, Nguntoronadi, Wonogiri. Dengan warisan resep turun-temurun hingga generasi ketiga, kami menghadirkan brem berkualitas tinggi menggunakan beras ketan super pilihan dari berbagai penjuru Nusantara dan mancanegara.",
  waNumber: "6287724081696",
  waMessage:
    "Halo Mekar Sari 1, saya ingin memesan brem premium. Bisa bantu informasi harga dan stok?",
  address:
    "Tenggar, Gebang, Kecamatan Nguntoronadi, Kabupaten Wonogiri, Jawa Tengah",
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
