import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main className="container-site flex min-h-screen flex-col items-start justify-center gap-6">
      <p className="eyebrow">404 / Lost in the ocean</p>
      <h1 className="page-title">Trang này chưa có ở đây.</h1>
      <p className="text-sm text-muted-foreground">
        Có thể đường dẫn đã thay đổi. Cùng quay lại nơi bắt đầu.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft data-icon="inline-start" />
          Về trang chủ
        </Link>
      </Button>
    </main>
  );
}
