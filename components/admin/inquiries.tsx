"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Mail, Archive, CheckCheck, ArrowLeft, Inbox } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/components/providers";
import { type Inquiry } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { AdminHeading } from "@/components/admin/shell";
import { NoResults } from "@/components/site/blocks";
import { cn } from "@/lib/utils";
export function Inquiries() {
  const { content, update } = useContent();
  const params = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(params.get("selected"));
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const filtered = content.inquiries.filter(
    (i) =>
      (status === "all" || i.status === status) &&
      `${i.name} ${i.email} ${i.company} ${i.message}`.toLowerCase().includes(search.toLowerCase()),
  );
  const selected = filtered.find((i) => i.id === selectedId);
  function change(value: Inquiry["status"]) {
    if (
      update((c) => ({
        ...c,
        inquiries: c.inquiries.map((i) => (i.id === selectedId ? { ...i, status: value } : i)),
      }))
    )
      toast.success("Đã cập nhật trạng thái nội bộ.");
  }
  return (
    <>
      <AdminHeading
        title="Những kết nối có ý nghĩa."
        description="Đọc lời nhắn, theo dõi tiến độ và không bỏ lỡ một cơ hội."
      />
      <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-full overflow-x-auto pb-1">
          <ToggleGroup
            type="single"
            value={status}
            onValueChange={(v) => {
              if (v) {
                setStatus(v);
                setSelectedId(null);
              }
            }}
            variant="outline"
            spacing={2}
            aria-label="Lọc trạng thái liên hệ"
          >
            {[
              ["all", "Tất cả"],
              ["new", "New"],
              ["contacted", "Contacted"],
              ["archived", "Archived"],
            ].map(([v, label]) => (
              <ToggleGroupItem key={v} value={v}>
                {label}
                <span className="ml-1 text-[10px] opacity-60">
                  {content.inquiries.filter((i) => v === "all" || i.status === v).length}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <Field className="xl:max-w-72">
          <FieldLabel className="sr-only" htmlFor="inquiry-search">
            Tìm lời nhắn
          </FieldLabel>
          <div className="relative">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              id="inquiry-search"
              placeholder="Tìm tên, email, nội dung…"
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Field>
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className={cn("flex flex-col gap-3", selected && "hidden xl:flex")}>
          {filtered.length ? (
            filtered.map((i) => (
              <button
                key={i.id}
                onClick={() => setSelectedId(i.id)}
                className={cn(
                  "surface p-6 text-left hover-lift",
                  selectedId === i.id && "border-brand-ink",
                )}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{i.name}</span>
                  <Badge variant={i.status === "new" ? "secondary" : "outline"}>{i.status}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {i.company} · {i.date}
                </p>
                <p className="mt-4 text-xs font-medium">{i.purpose}</p>
                <p className="mt-3 line-clamp-2 text-xs leading-6 text-muted-foreground">
                  {i.message}
                </p>
                {i.demo && (
                  <span className="mt-3 inline-block font-mono text-[8px] tracking-widest text-muted-foreground uppercase">
                    Lời nhắn minh họa
                  </span>
                )}
              </button>
            ))
          ) : (
            <NoResults
              title="Chưa có lời nhắn phù hợp"
              description="Thử bỏ bộ lọc hoặc tìm bằng từ khóa khác."
              onReset={() => {
                setSearch("");
                setStatus("all");
              }}
            />
          )}
        </div>
        <div className="surface min-h-[520px] min-w-0">
          {selected ? (
            <div className="p-6 sm:p-8">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 xl:hidden"
                onClick={() => setSelectedId(null)}
              >
                <ArrowLeft data-icon="inline-start" />
                Về danh sách
              </Button>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="icon-box mb-6">
                    <Mail />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight">{selected.name}</h2>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {selected.company || "Không cung cấp tổ chức"}
                  </p>
                </div>
                <Badge variant="secondary">{selected.status}</Badge>
              </div>
              <Separator className="my-7" />
              <dl className="grid gap-5 text-xs sm:grid-cols-2">
                <div>
                  <dt className="mb-2 font-mono text-[9px] text-muted-foreground uppercase">
                    Email
                  </dt>
                  <dd className="break-all">{selected.email}</dd>
                </div>
                <div>
                  <dt className="mb-2 font-mono text-[9px] text-muted-foreground uppercase">
                    Ngày nhận
                  </dt>
                  <dd>{selected.date}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="mb-2 font-mono text-[9px] text-muted-foreground uppercase">
                    Mục đích
                  </dt>
                  <dd>{selected.purpose}</dd>
                </div>
              </dl>
              <div className="my-8 whitespace-pre-wrap rounded-xl border border-border bg-subtle p-6 text-sm leading-8">
                {selected.message}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => change("contacted")}
                  disabled={selected.status === "contacted"}
                >
                  <CheckCheck data-icon="inline-start" />
                  Đánh dấu Contacted
                </Button>
                <Button
                  variant="outline"
                  onClick={() => change(selected.status === "archived" ? "new" : "archived")}
                >
                  <Archive data-icon="inline-start" />
                  {selected.status === "archived" ? "Chuyển về New" : "Lưu trữ"}
                </Button>
              </div>
              <p className="mt-5 text-[10px] leading-6 text-muted-foreground">
                Thay đổi trạng thái chỉ dùng để theo dõi nội bộ, không tự gửi email trả lời.
              </p>
            </div>
          ) : (
            <div className="flex min-h-[520px] flex-col items-center justify-center gap-5 p-8 text-center">
              <span className="icon-box">
                <Inbox />
              </span>
              <h2 className="text-lg font-semibold">Mỗi kết nối bắt đầu từ một lời nhắn.</h2>
              <p className="max-w-sm text-xs leading-6 text-muted-foreground">
                Chọn lời nhắn bên cạnh để đọc nội dung và cập nhật trạng thái.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
