import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "True Hourly Wage Calculator for Gig Drivers | Uber, Lyft, DoorDash",
  description:
    "Calculate your REAL hourly profit as a gig economy driver. See what you actually earn after gas, vehicle depreciation, and self-employment taxes. Free tool for Uber, Lyft, and DoorDash drivers.",
  keywords: [
    "gig economy calculator",
    "uber hourly wage",
    "lyft earnings calculator",
    "doordash profit calculator",
    "true hourly wage",
    "rideshare expenses",
    "gig driver taxes",
    "IRS mileage deduction",
  ],
  authors: [{ name: "Gig Wage Calculator" }],
  creator: "Gig Wage Calculator",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://YOUR_DOMAIN.com",
    siteName: "True Hourly Wage Calculator",
    title: "True Hourly Wage Calculator for Gig Drivers",
    description:
      "Most gig drivers overestimate their earnings by 40%. See your REAL hourly profit after all expenses.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "True Hourly Wage Calculator - See what you really earn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Hourly Wage Calculator for Gig Drivers",
    description:
      "Most gig drivers overestimate their earnings by 40%. See your REAL hourly profit after all expenses.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
