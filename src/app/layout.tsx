import type { Metadata } from "next";
import { Poppins, Roboto, Outfit } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Rajeswar Charapalli | Portfolio",
  description: "Portfolio of Rajeswar Charapalli, a CSE Student, Web Developer and SIH Winner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${roboto.variable} ${outfit.variable} antialiased bg-[var(--primary-bg)] text-[var(--primary-text)] overflow-x-hidden`}>
        <div className="grain-overlay fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]"></div>
        {children}
      </body>
    </html>
  );
}
