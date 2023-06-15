import { Footer, Navbar } from "@/components";
import ClientOnly from "@/components/ClientOnly";

import RegisterModal from "@/components/modals/registerModal";
import "./globals.css";

export const metadata = {
  title: "Car Show",
  description: "Book My Car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>

        {children}
        <Footer />
      </body>
    </html>
  );
}
