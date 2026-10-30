"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info, SearchX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
  EmptyContent,
} from "@/components/ui/empty";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CoverArt, FeaturedFrame } from "@/components/site/visuals";
import { type Project, type Article } from "@/lib/content";

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Xem tất cả",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        )}
      </div>
      {href && (
        <Button variant="link" asChild>
          <Link href={href}>
            {linkLabel}
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      )}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container-site">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        {children}
      </div>
    </section>
  );
}
export function SampleNote({
  label = "Nội dung minh họa — thông tin dự án thực tế sẽ được cập nhật.",
}: {
  label?: string;
}) {
  return (
    <p className="preview-note">
      <Info className="mt-1 size-3.5 shrink-0" />
      {label}
    </p>
  );
}
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const content = (
    <Card className="group h-full gap-0 overflow-hidden p-3 pb-0 shadow-none hover-lift">
      <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
        <CoverArt domain={project.domain} cover={project.cover} />
      </Link>
      <CardHeader className="gap-3 px-3 pb-3 pt-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] tracking-wide text-muted-foreground uppercase">
            {project.domain}
          </span>
          {project.demo && <Badge variant="outline">Mẫu</Badge>}
        </div>
        <CardTitle className="text-[18px] leading-7 tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:text-brand-ink">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-12 text-xs leading-6">
          {project.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-5">
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted px-2 py-1 font-mono text-[9px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-border px-3 py-4">
        <span className="text-[10px] text-muted-foreground">
          Case study / {project.methodology}
        </span>
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`Xem ${project.title}`}
          className="flex size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <ArrowUpRight size={15} />
        </Link>
      </CardFooter>
    </Card>
  );
  return featured ? <FeaturedFrame>{content}</FeaturedFrame> : content;
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="group gap-0 overflow-hidden p-3 pb-0 shadow-none hover-lift">
      <Link href={`/articles/${article.slug}`} tabIndex={-1} aria-hidden="true">
        <CoverArt
          domain={
            article.category.includes("AI")
              ? "AI"
              : article.category.includes("Automation")
                ? "Automation"
                : "Systems"
          }
        />
      </Link>
      <CardHeader className="gap-3 px-3 pb-4 pt-5">
        <p className="font-mono text-[9px] tracking-wide text-brand-ink uppercase">
          {article.category}
        </p>
        <CardTitle className="text-lg leading-7 tracking-tight">
          <Link href={`/articles/${article.slug}`} className="hover:text-brand-ink">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs leading-6">
          {article.summary}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between border-t px-3 py-4 text-[10px] text-muted-foreground">
        <span>
          {article.readTime} phút đọc {article.demo && "· Nội dung mẫu"}
        </span>
        <Link href={`/articles/${article.slug}`} aria-label={`Đọc ${article.title}`}>
          <ArrowUpRight size={17} />
        </Link>
      </CardFooter>
    </Card>
  );
}
export function NoResults({
  onReset,
  title = "Chưa tìm thấy nội dung",
  description = "Thử một từ khóa khác hoặc bỏ bớt bộ lọc.",
}: {
  onReset?: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <Empty className="min-h-72 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {onReset && (
        <EmptyContent>
          <Button variant="outline" onClick={onReset}>
            Xóa bộ lọc
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
export function ContactCTA() {
  return (
    <section className="section-space">
      <div className="container-site">
        <div className="glass relative isolate overflow-hidden rounded-3xl px-7 py-10 sm:px-12">
          <div className="halo -right-10 -top-40 -z-10 size-[500px]" />
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow mb-4">Let’s connect</p>
              <h2 className="section-title">Cùng tạo nên giá trị tiếp theo.</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Cơ hội nghề nghiệp, dự án hợp tác hay một góc nhìn mới.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact">
                Bắt đầu trò chuyện
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
