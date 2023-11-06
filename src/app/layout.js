import localFont from "next/font/local";

import "../styles/globals.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/Satoshi-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const BASE_URL = "https://category-manager.vercel.app/";
export const TITLE = "Catagory Manager";
export const DESCRIPTION = "Category Manager App";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: TITLE,
    locale: "uk",
    type: "website",
  },
  metadataBase: new URL(BASE_URL),
  robots: "all",
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={satoshi.variable}>{children}</body>
    </html>
  );
}
