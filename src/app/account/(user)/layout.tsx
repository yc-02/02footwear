import type { Metadata } from "next";
import NavbarAccount from "../../components/navbar/NavbarAccount";


export const metadata: Metadata = {
  title: "Account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
  <div className="flex flex-col justify-center items-center gap-10">
    <NavbarAccount/>
    {children}
  </div>
  );
}
