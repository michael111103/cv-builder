import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "Bara Karbon Energi | Coconut Charcoal Exporter",
  description:
    "PT Bara Karbon Energi exports premium shisha and BBQ coconut shell charcoal briquettes from Central Java, Indonesia. FOB Semarang.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
