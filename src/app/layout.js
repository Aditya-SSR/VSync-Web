import { Outfit, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./smooth-scroll";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// the "tohue" font — Test Sohne, exposed as --font-sohne (mapped to `font-tohue` in globals.css)
const sohne = localFont({
  src: "./fonts/testsohne-normal.woff2",
  weight: "400",
  variable: "--font-sohne",
  display: "swap",
});

export const metadata = {
  title: "VSync — Minimalistic way to browse VTOP",
  description: "Minimalistic way to browse VTOP",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${sohne.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
