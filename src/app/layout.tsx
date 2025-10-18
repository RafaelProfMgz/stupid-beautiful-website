import { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ExitIntentPopup from "@/src/components/ui/exit-intent-popup";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://stupid-beautiful-website.vercel.app/"),
  title: {
    default: "Stupid Beautiful Website",
    template: `%s | Stupid Beautiful Website`,
  },
  description: "Um lindo e estúpido website feito com Next.js",
  generator: "Next.js",
  applicationName: "Stupid Beautiful Website",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript", "Stupid", "Beautiful"],
  authors: [
    {
      name: "Angel Rafael Souza Da Silva",
      url: "https://stupid-beautiful-website.vercel.app/",
    },
  ],
  creator: "Angel Rafael Souza Da Silva",
  publisher: "Angel Rafael Souza Da Silva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Stupid Beautiful Website",
    description: "Um lindo e estúpido website feito com Next.js",
    url: "https://stupid-beautiful-website.vercel.app/",
    siteName: "Stupid Beautiful Website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imagem de destaque do Stupid Beautiful Website",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stupid Beautiful Website",
    description: "Um lindo e estúpido website feito com Next.js",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      // {
      //   rel: "icon",
      //   type: "image/png",
      //   sizes: "192x192",
      //   url: "/android-chrome-192x192.png",
      // },
      // {
      //   rel: "icon",
      //   type: "image/png",
      //   sizes: "512x512",
      //   url: "/android-chrome-512x512.png",
      // },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body className={`font-sans antialiased`}>
        {children}
        <ExitIntentPopup />
        <Analytics />
      </body>
    </html>
  );
}
