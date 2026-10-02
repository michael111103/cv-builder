import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "Java Charcoal | Coconut Charcoal Exporter",
  description:
    "Java Charcoal exports premium shisha and BBQ coconut shell charcoal briquettes from Central Java, Indonesia. FOB Semarang.",
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
