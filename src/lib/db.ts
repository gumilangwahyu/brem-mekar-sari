import fs from "fs";
import path from "path";
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

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readSiteData(): SiteData {
  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading site data:", e);
  }
  return {
    settings: DEFAULT_SETTINGS,
    products: [],
    contents: [],
    overrideProducts: false,
    overrideContents: false,
  };
}

export function writeSiteData(data: Partial<SiteData>): void {
  ensureDataDir();
  const current = readSiteData();
  const updated = { ...current, ...data };
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
}

export function getSiteSettings(): SiteSettings {
  const data = readSiteData();
  return { ...DEFAULT_SETTINGS, ...data.settings };
}
