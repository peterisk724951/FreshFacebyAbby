import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-headline",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fresh Face by Abby | Custom Skin Sanctuary",
  description:
    "Custom facial treatments tailored to your skin's unique needs in Cypress, TX. Book your appointment with Abby today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} antialiased`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
