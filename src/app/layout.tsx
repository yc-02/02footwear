import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarMd from "./ components/NavbarMd";
import NavbarSmall from "./ components/NavbarSmall";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "02 Footwear",
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
        <nav>
          <NavbarMd/>
          <NavbarSmall/>
        </nav>
        {children}
        </body>
    </html>
  );
}
