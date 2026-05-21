import { Anybody, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Heading font (great for sports/football websites)
const headingFont = Anybody({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

// Button or label font (clean and highly readable)
const labelFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["400", "500", "600", "700", "800"],
});

// Body font (clean and highly readable)
const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Odyssey FC",
  description: "Official website of Odyssey FC",
  keywords: [
    "Odyssey FC",
    "Football Club",
    "Soccer",
    "Football",
    "Bangladesh Football",
    "Youth Football",
  ],
  icons: {
    icon: "/logoBG.jpeg",
    shortcut: "/logoBG.jpeg",
    apple: "/logoBG.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` dark${headingFont.variable} ${labelFont.variable} ${bodyFont.variable} min-h-full`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
