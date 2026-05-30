"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SiteSettings, Product, ContentItem } from "@/types";
import { DEFAULT_SETTINGS } from "@/lib/sheets";
import {
  Settings,
  Package,
  Image as ImageIcon,
  LogOut,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Home,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";

type Tab = "settings" | "products" | "contents";

function TabButton({
  tab,
  active,
  onClick,
  icon: Icon,
  label,
}: {
  tab: Tab;
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
        active
          ? "bg-green-700 text-white shadow-md"
          : "text-green-200 hover:bg-green-800/50"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-600 block mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
        />
      )}
    </div>
  );
}

// --- Settings Tab ---
function SettingsTab({
  settings,
  onSave,
  saving,
}: {
  settings: SiteSettings;
  onSave: (s: SiteSettings) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<SiteSettings>(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const update = (key: keyof SiteSettings, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="space-y-8">
      {/* General */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
          <Settings size={16} className="text-green-600" />
          Pengaturan Umum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Nama Website" value={form.siteName} onChange={(v) => update("siteName", v)} />
          <InputField label="Tagline" value={form.tagline} onChange={(v) => update("tagline", v)} />
          <InputField label="Hero Title" value={form.heroTitle} onChange={(v) => update("heroTitle", v)} />
          <InputField label="Nomor WhatsApp" value={form.waNumber} onChange={(v) => update("waNumber", v)} placeholder="628xxx" />
          <InputField
            label="Hero Subtitle"
            value={form.heroSubtitle}
            onChange={(v) => update("heroSubtitle", v)}
            rows={3}
          />
          <InputField
            label="Pesan WA Default"
            value={form.waMessage}
            onChange={(v) => update("waMessage", v)}
            rows={3}
          />
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-5">Tentang Bisnis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Teks Tentang" value={form.aboutText} onChange={(v) => update("aboutText", v)} rows={4} />
          <div className="space-y-4">
            <InputField label="Alamat" value={form.address} onChange={(v) => update("address", v)} />
            <InputField label="Jam Operasional" value={form.operationalHours} onChange={(v) => update("operationalHours", v)} />
            <InputField label="Kapasitas Produksi" value={form.productionCapacity} onChange={(v) => update("productionCapacity", v)} />
            <InputField label="Ketahanan Produk" value={form.shelfLife} onChange={(v) => update("shelfLife", v)} />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-5">Link & Sosial Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Bitly WA Link (opsional)" value={form.bitlyWaLink || ""} onChange={(v) => update("bitlyWaLink", v)} placeholder="https://bit.ly/xxx" />
          <InputField label="Instagram URL" value={form.instagramUrl || ""} onChange={(v) => update("instagramUrl", v)} placeholder="https://instagram.com/xxx" />
          <InputField label="Facebook URL" value={form.facebookUrl || ""} onChange={(v) => update("facebookUrl", v)} placeholder="https://facebook.com/xxx" />
          <InputField label="TikTok URL" value={form.tiktokUrl || ""} onChange={(v) => update("tiktokUrl", v)} placeholder="https://tiktok.com/@xxx" />
          <InputField label="YouTube URL" value={form.youtubeUrl || ""} onChange={(v) => update("youtubeUrl", v)} placeholder="https://youtube.com/@xxx" />
        </div>
      </div>

      <button
        onClick={() => onSave(form)}
        disabled={saving}
        className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold disabled:opacity-60"
      >
        <Save size={16} />
        {saving ? "Menyimpan..." : "Simpan Pengaturan"}
      </button>
    </div>
  );
}

// --- Products Tab ---
function ProductsTab({
  products,
  onSave,
  saving,
}: {
  products: Product[];
  onSave: (p: Product[]) => void;
  saving: boolean;
}) {
  const [items, setItems] = useState<Product[]>(products);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const add = () => {
    const newItem: Product = {
      id: Date.now().toString(),
      nama: "Produk Baru",
      deksripsi: "",
      harga: 0,
      link_gambar: "",
      kategori: "",
      berat: "",
    };
    setItems((p) => [...p, newItem]);
    setExpanded(newItem.id);
  };

  const update = (id: string, key: keyof Product, val: string | number) =>
    setItems((p) => p.map((item) => (item.id === id ? { ...item, [key]: val } : item)));

  const remove = (id: string) =>
    setItems((p) => p.filter((item) => item.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">
          Manajemen Produk ({items.length} produk)
        </h3>
        <button
          onClick={add}
          className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
        >
          <Plus size={14} />
          Tambah Produk
        </button>
      </div>

      {items.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === product.id ? null : product.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">
                🍬
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{product.nama}</p>
                <p className="text-green-600 text-xs font-medium">
                  Rp {Number(product.harga).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); remove(product.id); }}
                className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
              {expanded === product.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>

          {expanded === product.id && (
            <div className="border-t border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Nama Produk" value={product.nama} onChange={(v) => update(product.id, "nama", v)} />
              <InputField label="Harga (Rp)" value={String(product.harga)} type="number" onChange={(v) => update(product.id, "harga", v)} />
              <InputField label="Deskripsi" value={product.deksripsi} onChange={(v) => update(product.id, "deksripsi", v)} rows={2} />
              <InputField label="Link Gambar" value={product.link_gambar} onChange={(v) => update(product.id, "link_gambar", v)} placeholder="https://drive.google.com/..." />
              <InputField label="Kategori (opsional)" value={product.kategori || ""} onChange={(v) => update(product.id, "kategori", v)} placeholder="Eceran / Grosir" />
              <InputField label="Berat (opsional)" value={product.berat || ""} onChange={(v) => update(product.id, "berat", v)} placeholder="500g / 1kg" />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => onSave(items)}
        disabled={saving}
        className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold disabled:opacity-60"
      >
        <Save size={16} />
        {saving ? "Menyimpan..." : "Simpan Semua Produk"}
      </button>
    </div>
  );
}

// --- Contents Tab ---
function ContentsTab({
  contents,
  onSave,
  saving,
}: {
  contents: ContentItem[];
  onSave: (c: ContentItem[]) => void;
  saving: boolean;
}) {
  const [items, setItems] = useState<ContentItem[]>(contents);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setItems(contents);
  }, [contents]);

  const add = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      judul: "Konten Baru",
      tipe: "foto",
      link: "",
      deskripsi: "",
    };
    setItems((p) => [...p, newItem]);
    setExpanded(newItem.id);
  };

  const update = (id: string, key: keyof ContentItem, val: string) =>
    setItems((p) => p.map((item) => (item.id === id ? { ...item, [key]: val } : item)));

  const remove = (id: string) =>
    setItems((p) => p.filter((item) => item.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">
          Manajemen Konten ({items.length} item)
        </h3>
        <button
          onClick={add}
          className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
        >
          <Plus size={14} />
          Tambah Konten
        </button>
      </div>

      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                item.tipe === "video" ? "bg-red-500" : "bg-green-600"
              }`}>
                {item.tipe === "video" ? "▶" : "📷"}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.judul}</p>
                <p className="text-gray-400 text-xs">{item.tipe === "video" ? "Video" : "Foto"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); remove(item.id); }}
                className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
              {expanded === item.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>

          {expanded === item.id && (
            <div className="border-t border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Judul" value={item.judul} onChange={(v) => update(item.id, "judul", v)} />
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5 uppercase tracking-wide">Tipe</label>
                <select
                  value={item.tipe}
                  onChange={(e) => update(item.id, "tipe", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 bg-white"
                >
                  <option value="foto">📷 Foto</option>
                  <option value="video">▶️ Video</option>
                </select>
              </div>
              <InputField
                label="Link (Google Drive / YouTube)"
                value={item.link}
                onChange={(v) => update(item.id, "link", v)}
                placeholder={item.tipe === "video" ? "https://youtube.com/..." : "https://drive.google.com/..."}
              />
              <InputField label="Deskripsi (opsional)" value={item.deskripsi || ""} onChange={(v) => update(item.id, "deskripsi", v)} rows={2} />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => onSave(items)}
        disabled={saving}
        className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold disabled:opacity-60"
      >
        <Save size={16} />
        {saving ? "Menyimpan..." : "Simpan Semua Konten"}
      </button>
    </div>
  );
}

// --- Main Admin Page ---
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("settings");
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [products, setProducts] = useState<Product[]>([]);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
    setProducts(data.products || []);
    setContents(data.contents || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const save = async (payload: object) => {
    setSaving(true);
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    showToast("✅ Data berhasil disimpan!");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-green-900 flex-shrink-0 flex flex-col fixed h-full left-0 top-0 z-10 shadow-xl">
        {/* Logo */}
        <div className="p-5 border-b border-green-800">
          <div className="relative w-full h-12 bg-white/10 rounded-xl overflow-hidden mb-2">
            <Image src="/logo.png" alt="Brem Mekar Sari 1" fill className="object-contain p-1.5" />
          </div>
          <p className="text-green-400 text-xs text-center font-medium">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          <TabButton tab="settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={Settings} label="Pengaturan" />
          <TabButton tab="products" active={activeTab === "products"} onClick={() => setActiveTab("products")} icon={Package} label="Produk" />
          <TabButton tab="contents" active={activeTab === "contents"} onClick={() => setActiveTab("contents")} icon={ImageIcon} label="Konten" />
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-green-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-green-200 hover:bg-green-800/50 text-sm font-medium transition-colors w-full"
          >
            <Eye size={16} />
            Lihat Website
          </a>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-green-200 hover:bg-green-800/50 text-sm font-medium transition-colors w-full"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-900/30 text-sm font-medium transition-colors w-full"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">
            {activeTab === "settings" && "Pengaturan Website"}
            {activeTab === "products" && "Manajemen Produk"}
            {activeTab === "contents" && "Manajemen Konten"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola data website Brem Mekar Sari 1
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Memuat data...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "settings" && (
              <SettingsTab
                settings={settings}
                onSave={(s) => save({ settings: s, products, contents })}
                saving={saving}
              />
            )}
            {activeTab === "products" && (
              <ProductsTab
                products={products}
                onSave={(p) => save({ settings, products: p, contents, overrideProducts: true })}
                saving={saving}
              />
            )}
            {activeTab === "contents" && (
              <ContentsTab
                contents={contents}
                onSave={(c) => save({ settings, products, contents: c, overrideContents: true })}
                saving={saving}
              />
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-800 text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm z-50 animate-fade-in-up">
          {toast}
        </div>
      )}
    </div>
  );
}
