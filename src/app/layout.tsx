import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtNex - BID Report",
  description: "Brand Identity Development Report System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-noto-regular antialiased bg-neutral-50">
        {children}
      </body>
    </html>
  );
}
