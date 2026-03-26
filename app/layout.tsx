import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tacoma Eats - Restaurant & Food Dashboard",
  description: "Your comprehensive guide to dining in Tacoma/Pierce County. Find restaurants, happy hours, deals, and more!",
  keywords: "Tacoma restaurants, Pierce County food, happy hour, restaurant deals, Tacoma dining",
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
