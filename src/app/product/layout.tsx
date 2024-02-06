import type { Metadata } from "next";


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
  <div className="bg-slate-50 p-5">
    {children}
  </div>
  );
}
