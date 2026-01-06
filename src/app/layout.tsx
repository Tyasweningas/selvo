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

export const metadata = {
  title: "Selvo - Marketplace Digital Produk Kreatif",
  description:
    "Selvo adalah marketplace digital untuk produk kreatif seperti template, aset desain, dan lainnya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} antialiased`}>
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
      </body>
    </html>
  );
}
