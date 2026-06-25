import PanduanClient from "./panduan-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Lengkap Penjual - Pusat Edukasi Kreator",
  description:
    "Pelajari langkah demi langkah mendirikan toko digital pribadi Anda, mengunggah karya kreatif terbaik (template, 3D, font, ilustrasi), kebijakan komisi flat 3%, dan sistem penarikan dana di Selvo.",
  alternates: {
    canonical: "https://selvo.web.id/panduan-penjual",
  },
  openGraph: {
    title: "Panduan Lengkap Penjual - Pusat Edukasi Kreator | Selvo",
    description:
      "Pelajari langkah demi langkah mendirikan toko digital pribadi Anda, mengunggah karya kreatif terbaik (template, 3D, font, ilustrasi), kebijakan komisi flat 3%, dan sistem penarikan dana di Selvo.",
    url: "https://selvo.web.id/panduan-penjual",
  },
};

export default function PanduanPenjualPage() {
  return <PanduanClient />;
}
