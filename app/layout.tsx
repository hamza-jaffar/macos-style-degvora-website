import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Degvora | Operating System Portfolio",
  description: "Explore the interactive software portfolio of Degvora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-white h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
