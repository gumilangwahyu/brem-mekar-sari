export interface Product {
  id: string;
  nama: string;
  deksripsi: string;
  harga: number | string;
  link_gambar: string;
  kategori?: string;
  stok?: string;
  berat?: string;
}

export interface ContentItem {
  id: string;
  judul: string;
  tipe: "foto" | "video" | string;
  link: string;
  deskripsi?: string;
  urutan?: number | string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  waNumber: string;
  waMessage: string;
  address: string;
  operationalHours: string;
  productionCapacity: string;
  shelfLife: string;
  generation: string;
  employees: string;
  bitlyWaLink?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
}

export interface AdminData {
  products: Product[];
  contents: ContentItem[];
  settings: SiteSettings;
}
