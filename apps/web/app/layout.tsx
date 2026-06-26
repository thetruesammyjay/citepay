import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CitePay | AI Answers That Pay Their Sources",
  description: "A citation economy for AI agents, creators, publishers, Circle Wallets, USDC, Arc, and x402."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
