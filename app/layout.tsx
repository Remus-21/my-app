import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Full-stack Next.js application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans p-4 max-w-5xl mx-auto`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

