import { Outfit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Plant a Tree - Make an Impact",
  description: "$10 plants one tree. Join our mission to reforest the earth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-slate-50`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
