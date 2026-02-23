import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Pinyon_Script,
  Noto_Nastaliq_Urdu,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});
const _pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-nastaliq",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kainy-wedding-invite.vercel.app/"),
  title: "Orhan & Kainy - Wedding Invitation",
  description:
    "You are cordially invited to the wedding of Orhan & Kainy - Sunday, May 10th in Istanbul",
  generator: "v0.app",
  openGraph: {
    title: "Orhan & Kainy - Wedding Invitation",
    description:
      "You are cordially invited to the wedding of Orhan & Kainy - Sunday, May 10th in Istanbul",
    url: "https://kainy-wedding-invite.vercel.app/",
    siteName: "Orhan & Kainy Wedding",
    images: [
      {
        url: "/seoimg.jpeg",
        width: 1200,
        height: 630,
        alt: "Orhan & Kainy Wedding Invitation Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orhan & Kainy - Wedding Invitation",
    description:
      "You are cordially invited to the wedding of Orhan & Kainy - Sunday, May 10th in Istanbul",
    images: ["/seoimg.jpeg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${notoNastaliq.variable} ${_pinyonScript.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
