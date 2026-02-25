import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scout.ai — VC Intelligence Platform",
  description: "A thesis-driven company discovery and enrichment platform for VC analysts. Find, evaluate, and track the most promising startups with AI-powered insights.",
  keywords: ["venture capital", "startup discovery", "VC analytics", "deal flow", "portfolio management"],
  openGraph: {
    title: "Scout.ai — VC Intelligence Platform",
    description: "Discover and track the most promising startups with AI-powered signals and enrichment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
