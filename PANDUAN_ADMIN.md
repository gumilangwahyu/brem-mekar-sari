# 📖 Panduan Operasional Admin Website Brem Mekar Sari 1

Selamat datang di Panduan Dasar Pengelolaan Website dan Pesanan Digital **Brem Mekar Sari 1**. Panduan ini disusun khusus untuk membantu pengelola UMKM/Admin dalam memperbarui profil online dan mengelola aliran pesanan grosir secara mandiri, aman, dan tanpa kendala teknis.

---

## 1. 📲 Aliran Pengelolaan Pesanan Digital (WhatsApp Grosir)

Website Brem Mekar Sari 1 menggunakan sistem **WhatsApp Direct Checkout** yang disesuaikan khusus untuk transaksi wholesale/grosir (minimal pemesanan 10 KG).

### 🔄 Alur Pesanan Masuk:
* **Langkah 1**: Pengunjung website memilih paket grosir yang diinginkan di halaman depan lalu mengklik tombol **"Pesan via WhatsApp"**.
* **Langkah 2**: Aplikasi WhatsApp pelanggan akan terbuka otomatis dan mengirimkan pesan dengan format pemesanan baku:
  > *"Halo Mekar Sari 1! Saya tertarik untuk memesan grosir produk **Brem 10KG** (Rp 640.000) dengan minimal pemesanan 10 KG."*
* **Langkah 3**: Pesan masuk ke HP WhatsApp Admin. Admin mengonfirmasi total biaya pembelian dan menghitung ongkos kirim kargo termurah sesuai alamat tujuan pelanggan.
* **Langkah 4**: Pelanggan melakukan pembayaran transfer bank.
* **Langkah 5**: Admin mengemas pesanan dengan aman berlapis dus tebal dan mengirimkannya via ekspedisi kargo pilihan.

> [!TIP]
> **Rekomendasi Template Balasan Admin:**
> *"Halo Kak! Terima kasih telah menghubungi Brem Mekar Sari 1. Pesanan grosir Kakak untuk produk **[Nama Produk]** telah kami catat. Bolehkah kami tahu **Kota & Kecamatan Tujuan Pengiriman** Kakak agar kami bisa bantu mencarikan tarif ongkos kirim kargo termurah dan aman? 🙏"*

---

## 2. 🔐 Cara Masuk ke Halaman Admin (Login)

Untuk melakukan segala pembaruan profil dan data produk, Anda harus masuk ke Admin Panel terlebih dahulu.

1. Buka browser dan ketik alamat website Anda lalu tambahkan `/admin` di belakangnya.
   * *Contoh*: `https://brem-mekar-sari-1.vercel.app/admin`
2. Masukkan **Username** dan **Password** admin Anda.
3. Klik tombol **Masuk**.

---

## 3. ⚙️ Pembaruan Profil Online & Informasi Bisnis

Di Tab **"Pengaturan"**, Anda dapat mengubah informasi dasar website Anda secara real-time.

| Kolom Input | Fungsi Utama | Tips Penulisan |
| :--- | :--- | :--- |
| **Nama Website** | Nama identitas usaha Anda pada pencarian Google. | Tulis `Brem Mekar Sari 1` |
| **Tagline** | Slogan pendek di bawah nama website. | Contoh: `Cita Rasa Asli, Warisan Tiga Generasi` |
| **Hero Title** | Judul besar paling pertama di halaman depan website. | *Gunakan kata **"Premium"** agar teks tersebut otomatis berwarna emas.* |
| **Nomor WhatsApp** | Nomor tujuan utama chat pesanan masuk. | **Harus diawali dengan kode negara 62** (Contoh: `6287724081696`). Jangan menggunakan angka `0` di depan. |
| **Hero Subtitle** | Penjelasan singkat produk/usaha di halaman depan. | Buat 2-3 kalimat promosi yang menarik pembeli grosir. |

> [!WARNING]
> **PENTING:** Setiap kali Anda selesai mengubah data di tab apa pun, **Anda harus mengklik tombol "Simpan"** (contoh: *"Simpan Pengaturan"*) di bagian bawah halaman agar perubahan tersimpan secara permanen ke database awan (Supabase).

---

## 📦 4. Manajemen Produk (Tambah, Edit, Hapus)

Website ini dikonfigurasi **khusus grosir**. Ikuti langkah berikut untuk mengelola katalog produk:

### ➕ Menambahkan Produk Baru:
1. Masuk ke Tab **Produk**.
2. Klik tombol **➕ Tambah Produk** di pojok kanan atas.
3. Gulir ke bawah, lalu klik kartu produk baru yang bertuliskan *"Produk Baru"* untuk membuka kolom pengisian.
4. Isi data produk:
   * **Nama**: Contoh: `Brem Paket Distributor 50KG`
   * **Harga**: Masukkan angka saja tanpa titik/rupiah (Contoh: `3200000`).
   * **Gambar**: Klik tombol **Unggah Gambar** untuk memilih foto kemasan produk langsung dari HP/Laptop Anda.
   * **Kategori**: Tulis `Grosir` atau `Distributor`.
   * **Berat**: Tulis kapasitas berat kemasan (Contoh: `50kg`).
5. Klik tombol **💾 Simpan Semua Produk** di bagian bawah.

---

## ❓ 5. Mengelola Halaman Tanya Jawab (FAQ)

FAQ berfungsi meredam keraguan calon pembeli grosir luar kota secara otomatis sebelum mereka masuk ke WhatsApp Anda.

### ✏️ Cara Mengubah Pertanyaan / Jawaban:
1. Masuk ke Tab **FAQ**.
2. Klik salah satu pertanyaan yang ingin diubah untuk membuka lembar edit.
3. Sesuaikan teks pertanyaan pada kolom **Pertanyaan** dan jawabannya pada kolom **Jawaban**.
4. Klik **💾 Simpan Semua FAQ** untuk memperbarui isi website.

> [!NOTE]
> Jika Anda ingin menonaktifkan atau menyembunyikan seksi FAQ sementara waktu, Anda cukup menghapus semua item FAQ yang ada di daftar tersebut. Seksi FAQ di halaman depan akan otomatis tersembunyi dengan rapi.

---

## 📸 6. Panduan Optimasi Gambar (Sangat Penting)

Agar website Anda tetap diakses dengan super cepat oleh calon pelanggan, admin wajib memperhatikan ukuran file foto sebelum mengunggahnya ke website.

* **Ukuran Maksimal**: Batas maksimal sistem adalah **5 MB** per gambar, namun sangat direkomendasikan ukuran gambar di bawah **1 MB**.
* **Dimensi Rekomendasi**: Gunakan foto dengan rasio persegi (**1:1**) untuk gambar produk agar tampilan kartu produk di halaman depan rapi dan seragam.
* **Alat Kompresi Gratis**: Jika foto jepretan kamera HP Anda terlalu besar (misal 4 MB - 8 MB), Anda bisa mengecilkannya secara gratis terlebih dahulu melalui situs seperti [TinyPNG](https://tinypng.com/) sebelum diunggah ke website.
