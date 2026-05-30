import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { SiteSettings, Product, ContentItem, FAQItem } from "@/types";
import { DEFAULT_SETTINGS } from "./sheets";

const DATA_FILE = path.join(process.cwd(), "data", "site-data.json");

interface SiteData {
  settings: SiteSettings;
  products: Product[];
  contents: ContentItem[];
  faqs?: FAQItem[];
  overrideProducts: boolean;
  overrideContents: boolean;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    q: "Berapa minimal pembelian grosir di Brem Mekar Sari 1?",
    a: "Minimal pemesanan grosir kami adalah 10 KG. Kami memproduksi brem secara terjadwal dan segar berdasarkan pesanan untuk memastikan Anda menerima produk dengan kualitas terbaik dan masa simpan maksimal.",
  },
  {
    id: "faq-2",
    q: "Apakah bisa mengirimkan produk ke luar Jawa?",
    a: "Ya, tentu saja! Kami melayani pengiriman ke seluruh penjuru Indonesia. Kami bekerja sama dengan jasa ekspedisi kargo tepercaya (baik darat, laut, maupun udara) untuk memberikan tarif ongkos kirim yang paling murah dan aman untuk paket berat.",
  },
  {
    id: "faq-3",
    q: "Bagaimana dengan kualitas kebersihan dan keaslian bahan?",
    a: "Kami menjamin 100% menggunakan beras ketan murni pilihan (tanpa campuran tepung beras) dan gula asli. Proses produksi dikelola secara higienis dengan standar kebersihan keluarga tradisional yang diwariskan selama 3 generasi.",
  },
  {
    id: "faq-4",
    q: "Berapa lama daya simpan (kadaluwarsa) Brem Mekar Sari 1?",
    a: "Brem kami dapat bertahan secara alami hingga 6 bulan. Kuncinya terletak pada teknik fermentasi ketan yang presisi dan proses penjemuran tradisional yang optimal, sehingga tidak membutuhkan bahan pengawet kimia tambahan.",
  },
  {
    id: "faq-5",
    q: "Apakah tersedia harga khusus untuk reseller atau distributor besar?",
    a: "Ya! Semakin besar jumlah pemesanan Anda, semakin murah harga per kilogram yang kami tawarkan. Kami berkomitmen mendukung keuntungan maksimal bagi mitra toko oleh-oleh, distributor daerah, maupun reseller mandiri.",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      // Ignored in read-only filesystems
    }
  }
}

export async function readSiteData(): Promise<SiteData> {
  // Try Supabase first if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_data")
        .select("data")
        .eq("id", 1)
        .single();

      if (!error && data && data.data) {
        const parsed = data.data as SiteData;
        if (!parsed.faqs) parsed.faqs = DEFAULT_FAQS;
        return parsed;
      }

      // If the row doesn't exist, seed a default row
      if (error && error.code === "PGRST116") {
        const defaultData: SiteData = {
          settings: DEFAULT_SETTINGS,
          products: [],
          contents: [],
          faqs: DEFAULT_FAQS,
          overrideProducts: false,
          overrideContents: false,
        };
        await supabase
          .from("site_data")
          .insert([{ id: 1, data: defaultData }]);
        return defaultData;
      }
      console.warn("Supabase fetch error, falling back to local file:", error);
    } catch (e) {
      console.error("Supabase exception, falling back to local file:", e);
    }
  }

  // Fallback to local file database
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (!parsed.faqs) parsed.faqs = DEFAULT_FAQS;
      return parsed;
    }
  } catch (e) {
    console.error("Error reading site data file:", e);
  }

  return {
    settings: DEFAULT_SETTINGS,
    products: [],
    contents: [],
    faqs: DEFAULT_FAQS,
    overrideProducts: false,
    overrideContents: false,
  };
}

export async function writeSiteData(data: Partial<SiteData>): Promise<void> {
  // Sync to local disk backup if writable
  try {
    ensureDataDir();
    const currentLocal = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) : {};
    const updatedLocal = { ...currentLocal, ...data };
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedLocal, null, 2), "utf-8");
  } catch (e) {
    // Ignored in read-only filesystems
  }

  // Sync to Supabase if configured
  if (supabase) {
    try {
      const current = await readSiteData();
      const updated = { ...current, ...data };
      const { error } = await supabase
        .from("site_data")
        .upsert({ id: 1, data: updated });

      if (error) {
        console.error("Supabase upsert error:", error);
      }
    } catch (e) {
      console.error("Supabase write exception:", e);
    }
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await readSiteData();
  return { ...DEFAULT_SETTINGS, ...data.settings };
}
