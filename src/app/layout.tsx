import { Metadata } from "next";
import AuthSessionProvider from "@/components/global/session-provider";
import { ToastHandler } from "@/components/global/toast-handler";
import "assets/css/globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const gilroy = localFont({
  src: [
    {
      path: "../assets/gilroy-bold/Gilroy-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/gilroy-bold/Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/gilroy-bold/Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/gilroy-bold/Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/gilroy-bold/Gilroy-Heavy.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://selvo.web.id"),
  title: {
    default: "Selvo - Marketplace Digital Produk Kreatif",
    template: "%s | Selvo",
  },
  description:
    "Selvo adalah marketplace digital untuk produk kreatif seperti template UI/UX, font, ilustrasi, aset 3D, dan audio untuk mempercepat workflow proyekmu.",
  keywords: [
    "marketplace digital",
    "produk kreatif",
    "template UI/UX",
    "download font",
    "ilustrasi gratis",
    "aset 3D",
    "efek suara",
    "selvo",
    "selvo marketplace",
    "jual aset digital",
    "desain grafis",
    "pengembangan web",
  ],
  authors: [{ name: "Selvo Team" }],
  creator: "Selvo",
  publisher: "Selvo",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://selvo.web.id",
    siteName: "Selvo",
    title: "Selvo - Marketplace Digital Produk Kreatif",
    description:
      "Temukan ribuan template UI/UX, font, ilustrasi, dan aset 3D terbaik untuk mempercepat workflow proyek Anda di Selvo.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Selvo - Marketplace Digital Produk Kreatif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selvo - Marketplace Digital Produk Kreatif",
    description:
      "Temukan ribuan template UI/UX, font, ilustrasi, dan aset 3D terbaik untuk mempercepat workflow proyek Anda di Selvo.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} antialiased`}>
        <AuthSessionProvider>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                background: "#1a2b32",
                border: "1px solid #29373d",
                color: "#D9D9D9",
              },
              classNames: {
                success: "toast-success",
                error: "toast-error",
                warning: "toast-warning",
                info: "toast-info",
              },
            }}
          />
          <ToastHandler />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
