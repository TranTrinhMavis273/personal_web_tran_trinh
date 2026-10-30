"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { readFile } from "@/lib/files";
import { ArrowLeft, Save, Eye, Send, Plus, Trash2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/components/providers";
import {
  projectSchema,
  articleSchema,
  emptyProject,
  emptyArticle,
  domains,
  categories,
  competencies,
  type Project,
  type Article,
} from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { TextField, SelectControl } from "@/components/forms/controls";
import { AdminHeading } from "@/components/admin/shell";
import { CoverArt } from "@/components/site/visuals";
import { NoResults } from "@/components/site/blocks";
import { Markdown } from "@/components/site/articles";
const Mermaid = dynamic(() => import("@/components/site/mermaid"), {
  ssr: false,
  loading: () => <Skeleton className="h-48 w-full" />,
});
export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function EditorLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-16 w-72" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}
export function ProjectEditor({ id }: { id: string }) {
  const { content, ready, update } = useContent();
  const router = useRouter();
  const [draft, setDraft] = useState<Project | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [chart, setChart] = useState("");
  const [techText, setTechText] = useState("");
  useEffect(() => {
    if (ready) {
      const item =
        id === "new" ? emptyProject() : content.projects.find((p) => p.id === id) || null;
      setDraft(item);
      setTechText(item?.tech.join(", ") || "");
    }
  }, [id, ready, content.projects]);
  useEffect(() => {
    const timer = setTimeout(() => setChart(draft?.architecture || ""), 400);
    return () => clearTimeout(timer);
  }, [draft?.architecture]);
  if (!ready) return <EditorLoading />;
  if (!draft)
    return (
      <NoResults
        title="Không tìm thấy dự án"
        description="Quay lại danh sách để chọn dự án cần chỉnh sửa."
      />
    );
  const p = draft;
  function patch(value: Partial<Project>) {
    setDraft((current) => (current ? { ...current, ...value } : current));
  }
  function save(publish: boolean) {
    if (!draft) return;
    const parsed = projectSchema.safeParse({
      ...draft,
      tech: techText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      published: publish,
    });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      toast.error("Vui lòng kiểm tra các trường bắt buộc.");
      return;
    }
    if (content.projects.some((x) => x.id !== draft.id && x.slug === draft.slug)) {
      setErrors({ slug: "Slug này đã được sử dụng." });
      return;
    }
    if (
      update((c) => ({
        ...c,
        projects: [...c.projects.filter((x) => x.id !== draft.id), parsed.data],
      }))
    ) {
      setErrors({});
      toast.success(
        publish ? "Đã xuất bản trong bản xem thử." : "Đã lưu bản nháp trên trình duyệt.",
      );
      if (id === "new") router.replace(`/admin/projects/${draft.id}`);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 1024 * 1024) {
      toast.error("Chọn ảnh PNG, JPG hoặc WebP không quá 1 MB.");
      return;
    }
    try {
      patch({ cover: await readFile(file) });
    } catch {
      toast.error("Chưa thể đọc ảnh.");
    }
  }
  return (
    <>
      <Link
        href="/admin/projects"
        className="mb-7 inline-flex items-center gap-2 text-xs text-muted-foreground"
      >
        <ArrowLeft size={14} />
        Quản lý dự án
      </Link>
      <AdminHeading
        title={id === "new" ? "Thêm một câu chuyện mới." : "Biên tập Case Study"}
        description="Ghi lại bối cảnh, quyết định và giá trị. Mọi thay đổi được lưu trong bản xem thử."
      />
      <div className="mb-7 flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setPreview(true)}>
          <Eye data-icon="inline-start" />
          Xem trước
        </Button>
        <Button variant="outline" onClick={() => save(false)}>
          <Save data-icon="inline-start" />
          Lưu nháp
        </Button>
        <Button onClick={() => save(true)}>
          <Send data-icon="inline-start" />
          Xuất bản xem thử
        </Button>
        <Badge variant="outline">{p.published ? "Published" : "Draft"}</Badge>
      </div>
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save(false);
          }}
          className="min-w-0"
        >
          <div className="surface p-6 sm:p-7">
            <h2 className="mb-7 text-lg font-semibold">Thông tin dự án</h2>
            <FieldGroup>
              <TextField
                id="project-title"
                label="Tiêu đề dự án *"
                value={p.title}
                onChange={(e) => {
                  const title = e.target.value;
                  patch({
                    title,
                    ...(id === "new" && !slugTouched ? { slug: slugify(title) } : {}),
                  });
                }}
                error={errors.title}
              />
              <TextField
                id="project-slug"
                label="Slug *"
                value={p.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  patch({ slug: e.target.value });
                }}
                error={errors.slug}
              />
              <TextField
                id="project-tagline"
                label="Mô tả một dòng *"
                value={p.tagline}
                onChange={(e) => patch({ tagline: e.target.value })}
                error={errors.tagline}
              />
              <FieldGroup className="sm:flex-row">
                <TextField
                  id="project-role"
                  label="Vai trò PM *"
                  value={p.role}
                  onChange={(e) => patch({ role: e.target.value })}
                  error={errors.role}
                />
                <TextField
                  id="project-timeline"
                  label="Thời gian"
                  value={p.timeline}
                  onChange={(e) => patch({ timeline: e.target.value })}
                />
              </FieldGroup>
              <FieldGroup className="sm:flex-row">
                <SelectControl
                  id="project-domain"
                  label="Lĩnh vực *"
                  value={p.domain}
                  onChange={(v) => patch({ domain: v as Project["domain"] })}
                  options={domains}
                />
                <TextField
                  id="project-team"
                  label="Quy mô nhóm"
                  value={p.teamSize}
                  onChange={(e) => patch({ teamSize: e.target.value })}
                />
              </FieldGroup>
              <TextField
                id="project-method"
                label="Phương pháp"
                value={p.methodology}
                onChange={(e) => patch({ methodology: e.target.value })}
              />
              <TextField
                id="project-summary"
                label="Tóm tắt điều hành *"
                multiline
                rows={5}
                value={p.summary}
                onChange={(e) => patch({ summary: e.target.value })}
                error={errors.summary}
              />
              <TextField
                id="project-problem"
                label="Bối cảnh & bài toán"
                multiline
                rows={5}
                value={p.problem}
                onChange={(e) => patch({ problem: e.target.value })}
              />
            </FieldGroup>
          </div>
          <div className="surface mt-6 p-6 sm:p-7">
            <h2 className="mb-6 text-lg font-semibold">Kiến trúc hệ thống</h2>
            <FieldGroup>
              <TextField
                id="project-mermaid"
                label="Mã Mermaid"
                multiline
                rows={7}
                value={p.architecture}
                onChange={(e) => patch({ architecture: e.target.value })}
              />
              <Mermaid code={chart} />
            </FieldGroup>
          </div>
          <div className="surface mt-6 p-6 sm:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Chỉ số tác động</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  patch({ metrics: [...p.metrics, { label: "", value: "", source: "" }] })
                }
              >
                <Plus data-icon="inline-start" />
                Thêm chỉ số
              </Button>
            </div>
            <p className="mb-6 text-xs leading-6 text-muted-foreground">
              Chỉ thêm số liệu đã xác nhận và nguồn đo tương ứng.
            </p>
            <FieldGroup>
              {p.metrics.map((m, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <FieldGroup>
                    <FieldGroup className="sm:flex-row">
                      <TextField
                        id={`metric-label-${i}`}
                        label="Tên chỉ số"
                        value={m.label}
                        onChange={(e) =>
                          patch({
                            metrics: p.metrics.map((v, j) =>
                              j === i ? { ...v, label: e.target.value } : v,
                            ),
                          })
                        }
                      />
                      <TextField
                        id={`metric-value-${i}`}
                        label="Giá trị"
                        value={m.value}
                        onChange={(e) =>
                          patch({
                            metrics: p.metrics.map((v, j) =>
                              j === i ? { ...v, value: e.target.value } : v,
                            ),
                          })
                        }
                      />
                    </FieldGroup>
                    <TextField
                      id={`metric-source-${i}`}
                      label="Nguồn / Bằng chứng"
                      value={m.source}
                      onChange={(e) =>
                        patch({
                          metrics: p.metrics.map((v, j) =>
                            j === i ? { ...v, source: e.target.value } : v,
                          ),
                        })
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => patch({ metrics: p.metrics.filter((_, j) => j !== i) })}
                    >
                      <Trash2 data-icon="inline-start" />
                      Bỏ chỉ số
                    </Button>
                  </FieldGroup>
                </div>
              ))}
              {!p.metrics.length && (
                <p className="text-xs text-muted-foreground">
                  Chưa có chỉ số. Trang công khai sẽ hiển thị trạng thái chờ dữ liệu.
                </p>
              )}
            </FieldGroup>
          </div>
          <div className="surface mt-6 p-6 sm:p-7">
            <TextField
              id="project-lessons"
              label="Bài học & bước tiếp theo"
              multiline
              rows={5}
              value={p.lessons}
              onChange={(e) => patch({ lessons: e.target.value })}
            />
          </div>
        </form>
        <aside className="flex min-w-0 flex-col gap-6">
          <div className="surface p-6">
            <h2 className="mb-6 text-base font-semibold">Hiển thị & công nghệ</h2>
            <FieldGroup>
              <Field>
                <FieldLabel>Hiển thị trên trang chủ</FieldLabel>
                <ToggleGroup
                  type="single"
                  value={p.featured ? "yes" : "no"}
                  onValueChange={(v) => v && patch({ featured: v === "yes" })}
                  variant="outline"
                  spacing={2}
                  aria-label="Dự án nổi bật"
                >
                  <ToggleGroupItem value="yes">Nổi bật</ToggleGroupItem>
                  <ToggleGroupItem value="no">Thông thường</ToggleGroupItem>
                </ToggleGroup>
              </Field>
              <TextField
                id="project-tech"
                label="Tech stack (ngăn cách bằng dấu phẩy)"
                value={techText}
                onChange={(e) => setTechText(e.target.value)}
              />
              <Field>
                <FieldLabel>Năng lực PM</FieldLabel>
                <ToggleGroup
                  type="multiple"
                  value={p.competencies}
                  onValueChange={(v) => patch({ competencies: v })}
                  variant="outline"
                  spacing={2}
                  className="flex-wrap"
                  aria-label="Chọn năng lực PM"
                >
                  {competencies.map((c) => (
                    <ToggleGroupItem key={c} value={c}>
                      {c}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="cover-file">Ảnh bìa</FieldLabel>
                <Input
                  id="cover-file"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => void upload(e.target.files?.[0])}
                />
                <p className="text-[10px] leading-5 text-muted-foreground">
                  PNG/JPG/WebP ≤ 1 MB. Lưu trên trình duyệt trong chế độ xem thử.
                </p>
                {p.cover ? (
                  <>
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={p.cover}
                        alt="Ảnh bìa đã chọn"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => patch({ cover: "" })}>
                      Bỏ ảnh bìa
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-muted p-4 text-xs text-muted-foreground">
                    <ImagePlus size={17} />
                    Dùng minh họa hệ thống mặc định
                  </div>
                )}
              </Field>
            </FieldGroup>
          </div>
          <div className="surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold">RAID log</h2>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Thêm rủi ro"
                onClick={() =>
                  patch({ risks: [...p.risks, { risk: "", severity: "Medium", mitigation: "" }] })
                }
              >
                <Plus />
              </Button>
            </div>
            <FieldGroup>
              {p.risks.map((r, i) => (
                <div key={i} className="rounded-xl border p-4">
                  <FieldGroup>
                    <TextField
                      id={`risk-${i}`}
                      label="Rủi ro"
                      multiline
                      rows={3}
                      value={r.risk}
                      onChange={(e) =>
                        patch({
                          risks: p.risks.map((v, j) =>
                            j === i ? { ...v, risk: e.target.value } : v,
                          ),
                        })
                      }
                    />
                    <SelectControl
                      id={`severity-${i}`}
                      label="Mức độ"
                      value={r.severity}
                      options={["High", "Medium", "Low"]}
                      onChange={(v) =>
                        patch({
                          risks: p.risks.map((x, j) =>
                            j === i ? { ...x, severity: v as "High" | "Medium" | "Low" } : x,
                          ),
                        })
                      }
                    />
                    <TextField
                      id={`mitigation-${i}`}
                      label="Ứng phó"
                      multiline
                      rows={3}
                      value={r.mitigation}
                      onChange={(e) =>
                        patch({
                          risks: p.risks.map((v, j) =>
                            j === i ? { ...v, mitigation: e.target.value } : v,
                          ),
                        })
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => patch({ risks: p.risks.filter((_, j) => j !== i) })}
                    >
                      <Trash2 data-icon="inline-start" />
                      Bỏ rủi ro
                    </Button>
                  </FieldGroup>
                </div>
              ))}
            </FieldGroup>
          </div>
        </aside>
      </div>
      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{p.title || "Case study chưa có tiêu đề"}</DialogTitle>
            <DialogDescription>
              {p.tagline || "Bản xem trước nội dung đang biên tập."}
            </DialogDescription>
          </DialogHeader>
          <Badge variant="outline">Xem trước / chưa lưu</Badge>
          <CoverArt domain={p.domain} cover={p.cover} />
          <h3 className="text-xl font-semibold">Tóm tắt điều hành</h3>
          <p className="text-sm leading-8 text-muted-foreground">
            {p.summary || "Chưa có tóm tắt."}
          </p>
          <Mermaid code={chart} />
          <h3 className="text-xl font-semibold">Bài học</h3>
          <p className="text-sm leading-8 text-muted-foreground">
            {p.lessons || "Chưa có nội dung."}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function ArticleEditor({ id }: { id: string }) {
  const { content, ready, update } = useContent();
  const router = useRouter();
  const [draft, setDraft] = useState<Article | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slugTouched, setSlugTouched] = useState(false);
  useEffect(() => {
    if (ready)
      setDraft(id === "new" ? emptyArticle() : content.articles.find((a) => a.id === id) || null);
  }, [id, ready, content.articles]);
  if (!ready) return <EditorLoading />;
  if (!draft) return <NoResults title="Không tìm thấy bài viết" />;
  const a = draft;
  const patch = (v: Partial<Article>) => setDraft((x) => (x ? { ...x, ...v } : x));
  function save(published: boolean) {
    if (!draft) return;
    const parsed = articleSchema.safeParse({ ...draft, published });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      toast.error("Vui lòng hoàn thiện các trường bắt buộc.");
      return;
    }
    if (content.articles.some((x) => x.id !== draft.id && x.slug === draft.slug)) {
      setErrors({ slug: "Slug này đã được sử dụng." });
      return;
    }
    if (
      update((c) => ({
        ...c,
        articles: [...c.articles.filter((x) => x.id !== draft.id), parsed.data],
      }))
    ) {
      setErrors({});
      toast.success(
        published ? "Đã xuất bản bài viết trong bản xem thử." : "Đã lưu bản nháp trên trình duyệt.",
      );
      if (id === "new") router.replace(`/admin/articles/${draft.id}`);
    }
  }
  return (
    <>
      <Link
        href="/admin/articles"
        className="mb-7 inline-flex items-center gap-2 text-xs text-muted-foreground"
      >
        <ArrowLeft size={14} />
        Quản lý bài viết
      </Link>
      <AdminHeading
        title={id === "new" ? "Một góc nhìn mới." : "Biên tập bài viết"}
        description="Viết, đọc lại và chia sẻ điều có ý nghĩa."
        action={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => save(false)}>
              <Save data-icon="inline-start" />
              Lưu nháp
            </Button>
            <Button onClick={() => save(true)}>
              <Send data-icon="inline-start" />
              Xuất bản xem thử
            </Button>
          </div>
        }
      />
      <div className="surface mb-6 p-6 sm:p-7">
        <FieldGroup>
          <TextField
            id="article-title"
            label="Tiêu đề bài viết *"
            value={a.title}
            onChange={(e) =>
              patch({
                title: e.target.value,
                ...(id === "new" && !slugTouched ? { slug: slugify(e.target.value) } : {}),
              })
            }
            error={errors.title}
          />
          <FieldGroup className="sm:flex-row">
            <TextField
              id="article-slug"
              label="Slug *"
              value={a.slug}
              onChange={(e) => {
                setSlugTouched(true);
                patch({ slug: e.target.value });
              }}
              error={errors.slug}
            />
            <SelectControl
              id="article-category"
              label="Chuyên mục"
              value={a.category}
              onChange={(v) => patch({ category: v as Article["category"] })}
              options={categories}
            />
          </FieldGroup>
          <TextField
            id="article-summary"
            label="Tóm tắt *"
            multiline
            rows={3}
            value={a.summary}
            onChange={(e) => patch({ summary: e.target.value })}
            error={errors.summary}
          />
          <TextField
            id="article-time"
            label="Thời gian đọc (phút)"
            type="number"
            value={String(a.readTime)}
            onChange={(e) => patch({ readTime: Number(e.target.value) })}
            error={errors.readTime}
          />
        </FieldGroup>
      </div>
      <Tabs defaultValue="write" className="gap-5">
        <TabsList aria-label="Chế độ biên tập">
          <TabsTrigger value="write">Biên tập</TabsTrigger>
          <TabsTrigger value="preview">Xem trước</TabsTrigger>
          <TabsTrigger value="split">Hai khung</TabsTrigger>
        </TabsList>
        <TabsContent value="write">
          <div className="surface p-6">
            <TextField
              id="article-body"
              label="Nội dung Markdown *"
              multiline
              rows={24}
              value={a.content}
              onChange={(e) => patch({ content: e.target.value })}
              error={errors.content}
            />
            <p className="mt-4 text-[11px] text-muted-foreground">
              Hỗ trợ tiêu đề ##, danh sách, trích dẫn, bảng và khối code.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div className="surface min-h-96 p-7">
            <h2 className="mb-7 text-2xl font-semibold">{a.title || "Tiêu đề bài viết"}</h2>
            <Markdown content={a.content || "Nội dung xem trước sẽ hiển thị tại đây."} />
          </div>
        </TabsContent>
        <TabsContent value="split">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="surface p-6">
              <TextField
                id="article-body-split"
                label="Markdown"
                multiline
                rows={24}
                value={a.content}
                onChange={(e) => patch({ content: e.target.value })}
                error={errors.content}
              />
            </div>
            <div className="surface min-w-0 p-6">
              <Markdown content={a.content || "Nội dung xem trước…"} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
