import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Tran Trinh — Technical Project Manager", template: "%s | Tran Trinh" },
  description:
    "Tư duy kỹ thuật, quản trị dự án và giá trị thực tế. Portfolio về AI, Data & Systems của Tran Trinh.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
