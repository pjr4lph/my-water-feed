import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "my water is finite",
  description: "seven water resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="bg-black">{children}</body>
    </html>
  );
}
