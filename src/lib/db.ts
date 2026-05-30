import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { SiteSettings, Product, ContentItem } from "@/types";
import { DEFAULT_SETTINGS } from "./sheets";

const DATA_FILE = path.join(process.cwd(), "data", "site-data.json");

interface SiteData {
  settings: SiteSettings;
  products: Product[];
  contents: ContentItem[];
  overrideProducts: boolean;
  overrideContents: boolean;
}

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
        return data.data as SiteData;
      }

      // If the row doesn't exist, seed a default row
      if (error && error.code === "PGRST116") {
        const defaultData: SiteData = {
          settings: DEFAULT_SETTINGS,
          products: [],
          contents: [],
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
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading site data file:", e);
  }

  return {
    settings: DEFAULT_SETTINGS,
    products: [],
    contents: [],
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
