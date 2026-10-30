"use client";
import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Eye, EyeOff, FilePenLine, Trash2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { SelectControl } from "@/components/forms/controls";
import { AdminHeading } from "@/components/admin/shell";
import { NoResults } from "@/components/site/blocks";
export function ContentList({ type }: { type: "projects" | "articles" }) {
  const { content, update } = useContent();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tất cả trạng thái");
  const [deleting, setDeleting] = useState<string | null>(null);
  const rows = content[type].filter(
    (x) =>
      x.title.toLowerCase().includes(search.toLowerCase()) &&
      (status === "Tất cả trạng thái" || (status === "Đã xuất bản" ? x.published : !x.published)),
  );
  const project = type === "projects";
  function toggle(id: string) {
    if (
      update((c) => ({
        ...c,
        [type]: c[type].map((x) => (x.id === id ? { ...x, published: !x.published } : x)),
      }))
    )
      toast.success("Đã đổi trạng thái trong bản xem thử.");
  }
  function remove() {
    if (update((c) => ({ ...c, [type]: c[type].filter((x) => x.id !== deleting) }))) {
      setDeleting(null);
      toast.success("Đã xóa nội dung khỏi bản xem thử.");
    }
  }
  return (
    <>
      <AdminHeading
        title={project ? "Quản lý dự án" : "Quản lý bài viết"}
        description={
          project
            ? "Từ ý tưởng đến case study. Giữ mọi đóng góp được kể đúng cách."
            : "Những điều đáng chia sẻ, được sắp xếp ở một nơi."
        }
        action={
          <Button asChild>
            <Link href={`/admin/${type}/new`}>
              <Plus data-icon="inline-start" />
              {project ? "Thêm dự án" : "Viết bài mới"}
            </Link>
          </Button>
        }
      />
      <div className="surface mb-7 grid items-end gap-5 p-5 sm:grid-cols-[1fr_240px]">
        <Field>
          <FieldLabel htmlFor="content-search">Tìm {project ? "dự án" : "bài viết"}</FieldLabel>
          <div className="relative">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              id="content-search"
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tiêu đề…"
            />
          </div>
        </Field>
        <SelectControl
          id="status-filter"
          label="Trạng thái"
          value={status}
          onChange={setStatus}
          options={["Tất cả trạng thái", "Đã xuất bản", "Bản nháp"]}
        />
      </div>
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <p aria-live="polite">{rows.length} nội dung</p>
        <span>Dữ liệu xem thử</span>
      </div>
      {rows.length ? (
        <div className="surface overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề / Slug</TableHead>
                <TableHead>{project ? "Lĩnh vực" : "Chuyên mục"}</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="min-w-[230px]">
                    <Link
                      href={`/admin/${type}/${row.id}`}
                      className="text-xs font-semibold hover:text-brand-ink"
                    >
                      {row.title}
                    </Link>
                    <p className="mt-2 font-mono text-[9px] text-muted-foreground">/{row.slug}</p>
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground">
                    {"domain" in row ? row.domain : row.category}
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.published ? "secondary" : "outline"}>
                      {row.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild variant="ghost" size="icon-sm">
                        <Link href={`/admin/${type}/${row.id}`} aria-label={`Sửa ${row.title}`}>
                          <FilePenLine />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => toggle(row.id)}
                        aria-label={`${row.published ? "Ẩn" : "Xuất bản"} ${row.title}`}
                      >
                        {row.published ? <EyeOff /> : <Eye />}
                      </Button>
                      {row.published && (
                        <Button asChild variant="ghost" size="icon-sm">
                          <Link href={`/${type}/${row.slug}`} aria-label={`Xem ${row.title}`}>
                            <ArrowUpRight />
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Xóa ${row.title}`}
                        onClick={() => setDeleting(row.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <NoResults
          onReset={() => {
            setSearch("");
            setStatus("Tất cả trạng thái");
          }}
        />
      )}
      <Dialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa nội dung này?</DialogTitle>
            <DialogDescription>
              Nội dung sẽ được xóa khỏi dữ liệu xem thử trên trình duyệt. Bạn có thể khôi phục toàn
              bộ nội dung mẫu trong Hồ sơ & CV.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Giữ lại
            </Button>
            <Button variant="destructive" onClick={remove}>
              Xóa nội dung
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
