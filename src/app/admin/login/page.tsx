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
      setError(data.error || "Login gagal");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-green-50 shadow-lg ring-4 ring-green-100">
            <Image src="/logo.png" alt="Logo" width={80} height={80} className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-green-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Brem Mekar Sari 1</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">
              Password Admin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 rounded-xl text-white font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Memverifikasi..." : "Masuk ke Admin Panel"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-green-600 transition-colors">← Kembali ke Landing Page</a>
        </p>
      </div>
    </div>
  );
}
