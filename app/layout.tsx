import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vasıtan.com",
  description: "AI destekli vasıta alım satım platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}