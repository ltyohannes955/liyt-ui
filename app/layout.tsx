import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { ConditionalLayout } from "./components/ConditionalLayout";

export const metadata: Metadata = {
  title: "LIYT - The Future of Delivery",
  description: "Payy is a stablecoin-native banking platform with unrivaled privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0a]">
        <StoreProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
