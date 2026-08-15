import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logoPath = `${basePath}/images/riyadh-city-logo.webp`;

export const metadata: Metadata = {
  metadataBase: new URL("https://riyadhcityhotel.com"),
  title: "الرياض سيتي | للشقق الفندقية",
  description:
    "الرياض سيتي للشقق الفندقية في الغيضة — إقامة عصرية تجمع الراحة والخصوصية والتصميم العملي.",
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
