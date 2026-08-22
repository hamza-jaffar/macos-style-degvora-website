import type { Metadata } from "next";
import "./globals.css";
import AdSenseScript from "@/components/ads/AdSenseScript";

export const metadata: Metadata = {
  title: {
    default: "Degvora | Operating System Portfolio",
    template: "%s | Degvora",
  },
  description: "Explore the interactive software portfolio of Degvora. Discover our projects, applications, and operating system simulation.",
  keywords: ["Degvora", "Portfolio", "OS", "Operating System", "Software", "Web Application"],
  authors: [{ name: "Degvora" }],
  openGraph: {
    title: "Degvora | Operating System Portfolio",
    description: "Explore the interactive software portfolio of Degvora.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-white h-full antialiased" suppressHydrationWarning>
      <head>
        <AdSenseScript />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
