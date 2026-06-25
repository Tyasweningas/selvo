# LAPORAN PENGUJIAN PERANGKAT LUNAK (END-TO-END TESTING) DENGAN PLAYWRIGHT
**Studi Kasus: PBL Selvo - Platform Digital Asset Marketplace**  
**Mata Kuliah: Kapita Selekta TRPL (Minggu ke-13)**

---

## 1. Pendahuluan / Tujuan Pengujian
Pengujian End-to-End (E2E) dilakukan untuk mengevaluasi fungsionalitas aplikasi dari sudut pandang pengguna akhir (end-user). Pengujian ini memastikan bahwa seluruh komponen sistem—mulai dari antarmuka pengguna (UI), routing halaman, hingga integrasi dengan backend API dan database—bekerja selaras sesuai dengan alur bisnis yang diharapkan.

**Tujuan Pengujian:**
1. Menguji fungsionalitas navigasi publik pada platform Selvo (`https://selvo.web.id`), termasuk kelancaran loading halaman utama dan pembukaan halaman detail produk digital.
2. Memverifikasi fungsionalitas alur autentikasi pendaftaran akun seller baru dan pengalihan otomatis (*auto-login redirect*) ke halaman dashboard seller.
3. Mendeteksi cacat visual, kerusakan tautan (*broken links*), ketidaksesuaian struktur elemen (Semantic HTML), serta masalah keramahan pengguna (*usability*).
4. Memberikan umpan balik teknis dan rekomendasi perbaikan untuk menyempurnakan kegunaan dan aksesibilitas antarmuka pengguna sebelum aplikasi siap dirilis.

---

## 2. Tools yang Digunakan
1. **Playwright (by Microsoft):** Framework modern berbasis Node.js untuk otomatisasi pengujian browser web yang andal, cepat, dan mendukung berbagai platform (Chromium, Firefox, WebKit).
2. **Headless Chromium:** Mesin browser bawaan Playwright yang digunakan untuk mengeksekusi skenario uji di latar belakang (*headless mode*) guna menghemat memori dan mempercepat eksekusi.
3. **pnpm (Package Manager):** Digunakan untuk mengelola dependensi pengujian di frontend secara cepat.

---

## 3. Skenario Pengujian

### Skenario 1: Navigasi Publik dan Detail Produk
Tujuan: Memastikan pengunjung umum dapat menjelajah dan melihat detail produk secara lancar tanpa kendala.
* **Langkah-langkah Uji:**
  1. Membuka halaman utama (`/`).
  2. Memeriksa teks judul hero "Stop Desain Dari Nol" pada halaman utama untuk memastikan konten ter-render.
  3. Menunggu kartu produk pertama dimuat pada grid produk.
  4. Membaca judul produk pertama di kartu (misal: `Mockup PDH`).
  5. Melakukan klik pada kartu produk tersebut.
  6. Memastikan URL berubah menjadi `/products/[slug]`.
  7. Memeriksa apakah halaman detail produk menampilkan judul produk secara jelas serta memiliki tombol aksi yang aktif ("Beli Produk" dan "Tambah ke Keranjang").

### Skenario 2: Alur Autentikasi Registrasi Akun Seller Baru
Tujuan: Memastikan alur registrasi mandiri bagi seller baru berjalan mulus hingga masuk ke dashboard.
* **Langkah-langkah Uji:**
  1. Membuka halaman autentikasi (`/auth`).
  2. Mengeklik tautan "Daftar" untuk memindahkan tampilan dari form masuk ke form pendaftaran.
  3. Memastikan form registrasi aktif dengan mendeteksi teks "Buat Akun Gratis".
  4. Menuliskan nama seller (`Playwright Automated Seller`).
  5. Menghasilkan email unik dinamis secara acak (pola: `playwright_test_[timestamp]_[rand]@example.com`) untuk menghindari kesalahan bentrok data unik di database live.
  6. Mengisi sandi akun (`password123`).
  7. Mengeklik tombol "Sign Up".
  8. Menunggu proses integrasi backend selesai dan memastikan pengguna dialihkan secara otomatis ke rute halaman dashboard seller (`/dashboard`).
  9. Memverifikasi halaman dashboard telah termuat sempurna dengan mendeteksi nama seller dan teks "Tabungan Pendapatan Akun".

---

## 4. Langkah-langkah Pengujian

1. **Instalasi Dependensi & Browser Playwright:**
   Jalankan perintah ini di direktori frontend `selvo` untuk menambahkan library pengujian dan mengunduh browser Chromium:
   ```bash
   pnpm add -D @playwright/test
   pnpm exec playwright install chromium
   ```
