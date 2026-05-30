"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SiteSettings, Product, ContentItem, FAQItem } from "@/types";
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
  ChevronDown,
  ChevronUp,
  Eye,
  Pencil,
  HelpCircle,
} from "lucide-react";

type Tab = "settings" | "products" | "contents" | "faqs";

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

// --- Image Uploader Component (Supabase Storage integration) ---
function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Gagal mengunggah gambar.");
      }
    } catch (err) {
      console.error(err);
      setError("Koneksi gagal saat mengunggah.");
    } finally {
      setUploading(false);
    }
  };

  // Convert target label into a unique id safe for html attributes
  const safeId = `uploader-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div>
      <label className="text-xs font-bold text-gray-600 block mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Salin url atau pilih berkas gambar di samping ➡️"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
          />
        </div>
        <div className="relative flex items-center justify-center shrink-0">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            id={safeId}
            className="hidden"
          />
          <label
            htmlFor={safeId}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
              uploading
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            }`}
          >
            {uploading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Unggah...
              </>
            ) : (
              <>
                <Plus size={14} />
                Pilih File
              </>
            )}
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium mt-1.5">{error}</p>
      )}
      {value && (
        <div className="mt-2.5 relative w-24 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shadow-sm flex items-center justify-center">
          <img
            src={value}
            alt="Preview"
            className="object-contain w-full h-full p-1"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}

// --- Settings Tab ---
function SettingsTab({
  settings,
  onChange,
  onSave,
  saving,
}: {
  settings: SiteSettings;
  onChange: (s: SiteSettings) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const update = (key: keyof SiteSettings, val: string) =>
    onChange({ ...settings, [key]: val });

  return (
    <div className="space-y-8">
      {/* General */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
          <Settings size={16} className="text-green-600" />
          Pengaturan Umum
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nama Website"
            value={settings.siteName}
            onChange={(v) => update("siteName", v)}
          />
          <InputField
            label="Tagline"
            value={settings.tagline}
            onChange={(v) => update("tagline", v)}
          />
          <InputField
            label="Hero Title"
            value={settings.heroTitle}
            onChange={(v) => update("heroTitle", v)}
          />
          <InputField
            label="Nomor WhatsApp"
            value={settings.waNumber}
            onChange={(v) => update("waNumber", v)}
            placeholder="628xxx"
          />
          <InputField
            label="Hero Subtitle"
            value={settings.heroSubtitle}
            onChange={(v) => update("heroSubtitle", v)}
            rows={3}
          />
          <InputField
            label="Pesan WA Default"
            value={settings.waMessage}
            onChange={(v) => update("waMessage", v)}
            rows={3}
          />
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-5">Tentang Bisnis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Teks Tentang"
            value={settings.aboutText}
            onChange={(v) => update("aboutText", v)}
            rows={4}
          />
          <div className="space-y-4">
            <InputField
              label="Alamat"
              value={settings.address}
              onChange={(v) => update("address", v)}
            />
            <InputField
              label="Jam Operasional"
              value={settings.operationalHours}
              onChange={(v) => update("operationalHours", v)}
            />
            <InputField
              label="Kapasitas Produksi"
              value={settings.productionCapacity}
              onChange={(v) => update("productionCapacity", v)}
            />
            <InputField
              label="Ketahanan Produk"
              value={settings.shelfLife}
              onChange={(v) => update("shelfLife", v)}
            />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-5">Link & Sosial Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Bitly WA Link (opsional)"
            value={settings.bitlyWaLink || ""}
            onChange={(v) => update("bitlyWaLink", v)}
            placeholder="https://bit.ly/xxx"
          />
          <InputField
            label="Instagram URL"
            value={settings.instagramUrl || ""}
            onChange={(v) => update("instagramUrl", v)}
            placeholder="https://instagram.com/xxx"
          />
          <InputField
            label="Facebook URL"
            value={settings.facebookUrl || ""}
            onChange={(v) => update("facebookUrl", v)}
            placeholder="https://facebook.com/xxx"
          />
          <InputField
            label="TikTok URL"
            value={settings.tiktokUrl || ""}
            onChange={(v) => update("tiktokUrl", v)}
            placeholder="https://tiktok.com/@xxx"
          />
          <InputField
            label="YouTube URL"
            value={settings.youtubeUrl || ""}
            onChange={(v) => update("youtubeUrl", v)}
            placeholder="https://youtube.com/@xxx"
          />
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="bg-green-700 hover:bg-green-600 text-white font-bold flex items-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-60 transition-all shadow-md"
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
  onChange,
  onSave,
  onReset,
  saving,
}: {
  products: Product[];
  onChange: (p: Product[]) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

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
    onChange([...products, newItem]);
    setExpanded(newItem.id);
  };

  const update = (id: string, key: keyof Product, val: string | number) => {
    onChange(
      products.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );
  };

  const remove = (id: string) => {
    onChange(products.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">
          Manajemen Produk ({products.length} produk)
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-green-700 text-sm font-semibold rounded-xl transition-all shadow-sm border border-green-200"
          >
            <RefreshCw size={14} className={saving ? "animate-spin" : ""} />
            Sinkronkan dg Sheets
          </button>
          <button
            onClick={add}
            className="bg-green-700 hover:bg-green-600 text-white text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <Plus size={14} />
            Tambah Produk
          </button>
        </div>
      </div>

      {products.map((product, i) => (
        <div
          key={product.id || i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() =>
              setExpanded(expanded === product.id ? null : product.id)
            }
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">
                🍬
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {product.nama}
                </p>
                <p className="text-green-600 text-xs font-medium">
                  Rp {Number(product.harga || 0).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(expanded === product.id ? null : product.id);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors border border-green-100"
              >
                <Pencil size={12} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(product.id);
                }}
                className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
              {expanded === product.id ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>
          </div>

          {expanded === product.id && (
            <div className="border-t border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/30">
              <InputField
                label="Nama Produk"
                value={product.nama}
                onChange={(v) => update(product.id, "nama", v)}
              />
              <InputField
                label="Harga (Rp)"
                value={String(product.harga)}
                type="number"
                onChange={(v) => update(product.id, "harga", v)}
              />
              <InputField
                label="Deskripsi"
                value={product.deksripsi}
                onChange={(v) => update(product.id, "deksripsi", v)}
                rows={2}
              />
              <ImageUploader
                label="Gambar Produk"
                value={product.link_gambar}
                onChange={(v) => update(product.id, "link_gambar", v)}
              />
              <InputField
                label="Kategori (opsional)"
                value={product.kategori || ""}
                onChange={(v) => update(product.id, "kategori", v)}
                placeholder="Grosir / Distributor"
              />
              <InputField
                label="Berat (opsional)"
                value={product.berat || ""}
                onChange={(v) => update(product.id, "berat", v)}
                placeholder="10kg / 20kg"
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={onSave}
        disabled={saving}
        className="bg-green-700 hover:bg-green-600 text-white font-bold flex items-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-60 transition-all shadow-md"
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
  onChange,
  onSave,
  onReset,
  saving,
}: {
  contents: ContentItem[];
  onChange: (c: ContentItem[]) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      judul: "Konten Baru",
      tipe: "foto",
      link: "",
      deskripsi: "",
    };
    onChange([...contents, newItem]);
    setExpanded(newItem.id);
  };

  const update = (id: string, key: keyof ContentItem, val: string) => {
    onChange(
      contents.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );
  };

  const remove = (id: string) => {
    onChange(contents.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">
          Manajemen Konten ({contents.length} item)
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-green-700 text-sm font-semibold rounded-xl transition-all shadow-sm border border-green-200"
          >
            <RefreshCw size={14} className={saving ? "animate-spin" : ""} />
            Sinkronkan dg Sheets
          </button>
          <button
            onClick={add}
            className="bg-green-700 hover:bg-green-600 text-white text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <Plus size={14} />
            Tambah Konten
          </button>
        </div>
      </div>

      {contents.map((item, i) => (
        <div
          key={item.id || i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                  item.tipe === "video" ? "bg-red-500" : "bg-green-600"
                }`}
              >
                {item.tipe === "video" ? "▶" : "📷"}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {item.judul}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.tipe === "video" ? "Video" : "Foto"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(expanded === item.id ? null : item.id);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors border border-green-100"
              >
                <Pencil size={12} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(item.id);
                }}
                className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
              {expanded === item.id ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>
          </div>

          {expanded === item.id && (
            <div className="border-t border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/30">
              <InputField
                label="Judul"
                value={item.judul}
                onChange={(v) => update(item.id, "judul", v)}
              />
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5 uppercase tracking-wide">
                  Tipe
                </label>
                <select
                  value={item.tipe}
                  onChange={(e) => update(item.id, "tipe", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 bg-white"
                >
                  <option value="foto">📷 Foto</option>
                  <option value="video">▶️ Video</option>
                </select>
              </div>
              {item.tipe === "foto" ? (
                <ImageUploader
                  label="Gambar Konten"
                  value={item.link}
                  onChange={(v) => update(item.id, "link", v)}
                />
              ) : (
                <InputField
                  label="Link Video (YouTube)"
                  value={item.link}
                  onChange={(v) => update(item.id, "link", v)}
                  placeholder="https://youtube.com/..."
                />
              )}
              <InputField
                label="Deskripsi (opsional)"
                value={item.deskripsi || ""}
                onChange={(v) => update(item.id, "deskripsi", v)}
                rows={2}
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={onSave}
        disabled={saving}
        className="bg-green-700 hover:bg-green-600 text-white font-bold flex items-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-60 transition-all shadow-md"
      >
        <Save size={16} />
        {saving ? "Menyimpan..." : "Simpan Semua Konten"}
      </button>
    </div>
  );
}

// --- FAQs Tab ---
function FAQsTab({
  faqs,
  onChange,
  onSave,
  saving,
}: {
  faqs: FAQItem[];
  onChange: (f: FAQItem[]) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const newItem: FAQItem = {
      id: Date.now().toString(),
      q: "Pertanyaan Baru",
      a: "",
    };
    onChange([...faqs, newItem]);
    setExpanded(newItem.id);
  };

  const update = (id: string, key: keyof FAQItem, val: string) => {
    onChange(
      faqs.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );
  };

  const remove = (id: string) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus FAQ ini?");
    if (!isConfirmed) return;
    onChange(faqs.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">
          Manajemen Tanya Jawab ({faqs.length} item)
        </h3>
        <button
          onClick={add}
          className="bg-green-700 hover:bg-green-600 text-white text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <Plus size={14} />
          Tambah FAQ
        </button>
      </div>

      {faqs.map((item, i) => (
        <div
          key={item.id || i}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-green-700">
                ❓
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {item.q || "Pertanyaan Baru"}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.a ? item.a.substring(0, 60) + (item.a.length > 60 ? "..." : "") : "Belum ada jawaban"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(expanded === item.id ? null : item.id);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors border border-green-100"
              >
                <Pencil size={12} />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(item.id);
                }}
                className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
              {expanded === item.id ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>
          </div>

          {expanded === item.id && (
            <div className="border-t border-gray-100 p-4 grid grid-cols-1 gap-4 bg-gray-50/30">
              <InputField
                label="Pertanyaan"
                value={item.q}
                onChange={(v) => update(item.id, "q", v)}
              />
              <InputField
                label="Jawaban"
                value={item.a}
                onChange={(v) => update(item.id, "a", v)}
                rows={4}
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={onSave}
        disabled={saving}
        className="bg-green-700 hover:bg-green-600 text-white font-bold flex items-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-60 transition-all shadow-md mt-4"
      >
        <Save size={16} />
        {saving ? "Menyimpan..." : "Simpan Semua FAQ"}
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
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
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
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
      setProducts(data.products || []);
      setContents(data.contents || []);
      setFaqs(data.faqs || []);
    } catch (e) {
      console.error("Gagal memuat data:", e);
      showToast("❌ Gagal mengambil data terbaru.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (customPayload?: {
    settings?: SiteSettings;
    products?: Product[];
    contents?: ContentItem[];
    faqs?: FAQItem[];
    overrideProducts?: boolean;
    overrideContents?: boolean;
  }) => {
    setSaving(true);

    // Construct consolidated payload combining the updated data and current sibling state in parent
    const payload = {
      settings: customPayload?.settings || settings,
      products: customPayload?.products || products,
      contents: customPayload?.contents || contents,
      faqs: customPayload?.faqs || faqs,
      overrideProducts:
        customPayload?.overrideProducts !== undefined
          ? customPayload.overrideProducts
          : true,
      overrideContents:
        customPayload?.overrideContents !== undefined
          ? customPayload.overrideContents
          : true,
    };

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("✅ Perubahan berhasil disimpan secara permanen!");

        // Sync local states
        if (customPayload?.settings) setSettings(customPayload.settings);
        if (customPayload?.products) setProducts(customPayload.products);
        if (customPayload?.contents) setContents(customPayload.contents);
        if (customPayload?.faqs) setFaqs(customPayload.faqs);
      } else {
        showToast("❌ Gagal menyimpan perubahan.");
      }
    } catch (e) {
      console.error(e);
      showToast("❌ Terjadi kesalahan koneksi.");
    }
    setSaving(false);
  };

  const handleReset = async (type: "products" | "contents") => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menyinkronkan ulang data ${
        type === "products" ? "Produk" : "Konten"
      } dengan Google Sheets? Semua perubahan lokal di Admin Panel akan ditimpa dengan data Google Sheets.`,
    );
    if (!isConfirmed) return;

    setSaving(true);
    try {
      const payload: any = {
        settings,
        products: type === "products" ? [] : products,
        contents: type === "contents" ? [] : contents,
      };

      if (type === "products") {
        payload.overrideProducts = false;
      } else {
        payload.overrideContents = false;
      }

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("🔄 Berhasil disinkronkan dengan Google Sheets!");
        await fetchData();
      } else {
        showToast("❌ Gagal menyinkronkan data.");
      }
    } catch (e) {
      console.error(e);
      showToast("❌ Terjadi kesalahan koneksi.");
    }
    setSaving(false);
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
        <div className="p-5 border-b border-green-800 flex flex-col items-center">
          <div className="relative w-16 h-16 bg-white/5 border border-green-700/30 rounded-full overflow-hidden mb-2 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Brem Mekar Sari 1"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <p className="text-green-400 text-xs text-center font-semibold">
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          <TabButton
            tab="settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={Settings}
            label="Pengaturan"
          />
          <TabButton
            tab="products"
            active={activeTab === "products"}
            onClick={() => setActiveTab("products")}
            icon={Package}
            label="Produk"
          />
          <TabButton
            tab="contents"
            active={activeTab === "contents"}
            onClick={() => setActiveTab("contents")}
            icon={ImageIcon}
            label="Konten"
          />
          <TabButton
            tab="faqs"
            active={activeTab === "faqs"}
            onClick={() => setActiveTab("faqs")}
            icon={HelpCircle}
            label="FAQ"
          />
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
            {activeTab === "faqs" && "Manajemen Tanya Jawab (FAQ)"}
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
                onChange={setSettings}
                onSave={() => handleSave({ settings })}
                saving={saving}
              />
            )}
            {activeTab === "products" && (
              <ProductsTab
                products={products}
                onChange={setProducts}
                onSave={() => handleSave({ products, overrideProducts: true })}
                onReset={() => handleReset("products")}
                saving={saving}
              />
            )}
            {activeTab === "contents" && (
              <ContentsTab
                contents={contents}
                onChange={setContents}
                onSave={() => handleSave({ contents, overrideContents: true })}
                onReset={() => handleReset("contents")}
                saving={saving}
              />
            )}
            {activeTab === "faqs" && (
              <FAQsTab
                faqs={faqs}
                onChange={setFaqs}
                onSave={() => handleSave({ faqs })}
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
