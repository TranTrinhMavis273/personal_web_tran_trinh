"use client";
import { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Link2, Search } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/components/providers";
import { categories } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CoverArt } from "@/components/site/visuals";
import {
  PageIntro,
  ArticleCard,
  NoResults,
  SampleNote,
  ContactCTA,
} from "@/components/site/blocks";
export const headingId = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-site">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
export function ArticlesHub() {
  const { content } = useContent();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const term = useDeferredValue(search.toLowerCase());
  const articles = content.articles.filter(
    (a) =>
      a.published &&
      (category === "all" || a.category === category) &&
      `${a.title} ${a.summary}`.toLowerCase().includes(term),
  );
  const featured = category === "all" && !term ? articles[0] : null;
  return (
    <>
      <PageIntro
        eyebrow="Notes / Insights"
        title="Góc nhìn từ thực tiễn"
        description="Những ghi chép về quản trị dự án, thiết kế hệ thống và ứng dụng AI. Để hiểu sâu hơn, và làm tốt hơn."
      />
      <div className="container-site pb-12">
        {featured && (
          <Link
            href={`/articles/${featured.slug}`}
            className="surface group mb-10 grid overflow-hidden p-3 hover-lift md:grid-cols-2"
          >
            <CoverArt domain="Systems" className="min-h-60 md:aspect-auto" />
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-9">
              <p className="eyebrow">Featured insight</p>
              <Badge variant="secondary">{featured.category}</Badge>
              <h2 className="text-2xl font-semibold leading-9 tracking-tight group-hover:text-brand-ink">
                {featured.title}
              </h2>
              <p className="text-xs leading-6 text-muted-foreground">{featured.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {featured.readTime} phút đọc · Nội dung mẫu
                </span>
                <ArrowUpRight size={20} />
              </div>
            </div>
          </Link>
        )}
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-full overflow-x-auto pb-1">
            <ToggleGroup
              aria-label="Lọc chuyên mục"
              type="single"
              value={category}
              onValueChange={(v) => v && setCategory(v)}
              variant="outline"
              spacing={2}
            >
              <ToggleGroupItem value="all">Tất cả</ToggleGroupItem>
              {categories.map((c) => (
                <ToggleGroupItem key={c} value={c}>
                  {c}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Field className="lg:max-w-64">
            <FieldLabel htmlFor="article-search" className="sr-only">
              Tìm bài viết
            </FieldLabel>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                id="article-search"
                className="pl-10"
                placeholder="Tìm bài viết…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Field>
        </div>
        <p aria-live="polite" className="mb-5 text-xs text-muted-foreground">
          {articles.length} bài viết
        </p>
        {articles.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <NoResults
            onReset={() => {
              setCategory("all");
              setSearch("");
            }}
          />
        )}
        <div className="mt-6">
          <SampleNote label="Các bài viết hiện tại là bản mẫu nội dung cho giao diện." />
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
export function ArticleReader({ slug }: { slug: string }) {
  const { content, ready } = useContent();
  const article = content.articles.find((a) => a.slug === slug && a.published);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.getElementById("article-body");
      if (el) {
        const start = el.getBoundingClientRect().top + window.scrollY - 140;
        setProgress(
          Math.min(
            100,
            Math.max(
              0,
              ((window.scrollY - start) / Math.max(1, el.offsetHeight - window.innerHeight / 2)) *
                100,
            ),
          ),
        );
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (!article)
    return (
      <div className="container-site section-space">
        <NoResults title={ready ? "Không tìm thấy bài viết" : "Đang tải…"} />
        <Button asChild className="mt-5">
          <Link href="/articles">Về danh sách bài viết</Link>
        </Button>
      </div>
    );
  const a = article;
  const headings = a.content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3));
  const others = content.articles.filter((x) => x.published && x.id !== a.id);
  return (
    <>
      <div
        className="fixed left-0 top-[85px] z-40 h-[2px] bg-brand-ink"
        style={{ width: `${progress}%` }}
      />
      <article className="container-site">
        <div className="pt-9">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground"
          >
            <ArrowLeft size={14} />
            Bài viết / {a.category}
          </Link>
        </div>
        <header className="mx-auto max-w-4xl py-12">
          <Badge variant="secondary">{a.category}</Badge>
          <h1 className="page-title mt-6 max-w-4xl">{a.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">{a.summary}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-full border bg-secondary font-mono text-xs text-brand-ink">
                TT
              </span>
              <span>{a.demo ? "Biên tập minh họa" : content.profile.name}</span>
              <span>·</span>
              <Clock size={13} />
              <span>{a.readTime} phút đọc</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  toast.success("Đã sao chép liên kết.");
                } catch {
                  toast.error("Chưa thể sao chép liên kết.");
                }
              }}
            >
              <Link2 data-icon="inline-start" />
              Sao chép liên kết
            </Button>
          </div>
          {a.demo && (
            <div className="mt-5">
              <SampleNote label="Bản mẫu nội dung để xem bố cục trang đọc." />
            </div>
          )}
        </header>
        <div className="mx-auto max-w-4xl">
          <CoverArt domain={a.category} className="aspect-[2.5] max-h-96" />
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-12 py-16 lg:grid-cols-[minmax(0,720px)_200px]">
          <div id="article-body">
            <Markdown content={a.content} />
          </div>
          <aside className="surface order-first p-5 lg:sticky lg:top-28 lg:order-last">
            <p className="eyebrow mb-4">Mục lục</p>
            <nav
              aria-label="Mục lục bài viết"
              className="flex flex-col gap-4 text-[11px] leading-6 text-muted-foreground"
            >
              {headings.map((h, i) => (
                <a href={`#${headingId(h)}`} key={i} className="hover:text-brand-ink">
                  {String(i + 1).padStart(2, "0")} / {h}
                </a>
              ))}
            </nav>
          </aside>
        </div>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-between gap-6 border-t py-10">
          {others.slice(0, 2).map((o, i) => (
            <Link href={`/articles/${o.slug}`} key={o.id} className="max-w-sm">
              <span className="mb-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                {i === 0 ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}{" "}
                {i === 0 ? "BÀI VIẾT KHÁC" : "TIẾP TỤC KHÁM PHÁ"}
              </span>
              <span className="text-sm font-semibold hover:text-brand-ink">{o.title}</span>
            </Link>
          ))}
        </div>
      </article>
      <ContactCTA />
    </>
  );
}