2. **Pembuatan Konfigurasi & Script Pengujian:**
   * Konfigurasi tersimpan di: [playwright.config.ts](file:///home/bayuzzs/Project/selvo/playwright.config.ts)
   * Berkas pengujian tersimpan di: [tests/e2e/selvo.spec.ts](file:///home/bayuzzs/Project/selvo/tests/e2e/selvo.spec.ts)
3. **Eksekusi Pengujian:**
   Jalankan perintah pengujian E2E melalui terminal:
   ```bash
   pnpm exec playwright test
   ```
   *Ambil screenshot terminal saat proses asersi berjalan sukses dan status pengujian menunjukkan tanda centang hijau.*

---

## 5. Hasil Pengujian

Eksekusi pengujian otomatis Playwright berjalan dengan sangat lancar dan memberikan hasil sebagai berikut:

```
Running 2 tests using 1 worker
  ✓  [chromium] › tests/e2e/selvo.spec.ts:5:7 › Selvo E2E Testing › Skenario 1: Navigasi Publik dan Detail Produk (3.4s)
  ✓  [chromium] › tests/e2e/selvo.spec.ts:37:7 › Selvo E2E Testing › Skenario 2: Alur Autentikasi Registrasi Akun Seller Baru (4.5s)

  2 passed (8.4s)
```

### Tabel Rincian Hasil Uji E2E

| Skenario Pengujian | Asersi yang Diverifikasi | Waktu Eksekusi | Status |
| :--- | :--- | :---: | :---: |
| **Skenario 1:** Navigasi Publik | Teks hero ada, produk pertama tampil, perpindahan URL ke detail produk valid, judul detail ada, tombol beli & keranjang aktif. | **3.4 detik** | **SUKSES (PASS)** |
| **Skenario 2:** Registrasi Akun | Tombol toggle form aktif, pengisian input valid, respons pengiriman form sukses, URL dialihkan ke `/dashboard`, data seller & kartu tabungan tampil di dashboard. | **4.5 detik** | **SUKSES (PASS)** |
| **Total Pengujian** | **2 dari 2 skenario berhasil dieksekusi tanpa kegagalan.** | **8.4 detik** | **SUKSES (PASS)** |

---

## 6. Temuan (Bug/Issue)

Meskipun pengujian fungsionalitas berjalan sukses 100%, kami menemukan beberapa masalah struktural UI dan celah keamanan pada antarmuka pengguna:

1. **Masalah Aksesibilitas (a11y) & Semantic HTML pada Dashboard Seller:**
   * Di dalam halaman dashboard seller (`/dashboard`), judul penting seperti nama seller (`Playwright Automated Seller`) dan penunjuk kartu seperti `"Tabungan Pendapatan Akun"` di-render menggunakan tag paragraf standar (`<p>`) yang diberi gaya tebal (bold), alih-alih menggunakan tag heading HTML yang semantik seperti `<h1>`, `<h2>`, atau `<h3>`.
   * **Dampak:** Hal ini menyulitkan pembaca layar (*screen readers*) bagi penyandang disabilitas untuk menavigasi struktur halaman secara hierarkis, serta berdampak negatif pada keramahan SEO halaman.
2. **Ketiadaan Proteksi Bot/Spam (Captcha) pada Alur Autentikasi:**
   * Alat otomatisasi Playwright dapat melakukan pendaftaran akun baru secara instan (hanya 4.5 detik) tanpa hambatan pemeriksaan keamanan seperti Google reCAPTCHA atau Cloudflare Turnstile.
   * **Dampak:** Tanpa adanya proteksi bot, sistem rentan terhadap serangan spam pendaftaran akun palsu massal yang dapat memenuhi penyimpanan database produksi dalam waktu singkat.
3. **Pemuatan Aset Gambar Tanpa Optimasi Terpadu:**
   * Beberapa gambar thumbnail produk tidak teroptimasi dengan baik di bawah koneksi lambat, yang dapat memengaruhi metrik Core Web Vitals (terutama *Largest Contentful Paint* / LCP).

---

## 7. Analisis dan Rekomendasi Perbaikan

### A. Perbaikan Semantic HTML pada Dashboard
* **Analisis:** Mengganti elemen `<p>` dengan elemen heading yang tepat untuk memperjelas arsitektur dokumen.
* **Perbaikan:** Ubah kode komponen dashboard agar membungkus judul utama dengan tag heading, misalnya:
  ```tsx
  // Sebelum (Kurang Semantik)
  <p className="text-xl font-bold">Tabungan Pendapatan Akun</p>
  
  // Sesudah (Lebih Semantik & Baik untuk Aksesibilitas)
  <h2 className="text-xl font-bold">Tabungan Pendapatan Akun</h2>
  ```

### B. Integrasi Sistem Anti-Bot (Captcha) pada Form Registrasi
* **Analisis:** Melindungi endpoint pendaftaran dari eksploitasi skrip otomatis.
* **Perbaikan:** Integrasikan widget reCAPTCHA v3 atau Cloudflare Turnstile pada komponen `RegisterForm` (`src/components/seller/auth/register-form.tsx`) sebelum memproses pengiriman data ke backend.

### C. Pembersihan Data Uji Beban secara Berkala
* **Analisis:** Pengujian otomatis E2E mendaftarkan data real ke database API live.
* **Perbaikan:** Implementasikan scheduler script pada database backend untuk menghapus user dengan pola email `playwright_test_*` secara berkala (misal: setiap akhir pekan) agar database tidak membengkak dengan data sampah pengujian.

---

## 8. Kesimpulan

Frontend **Selvo Web Application** berhasil melalui pengujian E2E fungsionalitas dengan performa yang **sangat responsif dan stabil**:
* Seluruh asersi pengujian navigasi produk dan pendaftaran akun baru berjalan **lancar 100%** tanpa memicu error pemuatan halaman (*page blank*) maupun kegagalan penanganan state.
* Kecepatan routing Next.js sangat optimal, terbukti dengan penyelesaian alur registrasi hingga muat dashboard yang memakan waktu kurang dari 5 detik.
* Penyempurnaan pada sisi aksesibilitas (penerapan tag heading semantik) dan keamanan (pemasangan Captcha pencegah bot) akan membuat aplikasi Selvo menjadi produk digital yang jauh lebih premium, aman, dan inklusif bagi semua pengguna.
