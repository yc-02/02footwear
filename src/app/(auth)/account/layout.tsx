import type { Metadata } from "next";
import AccountNav from "../../components/navbar/AccountNav";


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
    <AccountNav/>
    </div>
    <div className="col-span-2">
    {children}
    </div>
  </div>
  );
}
