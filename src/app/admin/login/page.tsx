"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/admin");
    } else {
      setError(data.error || "Password salah. Coba lagi.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(160deg, #0a3318 0%, #145a2e 50%, #1a7a3c 100%)" }}
    >
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header band */}
          <div className="bg-green-700 px-8 py-6 flex flex-col items-center">
            {/* Logo landscape */}
            <div className="relative w-full h-16 bg-white rounded-2xl overflow-hidden shadow-md mb-3">
              <Image
                src="/logo.png"
                alt="Brem Mekar Sari 1"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
            <h1 className="text-white font-black text-lg mt-1">Admin Panel</h1>
            <p className="text-green-200 text-xs">Brem Mekar Sari 1 — Pak Sugeng</p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2">
                  Password Admin
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  required
                  autoFocus
                  className="w-full border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                {loading ? "Memverifikasi..." : "Masuk ke Admin Panel"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-5">
              <a href="/" className="hover:text-green-700 transition-colors font-medium">
                ← Kembali ke Landing Page
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-green-400/60 text-xs mt-4">
          Default password: <code className="bg-white/10 px-2 py-0.5 rounded">mekarsari2024</code>
        </p>
      </div>
    </div>
  );
}
