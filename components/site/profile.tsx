"use client";
import Link from "next/link";
import {
  BrainCircuit,
  Workflow,
  GitBranch,
  MapPin,
  Mail,
  BriefcaseBusiness,
  ArrowUpRight,
  Award,
  GraduationCap,
  FileDown,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useContent } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Portrait, Reveal } from "@/components/site/visuals";
import { PageIntro, SectionHeader, ContactCTA } from "@/components/site/blocks";
const skills = [
  {
    icon: Workflow,
    title: "Project Management",
    items: ["Agile / Scrum", "Risk Governance", "Stakeholder Alignment"],
  },
  {
    icon: BrainCircuit,
    title: "AI & Data",
    items: ["Computer Vision", "Data Pipeline", "Workflow Automation"],
  },
  { icon: GitBranch, title: "Tools & Systems", items: ["Python", "n8n", "PostgreSQL", "Jira"] },
];
export function About() {
  const {
    content: { profile },
  } = useContent();
  return (
    <>
      <section className="container-site grid items-center gap-12 py-14 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal className="surface overflow-hidden">
          <Portrait compact />
        </Reveal>
        <Reveal>
          <p className="eyebrow mb-5">About / Technical PM</p>
          <h1 className="page-title">{profile.name}</h1>
          <h2 className="mt-5 text-2xl font-medium leading-9 tracking-tight">
            Quản trị bằng
            <br />
            <span className="text-brand-ink">tư duy hệ thống.</span>
          </h2>
          <p className="mt-6 text-sm leading-8 text-muted-foreground">{profile.bio}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/resume">
                Xem hồ sơ / CV
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Kết nối
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
      <div className="container-site grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: MapPin, label: "Địa điểm", value: profile.location || "Đang cập nhật" },
          { icon: BriefcaseBusiness, label: "Định hướng", value: profile.title },
          { icon: BrainCircuit, label: "Lĩnh vực quan tâm", value: "AI · Data · Systems" },
          { icon: Mail, label: "Liên hệ", value: profile.email || "Qua biểu mẫu liên hệ" },
        ].map(({ icon: Icon, label, value }) => (
          <div className="surface min-w-0 p-5 sm:p-6" key={label}>
            <Icon size={20} className="mb-5 text-brand-ink" />
            <p className="mb-2 font-mono text-[9px] text-muted-foreground uppercase">{label}</p>
            <p className="break-words text-xs font-medium leading-6">{value}</p>
          </div>
        ))}
      </div>
      <section className="section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeader eyebrow="01 / Capabilities" title="Năng lực & công cụ" />
            <div className="flex flex-col gap-4">
              {skills.map(({ icon: Icon, title, items }) => (
                <div className="surface p-6" key={title}>
                  <div className="mb-5 flex items-center gap-3">
                    <Icon size={20} className="text-brand-ink" />
                    <h3 className="text-sm font-semibold">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((t) => (
                      <Badge variant="secondary" key={t}>
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
              Các nhóm năng lực định hướng; bằng chứng và mức độ chuyên môn sẽ được bổ sung cùng hồ
              sơ.
            </p>
          </div>
          <div>
            <SectionHeader eyebrow="02 / Experience" title="Hành trình & trải nghiệm" />
            <div className="surface p-7 sm:p-9">
              <div className="mb-7 flex items-start gap-4">
                <span className="icon-box">
                  <BriefcaseBusiness />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Kinh nghiệm thực tế</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Vai trò · Tổ chức · Thời gian · Đóng góp
                  </p>
                </div>
              </div>
              <p className="text-sm leading-8 text-muted-foreground">
                Hồ sơ kinh nghiệm đang được hoàn thiện. Mỗi vai trò sẽ được trình bày cùng bối cảnh
                công việc, trách nhiệm và kết quả đã xác nhận.
              </p>
              <Separator className="my-7" />
              <div className="flex items-start gap-4">
                <span className="icon-box">
                  <GraduationCap />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Học vấn & hoạt động</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Thông tin trường học, chuyên ngành và hoạt động chuyên môn sẽ được cập nhật từ
                    hồ sơ của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space border-y border-border bg-subtle">
        <div className="container-site">
          <SectionHeader
            eyebrow="03 / Credentials"
            title="Chứng chỉ & ghi nhận"
            description="Mỗi cột mốc là một cơ hội để học sâu hơn và đóng góp tốt hơn."
          />
          <div className="surface flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center">
            <span className="icon-box">
              <Award />
            </span>
            <div>
              <h3 className="text-sm font-semibold">Đang cập nhật hồ sơ chứng chỉ</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Tên chứng chỉ, đơn vị cấp và liên kết xác minh sẽ hiển thị tại đây khi đã được xác
                nhận.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-site">
          <p className="eyebrow mb-5">04 / My approach</p>
          <h2 className="section-title max-w-3xl">
            Rõ mục tiêu. Minh bạch quyết định.
            <br />
            <span className="text-brand-ink">Đo lường tác động.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground">
            Tôi muốn hiểu cả điều hệ thống cần làm lẫn lý do con người cần nó. Một giải pháp có ý
            nghĩa cần đúng về kỹ thuật và phù hợp với bối cảnh sử dụng.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
export function Resume() {
  const {
    content: { profile },
  } = useContent();
  const ready = !!profile.resume;
  return (
    <>
      <PageIntro
        eyebrow="Professional profile"
        title="Hồ sơ / CV"
        description="Một góc nhìn ngắn gọn về định hướng, năng lực và hành trình chuyên môn."
      />
      <div className="container-site grid items-start gap-7 pb-20 lg:grid-cols-[1fr_320px]">
        <section aria-label="Xem trước CV" className="min-w-0">
          {ready ? (
            <iframe
              title="Bản xem trước CV"
              src={profile.resume}
              className="h-[950px] w-full rounded-2xl border border-border"
            />
          ) : (
            <div className="relative min-h-[850px] overflow-hidden rounded-2xl border border-border bg-white p-7 text-steel-marine shadow-sm sm:p-14">
              <p className="font-mono text-[10px] tracking-wider text-deepsea uppercase">
                Bố cục hồ sơ / Chưa có CV chính thức
              </p>
              <h2 className="mt-8 text-3xl font-bold tracking-tight">{profile.name}</h2>
              <p className="mt-3 text-xs tracking-widest text-deepsea uppercase">{profile.title}</p>
              <p className="mt-5 text-xs text-[#555b70]">
                {profile.email || "Thông tin liên hệ đang cập nhật"}
              </p>
              <div className="my-9 border-t border-[#d7dff0]" />
              <h3 className="text-xs font-bold tracking-wider uppercase">Giới thiệu</h3>
              <p className="mt-4 text-xs leading-7 text-[#555b70]">{profile.bio}</p>
              {["Kinh nghiệm", "Dự án tiêu biểu", "Học vấn", "Chứng chỉ & Kỹ năng"].map((s) => (
                <div key={s} className="mt-10">
                  <h3 className="text-xs font-bold tracking-wider uppercase">{s}</h3>
                  <p className="mt-4 text-xs leading-6 text-[#555b70]">
                    Thông tin sẽ được bổ sung từ hồ sơ đã xác nhận.
                  </p>
                </div>
              ))}
              <div className="mt-12 flex items-center gap-2 rounded-lg bg-[#f0f3fa] p-4 text-[10px] leading-5 text-[#555b70]">
                <FileText className="size-4 shrink-0" />
                Đây là bản bố cục xem trước, chưa phải CV để gửi nhà tuyển dụng.
              </div>
            </div>
          )}
        </section>
        <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
          <div className="surface p-7">
            <span className="icon-box mb-6">
              <FileDown />
            </span>
            <h2 className="text-xl font-semibold tracking-tight">Hồ sơ có thể tải</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              {ready
                ? "Tải bản CV đã được cập nhật."
                : "CV chính thức chưa được cập nhật. Nút tải sẽ mở khi có tệp PDF."}
            </p>
            <Separator className="my-6" />
            <dl className="flex flex-col gap-4 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Định dạng</dt>
                <dd>PDF / ATS</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Trạng thái</dt>
                <dd>{ready ? "Có thể tải" : "Đang cập nhật"}</dd>
              </div>
            </dl>
            {ready ? (
              <Button asChild className="mt-7 w-full">
                <a href={profile.resume} download="Tran-Trinh-CV.pdf">
                  Tải CV (PDF)
                  <FileDown data-icon="inline-end" />
                </a>
              </Button>
            ) : (
              <Button disabled className="mt-7 w-full">
                CV đang cập nhật
                <FileDown data-icon="inline-end" />
              </Button>
            )}
          </div>
          <div className="glass rounded-2xl p-7">
            <h3 className="text-lg font-semibold">Muốn trao đổi thêm?</h3>
            <p className="mb-5 mt-3 text-xs leading-6 text-muted-foreground">
              Bắt đầu bằng một lời nhắn về điều bạn đang tìm kiếm.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contact">
                Liên hệ
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
