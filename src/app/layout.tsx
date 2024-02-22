import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarTop from "./components/navbar/NavbarTop";
import NavbarSub from "./components/navbar/NavbarSub";
import Footer from "./components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    default:"02 Footwear",
    template:"%s | 02 Footwear"
  },
  description: "online footwear shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col justify-between">
          <div>
        <nav className="md:sticky relative z-20 top-0 inset-x-0 bg-white">
          <NavbarTop/>
          <NavbarSub/>
        </nav>
        <main className="min-h-screen z-0">
        {children}
        </main>
        </div>
        <footer>
          <Footer/>
        </footer>
        </div>
        </body>
    </html>
  );
}
