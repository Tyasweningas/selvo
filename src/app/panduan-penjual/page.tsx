"use client";

import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  IoBookOutline, 
  IoChevronDownSharp, 
  IoChevronForwardSharp, 
  IoCloudUploadOutline, 
  IoCreateOutline, 
  IoDocumentTextOutline, 
  IoHelpCircleOutline, 
  IoImageOutline, 
  IoInformationCircleOutline, 
  IoOptionsOutline, 
  IoShieldCheckmarkOutline, 
  IoWalletOutline 
} from "react-icons/io5";

interface FAQItem {
  question: string;
  answer: string;
}

export default function PanduanPenjualPage() {
  const [activeSection, setActiveSection] = useState("mulai-menjual");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Monitor scroll to highlight active sidebar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["mulai-menjual", "langkah-upload", "penarikan-dana", "kebijakan-platform", "faq"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const uploadSteps = [
    {
      step: "01",
      title: "Informasi Umum",
      icon: <IoInformationCircleOutline className="size-6 text-[#37A2EA]" />,
      desc: "Isi nama aset digital Anda, tentukan kategori yang paling sesuai (seperti 3D, Desain Grafis, Template Web), tetapkan harga yang kompetitif, serta unggah file utama produk digital Anda (.zip)."
    },
    {
      step: "02",
      title: "Deskripsi & Kata Kunci",
      icon: <IoDocumentTextOutline className="size-6 text-[#76D672]" />,
      desc: "Tulis deskripsi produk yang informatif guna memandu calon pembeli. Tambahkan tag atau kata kunci relevan untuk meningkatkan probabilitas kemunculan produk Anda pada hasil pencarian Selvo."
    },
    {
      step: "03",
      title: "Spesifikasi Produk",
      icon: <IoOptionsOutline className="size-6 text-[#CE82FF]" />,
      desc: "Masukkan detail spesifikasi teknis dari aset Anda seperti ukuran unduh file (download size), format ekstensi file (.psd, .fig, .fbx, dll.), jumlah halaman/slide, maupun kecocokan software."
    },
    {
      step: "04",
      title: "Gambar & Galeri",
      icon: <IoImageOutline className="size-6 text-[#FFA657]" />,
      desc: "Unggah gambar thumbnail utama (cover) beresolusi tinggi dengan rasio 4:3, serta beberapa gambar screenshot/preview pendukung untuk mendemonstrasikan keunggulan visual produk digital Anda."
    },
    {
      step: "05",
      title: "Tinjau & Publikasikan",
      icon: <IoShieldCheckmarkOutline className="size-6 text-[#FF6B9A]" />,
      desc: "Periksa kembali seluruh kelengkapan detail aset Anda. Setelah yakin semuanya lengkap dan bebas dari hak cipta pihak ketiga, publikasikan agar aset Anda langsung aktif di katalog Selvo."
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "Bagaimana sistem pembayaran dan berapa komisi di Selvo?",
      answer: "Selvo hanya menyediakan metode pembayaran QRIS untuk memproses transaksi pembeli secara instan dan otomatis. Kami mengenakan biaya admin/komisi platform flat sebesar 3% dari setiap transaksi yang sukses. Contoh: jika aset Anda terjual seharga IDR 100.000, Anda akan menerima IDR 97.000 bersih ke saldo akun Anda. Tidak ada biaya pendaftaran atau biaya bulanan tersembunyi."
    },
    {
      question: "Jenis format file apa saja yang diperbolehkan?",
      answer: "Anda dapat menjual berbagai macam aset digital seperti file template 3D (.obj, .fbx, .blend), template website/code (.html, .tsx, .vue, .zip), preset musik (.wav, .mp3), maupun aset desain grafis (.psd, .ai, .fig, .eps). Seluruh file produk utama wajib dikemas dalam format .zip sebelum diunggah."
    },
    {
      question: "Berapa lama proses verifikasi penarikan dana?",
      answer: "Setiap permintaan penarikan dana (withdrawal) akan diverifikasi secara manual oleh tim admin Selvo untuk mendeteksi transaksi fraud atau klaim hak cipta. Proses verifikasi biasanya memakan waktu maksimal 1 - 2 hari kerja sebelum dana ditransfer ke rekening bank terdaftar Anda."
    },
    {
      question: "Apakah saya boleh menjual produk hasil karya desainer lain?",
      answer: "Sangat DILARANG. Selvo sangat menjunjung tinggi kekayaan intelektual. Anda hanya diperbolehkan menjual produk digital yang sepenuhnya merupakan hak cipta orisinal milik Anda sendiri atau lisensi komersial penuh. Akun yang terdeteksi melakukan plagiarisme akan ditangguhkan secara permanen dan saldonya akan dibekukan."
    },
    {
      question: "Bagaimana cara memperbarui informasi rekening bank saya?",
      answer: "Anda dapat memperbarui informasi bank melalui halaman Dashboard Seller -> Pengaturan Akun / Bank. Isi data nama pemilik rekening, nama bank (BCA, Mandiri, BNI, BRI, dll.), dan nomor rekening Anda secara teliti. Perubahan bank akan melalui validasi keamanan demi mencegah pencurian akun."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0F191E] font-gilroy text-white">
      {/* Background Glow Elements */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#1C4763_0%,#111D29_80%,#0F191E_100%)]" />
      <div className="absolute top-[300px] left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary-blue/15 blur-[120px]" />
      <div className="absolute bottom-[400px] right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary-green/10 blur-[130px]" />

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/" className="transition hover:text-white">Beranda</Link>
          <IoChevronForwardSharp className="size-3.5" />
          <span className="font-semibold text-white">Panduan Penjual</span>
        </nav>

        {/* Hero Header */}
        <header className="mb-16 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-green/30 bg-primary-green/10 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-green">
            <IoBookOutline className="size-4" />
            Panduan & Pusat Edukasi
          </span>
          <h1 className="bg-gradient-to-r from-white via-[#92CDEE] to-[#9DDAB7] bg-clip-text mt-4 text-3xl font-extrabold leading-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
            Panduan Lengkap Penjual
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Pelajari langkah demi langkah mendaftarkan toko digital Anda, mengunggah karya kreatif terbaik Anda, dan mengoptimalkan penghasilan pasif di ekosistem Selvo.
          </p>
        </header>

        {/* Two Column Content Area */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          
          {/* Sidebar Menu (Sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-2 rounded-2xl border border-white/10 bg-[#121E24]/60 p-5 backdrop-blur-md">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400">Navigasi Panduan</p>
              
              <nav className="mt-4 flex flex-col space-y-1">
                {[
                  { id: "mulai-menjual", label: "Mulai Menjual", icon: <IoCreateOutline className="size-4" /> },
                  { id: "langkah-upload", label: "Langkah Upload", icon: <IoCloudUploadOutline className="size-4" /> },
                  { id: "penarikan-dana", label: "Keuangan & Saldo", icon: <IoWalletOutline className="size-4" /> },
                  { id: "kebijakan-platform", label: "Kebijakan & Komisi", icon: <IoShieldCheckmarkOutline className="size-4" /> },
                  { id: "faq", label: "Tanya Jawab (FAQ)", icon: <IoHelpCircleOutline className="size-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${
                      activeSection === item.id 
                        ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/20" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <hr className="my-4 border-white/5" />
              <Link 
                href="/auth"
                className="bg-primary-blue hover:bg-secondary-blue flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition active:scale-95"
              >
                Mulai Daftar Sekarang
              </Link>
            </div>
          </aside>

          {/* Detailed Content Sections */}
          <div className="space-y-16">
            
            {/* Section 1: Mulai Menjual */}
            <section id="mulai-menjual" className="scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary-blue/15 text-primary-blue grid size-12 place-items-center rounded-xl">
                  <IoCreateOutline className="size-6" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">Cara Memulai Toko Anda</h2>
              </div>
              
              <div className="border-white/10 bg-[#121E24]/30 rounded-2xl border p-6 sm:p-8 backdrop-blur-xs">
                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                  Selvo menyediakan proses pendaftaran seller yang mudah dan instan. Dalam waktu kurang dari 5 menit, Anda sudah bisa mulai mendirikan toko digital pribadi Anda:
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="border-white/5 bg-[#0D171C]/50 rounded-xl border p-5 text-left">
                    <span className="bg-primary-blue/20 text-primary-blue inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold">1</span>
                    <h3 className="mt-4 font-bold text-white">Buat Akun Seller</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">
                      Daftarkan email Anda melalui tombol <Link href="/auth" className="text-primary-blue hover:underline">Yuk Mulai Menjual</Link> di header dan selesaikan autentikasi akun.
                    </p>
                  </div>

                  <div className="border-white/5 bg-[#0D171C]/50 rounded-xl border p-5 text-left">
                    <span className="bg-[#76D672]/20 text-[#76D672] inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold">2</span>
                    <h3 className="mt-4 font-bold text-white">Lengkapi Informasi Bank</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">
                      Masuk ke menu Dashboard seller dan tambahkan nomor rekening bank Anda. Ini digunakan untuk mengirimkan hasil pencairan dana penjualan Anda.
                    </p>
                  </div>

                  <div className="border-white/5 bg-[#0D171C]/50 rounded-xl border p-5 text-left">
                    <span className="bg-[#CE82FF]/20 text-[#CE82FF] inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold">3</span>
                    <h3 className="mt-4 font-bold text-white">Unggah Aset Digital</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">
                      Anda siap mendirikan produk digital pertama Anda! Cukup klik &apos;Tambah Produk&apos; di dalam dashboard seller Anda untuk mengunggah.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Langkah Upload */}
            <section id="langkah-upload" className="scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-[#76D672]/15 text-[#76D672] grid size-12 place-items-center rounded-xl">
                  <IoCloudUploadOutline className="size-6" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">Panduan Alur Upload Produk</h2>
              </div>
              
              <div className="border-white/10 bg-[#121E24]/30 rounded-2xl border p-6 sm:p-8 backdrop-blur-xs">
                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                  Ketika mengunggah produk baru, Anda akan dipandu oleh form interaktif multi-step di dashboard seller. Berikut adalah penjelasan untuk setiap langkah pengisian:
                </p>

                <div className="mt-8 space-y-6">
                  {uploadSteps.map((item) => (
                    <div key={item.step} className="border-white/5 bg-[#0D171C]/60 hover:border-white/15 flex flex-col gap-4 rounded-xl border p-5 transition md:flex-row md:items-start md:gap-5">
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-tertier-netral text-2xl font-extrabold">{item.step}</span>
                        <div className="bg-white/5 grid size-12 place-items-center rounded-xl md:size-14">
                          {item.icon}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-gray-400 sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 3: Keuangan & Saldo */}
            <section id="penarikan-dana" className="scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-[#CE82FF]/15 text-[#CE82FF] grid size-12 place-items-center rounded-xl">
                  <IoWalletOutline className="size-6" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">Keuangan & Sistem Penarikan Dana</h2>
              </div>
              
              <div className="border-white/10 bg-[#121E24]/30 rounded-2xl border p-6 sm:p-8 backdrop-blur-xs">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Bagaimana Pendapatan Akun Dihitung?</h3>
                    <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                      Setiap ada pembeli yang melakukan checkout transaksi atas produk Anda (hanya tersedia via QRIS), nominal bersih setelah dikurangi biaya admin platform (3%) akan diakumulasikan ke saldo akun Anda. Anda bisa memantau pergerakan grafik penjualan harian secara real-time di sub-menu **Statistik Penjualan** dashboard Anda.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Ketentuan Withdrawal (WD)</h3>
                    <ul className="text-xs space-y-2 text-gray-400 sm:text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        <span>**Batas Minimum Penarikan**: Penarikan saldo dapat dilakukan minimal sebesar **IDR 50.000**.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        <span>**Rekening Bank Terdaftar**: Pastikan nama pemilik rekening bank persis sama dengan nama pemilik akun seller untuk verifikasi transaksi.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        <span>**Lama Proses**: Transfer ke rekening Anda diselesaikan dalam kurun waktu **1-2 hari kerja** setelah divalidasi admin.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Kebijakan & Komisi */}
            <section id="kebijakan-platform" className="scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-[#FFA657]/15 text-[#FFA657] grid size-12 place-items-center rounded-xl">
                  <IoShieldCheckmarkOutline className="size-6" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">Kebijakan Platform & Komisi</h2>
              </div>
              
              <div className="border-white/10 bg-[#121E24]/30 rounded-2xl border p-6 sm:p-8 backdrop-blur-xs">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary-blue/20 text-primary-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      %
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Biaya Komisi Platform Terjangkau</h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                        Kami hanya mengenakan biaya admin sebesar **3%** dari harga produk digital Anda saat terjual. Pembeli melakukan pembayaran eksklusif via QRIS. Pendaftaran akun toko dan pengunggahan aset digital sepenuhnya tidak dipungut biaya apa pun (100% gratis).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-pink-500/20 text-pink-400 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      ⚠️
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Aset Digital yang Dilarang</h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                        Demi menjaga kredibilitas ekosistem Selvo, kami melarang pengunggahan aset yang melanggar hak cipta/plagiasi karya orang lain, file kosong/rusak, file yang mengandung virus/malware, script judi/ilegal, serta segala aset berbau SARA atau pornografi. Pelanggaran berat akan mengakibatkan penutupan akun permanen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-green-500/20 text-green-400 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Kepemilikan Hak Cipta Aset</h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                        Setiap kreator/desainer di Selvo tetap memegang penuh kepemilikan hak cipta atas karyanya. Pembeli hanya membayar untuk hak lisensi penggunaan (personal atau komersial sesuai deskripsi Anda). Selvo tidak mengambil hak intelektual karya kreatif Anda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: FAQ */}
            <section id="faq" className="scroll-mt-28">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-[#FF6B9A]/15 text-[#FF6B9A] grid size-12 place-items-center rounded-xl">
                  <IoHelpCircleOutline className="size-6" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">Pertanyaan yang Sering Diajukan</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isExpanded = expandedFAQ === index;
                  return (
                    <div 
                      key={index} 
                      className="border-white/10 bg-[#121E24]/30 hover:border-white/15 rounded-2xl border transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFAQ(isExpanded ? null : index)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-white sm:text-lg"
                      >
                        <span>{faq.question}</span>
                        <IoChevronDownSharp 
                          className={`size-5 text-gray-400 transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-primary-blue" : ""
                          }`} 
                        />
                      </button>
                      
                      {isExpanded && (
                        <div className="border-t border-white/5 px-6 pt-4 pb-6">
                          <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
