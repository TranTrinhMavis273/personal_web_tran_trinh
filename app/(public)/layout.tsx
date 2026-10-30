import { Header, Footer } from "@/components/site/chrome";
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
