# 🌿 Brem Mekar Sari 1 - Deployment Guide

## 📦 Project Info
- **Framework**: Next.js 16 + TypeScript + Tailwind CSS
- **Data Source**: Google Sheets (Published CSV)
- **Admin Panel**: `/admin` (password protected)
- **Default Password**: `mekarsari2024`

---

## 🚀 Deploy ke Vercel (Gratis)

### Langkah 1: Push ke GitHub
```bash
cd d:\webDev\brem-mekar-sari
git init
git add .
git commit -m "Initial commit: Brem Mekar Sari 1 landing page"
```
Buat repo baru di GitHub (github.com), lalu:
```bash
git remote add origin https://github.com/USERNAME/brem-mekar-sari.git
git push -u origin main
```

### Langkah 2: Deploy di Vercel
1. Buka **vercel.com** → Login dengan GitHub
2. Klik **"New Project"** → Import repo `brem-mekar-sari`
3. Framework akan terdeteksi otomatis sebagai **Next.js**
4. Klik **"Deploy"** → tunggu ~2 menit

### Langkah 3: Environment Variables di Vercel
Di Vercel Dashboard → Settings → Environment Variables, tambahkan:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SHEETS_ID` | `2PACX-1vRD-78lQk...` |
| `NEXT_PUBLIC_WA_NUMBER` | `6285212312312` |
| `ADMIN_PASSWORD` | `[password baru yang aman]` |
| `JWT_SECRET` | `[random string panjang]` |
| `BITLY_ACCESS_TOKEN` | `[dari dev.bitly.com - opsional]` |

### Langkah 4: Custom Domain (Opsional)
Di Vercel → Settings → Domains → Tambah domain custom

---

## 🔗 Bitly CTA Tracking

1. Buka **dev.bitly.com** → Login/Register
2. Buat Bitly link dari WA link:
   ```
   https://wa.me/6285212312312?text=Halo+Mekar+Sari+1!
   ```
3. Copy link pendek (contoh: `https://bit.ly/brem-ms1`)
4. Masukkan di Admin Panel → Pengaturan → **"Bitly WA Link"**

---

## ⚙️ Admin Panel

URL: `https://[domain-anda]/admin`

### Fitur:
- **Pengaturan**: Edit semua teks, nomor WA, jam operasional, sosial media
- **Produk**: Tambah/edit/hapus produk dengan harga, foto, deskripsi
- **Konten**: Kelola foto & video galeri (link Google Drive / YouTube)

### Cara Update Produk:
1. Login ke `/admin`
2. Klik tab **"Produk"**
3. Edit atau tambah produk baru
4. Klik **"Simpan Semua Produk"**

---

## 📊 Google Sheets Setup

Sheet harus dipublish:
1. Buka Google Sheets
2. **File → Share → Publish to web**
3. Pilih format **CSV**
4. Copy bagian ID dari URL:
   ```
   https://docs.google.com/spreadsheets/d/e/[ID]/pub
   ```

### Format Sheet PRODUK:
| id | nama | deksripsi | harga | link_gambar |
|----|------|-----------|-------|-------------|
| 1  | Brem 10KG | Grosir 10KG | 640000 | https://drive.google.com/... |

### Format Sheet KONTEN:
| id | judul | tipe | link | deskripsi |
|----|-------|------|------|-----------|
| 1  | Foto Produk | foto | https://drive.google.com/... | Caption |
| 2  | Video Proses | video | https://youtube.com/... | Caption |

---

## 🖼️ Google Drive Image Tips

Untuk foto dari Google Drive:
1. Upload foto ke Google Drive
2. Klik kanan → **"Get link"** → Ubah ke **"Anyone with the link"**
3. Copy link, paste di kolom `link_gambar`

Format yang didukung:
- `https://drive.google.com/file/d/[ID]/view`
- `https://drive.google.com/open?id=[ID]`

---

## 🛡️ Security Notes

- Ganti `ADMIN_PASSWORD` dengan password yang kuat
- Ganti `JWT_SECRET` dengan string random yang panjang
- Jangan share environment variables ke publik
