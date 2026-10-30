"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container-site flex min-h-[65vh] flex-col items-start justify-center gap-6">
      <p className="eyebrow">Một nhịp nghỉ ngắn</p>
      <h1 className="page-title">Chưa thể tải nội dung.</h1>
      <p className="text-sm text-muted-foreground">
        Vui lòng thử lại. Các nội dung đã lưu trên trình duyệt vẫn được giữ nguyên.
      </p>
      <Button onClick={reset}>Thử lại</Button>
    </div>
  );
}
