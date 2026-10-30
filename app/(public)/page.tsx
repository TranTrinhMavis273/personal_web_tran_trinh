"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  BrainCircuit,
  GitBranch,
  ShieldCheck,
  Workflow,
  Compass,
  ClipboardList,
  Code2,
  ChartNoAxesCombined,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { useContent } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Portrait, Reveal } from "@/components/site/visuals";
import { TechnologyStrip } from "@/components/site/technology-strip";
import {
  SectionHeader,
  ProjectCard,
  ArticleCard,
  ContactCTA,
  SampleNote,
} from "@/components/site/blocks";

const abilities = [
  {
    icon: Workflow,
    title: "Agile Delivery",
    description: "Mục tiêu rõ ràng. Phạm vi phù hợp. Triển khai có nhịp điệu.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Governance",
    description: "Nhìn trước rủi ro, ghi lại quyết định và giữ trách nhiệm minh bạch.",
  },
  {
    icon: GitBranch,
    title: "System Thinking",
    description: "Kết nối thành phần, dữ liệu và con người trong cùng một hệ thống.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Literacy",
    description: "Hiểu công nghệ để đặt đúng câu hỏi và làm rõ giá trị ứng dụng.",
  },
];
const steps = [
  {
    icon: Compass,
    title: "Khám phá",
    description: "Hiểu bài toán, người dùng và điều cần thay đổi.",
  },
  {
    icon: ClipboardList,
    title: "Lập kế hoạch",
    description: "Thống nhất phạm vi, ưu tiên và tiêu chí hoàn thành.",
  },
  {
    icon: Code2,
    title: "Triển khai",
    description: "Kết nối nhóm, tháo gỡ vướng mắc và giữ nhịp công việc.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Đo lường",
    description: "Kiểm chứng kết quả qua dữ liệu và phản hồi.",
  },
  {
    icon: RefreshCw,
    title: "Cải tiến",
    description: "Rút kinh nghiệm và đưa bài học vào vòng tiếp theo.",
  },
];
export default function Home() {
  const { content } = useContent();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-8 pb-16 pt-12 lg:grid-cols-[1.22fr_1fr] lg:gap-14 lg:pb-20 lg:pt-20">
          <Reveal>
            <p className="eyebrow mb-6">AI · Data · Systems</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Xin chào, tôi là{" "}
              <span className="font-semibold text-foreground">{content.profile.name}</span>
            </p>
            <h1 className="display-title max-w-[720px]">
              Từ bài toán phức tạp
              <br className="hidden xl:block" /> đến{" "}
              <span className="text-brand-ink">giá trị thực tế.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">
              Kết nối quản trị dự án với AI, Data và tư duy hệ thống. Một portfolio tập trung vào
              cách làm, quyết định và tác động.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  Khám phá dự án
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">
                  Xem hồ sơ / CV
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <a
              href="#selected-work"
              className="mt-10 inline-flex items-center gap-3 font-mono text-[9px] tracking-[.12em] text-muted-foreground uppercase"
            >
              <span className="flex size-7 items-center justify-center rounded-full border border-border">
                <ArrowDown size={12} />
              </span>
              Scroll to explore
            </a>
          </Reveal>
          <Reveal className="relative lg:pl-3">
            <Portrait />
          </Reveal>
        </div>
      </section>
      <TechnologyStrip />
      <section id="selected-work" className="section-space">
        <div className="container-site">
          <SectionHeader
            eyebrow="01 / Selected work"
            title="Dự án tiêu biểu"
            description="Đằng sau mỗi giải pháp là một chuỗi vấn đề, quyết định và bài học."
            href="/projects"
            linkLabel="Tất cả dự án"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.projects
              .filter((p) => p.published && p.featured)
              .slice(0, 3)
              .map((p, i) => (
                <Reveal key={p.id}>
                  <ProjectCard project={p} featured={i === 0} />
                </Reveal>
              ))}
          </div>
          <div className="mt-5">
            <SampleNote />
          </div>
        </div>
      </section>
      <section className="section-space border-y border-border bg-subtle">
        <div className="container-site">
          <SectionHeader
            eyebrow="02 / What I bring"
            title="Quản trị có chiều sâu kỹ thuật."
            description="Bốn góc nhìn để đưa dự án từ ý tưởng đến kết quả có ý nghĩa."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {abilities.map(({ icon: Icon, title, description }) => (
              <Reveal key={title}>
                <Card className="h-full gap-0 shadow-none hover-lift">
                  <CardHeader className="gap-5">
                    <span className="icon-box">
                      <Icon />
                    </span>
                    <CardTitle className="text-[16px] tracking-tight">{title}</CardTitle>
                    <CardDescription className="text-xs leading-6">{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site">
          <SectionHeader
            eyebrow="03 / The process"
            title="Một cách làm, liên tục tiến về phía trước."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="icon-box">
                    <Icon />
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">/ 0{i + 1}</span>
                </div>
                <h3 className="mb-3 text-sm font-semibold">{title}</h3>
                <p className="text-xs leading-6 text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space border-y border-border bg-subtle">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow mb-4">04 / The journey</p>
            <h2 className="section-title">
              Kinh nghiệm tạo nên
              <br />
              cách nhìn.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Những trải nghiệm, vai trò và đóng góp sẽ được ghi lại cùng bối cảnh và bằng chứng.
            </p>
            <Button asChild variant="link" className="mt-5 px-0">
              <Link href="/about">
                Tìm hiểu về tôi
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
          <div className="surface p-7 sm:p-9">
            <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              Hồ sơ đang được hoàn thiện
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Hành trình của {content.profile.name}
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Thông tin kinh nghiệm, học vấn và chứng chỉ sẽ được cập nhật từ hồ sơ đã xác nhận.
            </p>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-3 text-xs text-brand-ink">
              <span>Project Management</span>
              <span>·</span>
              <span>AI & Data</span>
              <span>·</span>
              <span>Systems</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site">
          <SectionHeader
            eyebrow="05 / Notes & insights"
            title="Góc nhìn từ thực tiễn"
            href="/articles"
            linkLabel="Tất cả bài viết"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {content.articles
              .filter((a) => a.published)
              .slice(0, 3)
              .map((a) => (
                <Reveal key={a.id}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
