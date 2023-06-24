import { Navbar } from "@/components";
import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";

import RegisterModal from "@/components/modals/registerModal";
import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "Car Show",
  description: "Book My Car",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className="relative">
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
