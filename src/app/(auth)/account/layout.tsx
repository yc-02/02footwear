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
  <div className="md:grid grid-cols-3">
    <div className="col-span-1">
    <NavbarAccount/>
    </div>
    <div className="col-span-2 md:p-10">
    {children}
    </div>
  </div>
  );
}
