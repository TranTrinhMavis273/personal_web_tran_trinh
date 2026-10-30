"use client";
import { useDeferredValue, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Search,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Users,
  BriefcaseBusiness,
  Workflow,
  ChartNoAxesCombined,
} from "lucide-react";
import { useContent } from "@/components/providers";
import { domains, competencies } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { SelectControl } from "@/components/forms/controls";
import {
  PageIntro,
  ProjectCard,
  SampleNote,
  NoResults,
  ContactCTA,
} from "@/components/site/blocks";
import { CoverArt } from "@/components/site/visuals";
import { Skeleton } from "@/components/ui/skeleton";
const Mermaid = dynamic(() => import("@/components/site/mermaid"), {
  ssr: false,
  loading: () => <Skeleton className="h-60 w-full" />,
});
export function ProjectsHub() {
  const { content } = useContent();
  const [search, setSearch] = useState("");
  const term = useDeferredValue(search.toLowerCase());
  const [domain, setDomain] = useState("all");
  const [skill, setSkill] = useState("Tất cả năng lực");
  const [limit, setLimit] = useState(6);
  const projects = content.projects.filter(
    (p) =>
      p.published &&
      (domain === "all" || p.domain === domain) &&
      (skill === "Tất cả năng lực" || p.competencies.includes(skill)) &&
      [p.title, p.tagline, ...p.tech, ...p.competencies].join(" ").toLowerCase().includes(term),
  );
  const reset = () => {
    setSearch("");
    setDomain("all");
    setSkill("Tất cả năng lực");
    setLimit(6);
  };
  return (
    <>
      <PageIntro
        eyebrow="Portfolio / Selected work"
        title="Dự án & Case Studies"
        description="Khám phá dự án qua góc nhìn quản trị, kỹ thuật và tác động. Không chỉ là giải pháp, mà còn là cách đi đến giải pháp."
      />
      <div className="container-site pb-12">
        <div className="surface mb-8 p-5 sm:p-7">
          <div className="grid items-end gap-5 md:grid-cols-[1fr_280px]">
            <Field>
              <FieldLabel htmlFor="project-search">Tìm kiếm dự án</FieldLabel>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-muted-foreground" />
                <Input
                  id="project-search"
                  className="pl-10"
                  placeholder="Tên dự án, công nghệ, năng lực PM…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Field>
            <SelectControl
              id="skill-filter"
              label="Năng lực PM"
              value={skill}
              onChange={setSkill}
              options={["Tất cả năng lực", ...competencies]}
            />
          </div>
          <div className="mt-6 overflow-x-auto pb-1">
            <ToggleGroup
              type="single"
              value={domain}
              onValueChange={(v) => {
                if (v) setDomain(v);
              }}
              spacing={2}
              aria-label="Lọc theo lĩnh vực"
              variant="outline"
            >
              <ToggleGroupItem value="all">Tất cả lĩnh vực</ToggleGroupItem>
              {domains.map((d) => (
                <ToggleGroupItem key={d} value={d}>
                  {d}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {projects.length} dự án {term && `cho “${search}”`}
          </p>
          <SampleNote label="Các case study mẫu dùng để xem cấu trúc trình bày." />
        </div>
        {projects.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, limit).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <NoResults onReset={reset} />
        )}{" "}
        {projects.length > limit && (
          <div className="mt-10 text-center">
            <Button variant="outline" onClick={() => setLimit((l) => l + 6)}>
              Xem thêm dự án
            </Button>
          </div>
        )}
      </div>
      <ContactCTA />
    </>
  );
}
export function ProjectDetail({ slug }: { slug: string }) {
  const { content, ready } = useContent();
  const project = content.projects.find((p) => p.slug === slug && p.published);
  if (!project)
    return (
      <div className="container-site section-space">
        <NoResults
          title={ready ? "Không tìm thấy dự án" : "Đang tải dự án…"}
          description="Dự án có thể chưa được xuất bản hoặc đã thay đổi đường dẫn."
        />
        <Button className="mt-6" asChild>
          <Link href="/projects">Về danh sách dự án</Link>
        </Button>
      </div>
    );
  const p = project;
  const next = content.projects.find((x) => x.published && x.id !== p.id);
  return (
    <>
      <div className="container-site">
        <div className="pt-9">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-brand-ink"
          >
            <ArrowLeft size={14} />
            Dự án / Case study
          </Link>
        </div>
        <header className="py-12">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{p.domain}</Badge>
            {p.demo && <Badge variant="outline">Case study minh họa</Badge>}
          </div>
          <h1 className="page-title max-w-4xl">{p.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{p.tagline}</p>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: BriefcaseBusiness, label: "Vai trò", value: p.role },
              { icon: CalendarDays, label: "Thời gian", value: p.timeline },
              { icon: Users, label: "Quy mô nhóm", value: p.teamSize },
              { icon: Workflow, label: "Phương pháp", value: p.methodology },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface flex items-start gap-3 p-5">
                <Icon size={19} className="shrink-0 text-brand-ink" />
                <div>
                  <p className="mb-2 font-mono text-[9px] text-muted-foreground uppercase">
                    {label}
                  </p>
                  <p className="text-xs font-semibold">{value || "Chưa cập nhật"}</p>
                </div>
              </div>
            ))}
          </div>
        </header>
        <CoverArt
          domain={p.domain}
          cover={p.cover}
          className="max-h-[440px] aspect-[2.9] rounded-3xl"
        />
        <section className="section-space">
          <p className="eyebrow mb-6">01 / Impact & evidence</p>
          {p.metrics.length ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {p.metrics.map((m, i) => (
                <div key={i} className="surface p-7">
                  <p className="text-4xl font-semibold tracking-tight text-brand-ink">{m.value}</p>
                  <p className="mt-3 text-sm font-semibold">{m.label}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Nguồn: {m.source || "Chưa bổ sung"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="surface flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
              <span className="icon-box">
                <ChartNoAxesCombined />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Tác động cần được chứng minh.</h2>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Chưa có chỉ số được xác nhận cho case study này. Số liệu và nguồn đo sẽ được bổ
                  sung cùng nội dung thực tế.
                </p>
              </div>
            </div>
          )}
        </section>
        <div className="grid items-start gap-12 pb-20 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0">
            <section id="overview" className="mb-14">
              <h2 className="section-title mb-5">Tóm tắt điều hành</h2>
              <p className="text-sm leading-8 text-muted-foreground">{p.summary}</p>
            </section>
            <section id="problem" className="mb-14">
              <h2 className="section-title mb-5">Bối cảnh & bài toán</h2>
              <p className="text-sm leading-8 text-muted-foreground">
                {p.problem || "Thông tin đang được cập nhật."}
              </p>
            </section>
            <section id="architecture" className="mb-14">
              <h2 className="section-title mb-5">Kiến trúc & luồng dữ liệu</h2>
              <Mermaid code={p.architecture} />
              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                {p.demo
                  ? "Sơ đồ khái niệm minh họa cấu trúc giải pháp."
                  : "Luồng xử lý và ranh giới trách nhiệm trong hệ thống."}
              </p>
            </section>
            <section id="risks" className="mb-14">
              <h2 className="section-title mb-6">Quản trị rủi ro & quyết định</h2>
              <div className="surface overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rủi ro</TableHead>
                      <TableHead>Mức độ</TableHead>
                      <TableHead>Ứng phó</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {p.risks.length ? (
                      p.risks.map((r, i) => (
                        <TableRow key={i}>
                          <TableCell className="max-w-[220px] whitespace-normal text-xs leading-6">
                            {r.risk}
                          </TableCell>
                          <TableCell>
                            <Badge variant={r.severity === "High" ? "destructive" : "secondary"}>
                              {r.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[280px] whitespace-normal text-xs leading-6 text-muted-foreground">
                            {r.mitigation}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>Chưa có bản ghi rủi ro.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>
            <section id="lessons">
              <h2 className="section-title mb-5">Bài học & bước tiếp theo</h2>
              <p className="text-sm leading-8 text-muted-foreground">
                {p.lessons || "Thông tin đang được cập nhật."}
              </p>
            </section>
          </div>
          <aside className="surface p-6 lg:sticky lg:top-28">
            <p className="eyebrow mb-5">Trong case study</p>
            <nav
              className="flex flex-col gap-4 text-xs text-muted-foreground"
              aria-label="Mục lục case study"
            >
              {[
                ["overview", "Tóm tắt điều hành"],
                ["problem", "Bối cảnh & bài toán"],
                ["architecture", "Kiến trúc hệ thống"],
                ["risks", "Rủi ro & quyết định"],
                ["lessons", "Bài học rút ra"],
              ].map(([id, label], i) => (
                <a key={id} href={`#${id}`} className="hover:text-brand-ink">
                  0{i + 1} / {label}
                </a>
              ))}
            </nav>
            <div className="mt-7 border-t border-border pt-5">
              <p className="mb-3 font-mono text-[9px] text-muted-foreground uppercase">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
        {next && (
          <div className="border-t py-12">
            <p className="eyebrow mb-5">Keep exploring</p>
            <Link
              href={`/projects/${next.slug}`}
              className="flex items-center justify-between gap-4 text-2xl font-semibold tracking-tight hover:text-brand-ink"
            >
              {next.title}
              <ArrowUpRight />
            </Link>
          </div>
        )}
      </div>
      <ContactCTA />
    </>
  );
}
