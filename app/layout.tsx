import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agents Main - Multi-Agent AI Orchestration",
  description: "Claude Code Plugin Marketplace & Queen-Hive Orchestration System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
