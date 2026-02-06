import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { websiteJsonLd } from "@/lib/json-ld";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "True Hourly Wage Calculator for Gig Drivers | Uber, Lyft, DoorDash",
    template: "%s | GigWageCalc",
  },
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
    url: "https://gigwagecalc.com",
    siteName: "GigWageCalc",
    title: "True Hourly Wage Calculator for Gig Drivers",
    description:
      "Most gig drivers overestimate their earnings by 40%. See your REAL hourly profit after all expenses.",
    images: [
      {
        url: "https://gigwagecalc.com/og-image.png",
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
    images: ["https://gigwagecalc.com/og-image.png"],
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
  alternates: {
    types: {
      "application/rss+xml": "https://gigwagecalc.com/feed.xml",
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
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${bricolageGrotesque.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="GigWageCalc Blog"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
