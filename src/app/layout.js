import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata = {
  title: "VSync — a minimalistic way to browse VTOP",
  description:
    "A minimalistic, lightweight, unopinionated, open-source academic companion for VIT-AP students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={epilogue.variable}>
      <body>{children}</body>
    </html>
  );
}
