import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "spare hive",
  description: "showing a simple profile page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
