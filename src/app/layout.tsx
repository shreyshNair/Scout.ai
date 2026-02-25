import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Providers } from "@/components/layout/Providers";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scout.ai - Precision Intelligence Interface",
  description: "A thesis-driven company discovery and enrichment platform for VC analysts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-300`}>
        <Providers>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
            <Toaster position="bottom-right" richColors />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
