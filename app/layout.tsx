import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Tech PM Portfolio", template: "%s | Tech PM Portfolio" },
  description: "Technical Project Manager — AI, Data & Systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className="dark"><body>{children}<Toaster richColors theme="dark" /></body></html>;
}
