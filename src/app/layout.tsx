import localFont from "next/font/local";
import 'assets/css/globals.css'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
