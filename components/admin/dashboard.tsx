"use client";
import Link from "next/link";
import { FolderKanban, BookOpen, Inbox, FilePenLine, Plus, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useContent } from "@/components/providers";
import { domains } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AdminHeading } from "@/components/admin/shell";
import { NoResults } from "@/components/site/blocks";
export function Dashboard() {
  const { content } = useContent();
  const stats = [
    {
      icon: Inbox,
      label: "Liên hệ mới",
      value: content.inquiries.filter((i) => i.status === "new").length,
      href: "/admin/inquiries",
    },
    {
      icon: FolderKanban,
      label: "Dự án xuất bản",
      value: content.projects.filter((p) => p.published).length,
      href: "/admin/projects",
    },
    {
      icon: BookOpen,
      label: "Bài viết xuất bản",
      value: content.articles.filter((a) => a.published).length,
      href: "/admin/articles",
    },
    {
      icon: FilePenLine,
      label: "Nội dung nháp",
      value: [...content.projects, ...content.articles].filter((x) => !x.published).length,
      href: "/admin/projects",
    },
  ];
  const chart = domains.map((name, i) => ({
    name: ["AI & CV", "Data & Automation", "Enterprise"][i],
    count: content.projects.filter((p) => p.domain === name).length,
  }));
  const drafts = [
    ...content.projects.map((p) => ({ ...p, type: "Dự án", href: `/admin/projects/${p.id}` })),
    ...content.articles.map((a) => ({ ...a, type: "Bài viết", href: `/admin/articles/${a.id}` })),
  ].filter((x) => !x.published);
  return (
    <>
      <AdminHeading
        title="Chào bạn, một ngày mới."
        description="Một góc nhìn nhanh về nội dung và những kết nối đang chờ bạn."
        action={
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus data-icon="inline-start" />
              Thêm dự án
            </Link>
          </Button>
        }
      />
      <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, href }) => (
          <Link href={href} key={label} className="surface p-5 hover-lift sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="icon-box">
                <Icon />
              </span>
              <ArrowUpRight size={15} className="text-muted-foreground" />
            </div>
            <p className="text-3xl font-semibold tracking-tight">
              {value.toString().padStart(2, "0")}
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="min-w-0 gap-5 shadow-none">
          <CardHeader>
            <CardTitle>Những kết nối gần đây</CardTitle>
            <CardDescription>Liên hệ được lưu trong bản xem thử.</CardDescription>
          </CardHeader>
          <CardContent>
            {content.inquiries.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người gửi</TableHead>
                    <TableHead>Mục đích</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.inquiries.slice(0, 5).map((i) => (
                    <TableRow key={i.id}>
                      <TableCell>
                        <Link
                          href={`/admin/inquiries?selected=${i.id}`}
                          className="text-xs font-medium hover:text-brand-ink"
                        >
                          {i.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-[11px] text-muted-foreground">
                        {i.purpose}
                      </TableCell>
                      <TableCell>
                        <Badge variant={i.status === "new" ? "secondary" : "outline"}>
                          {i.status === "new"
                            ? "New"
                            : i.status === "contacted"
                              ? "Contacted"
                              : "Archived"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <NoResults title="Chưa có liên hệ" description="Lời nhắn mới sẽ xuất hiện ở đây." />
            )}
            <Button asChild variant="link" size="sm" className="mt-5 px-0">
              <Link href="/admin/inquiries">
                Mở hộp thư
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="min-w-0 gap-5 shadow-none">
          <CardHeader>
            <CardTitle>Danh mục dự án</CardTitle>
            <CardDescription>Phân bố nội dung trong workspace xem thử.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] min-w-0">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chart} margin={{ left: -25, right: 5, bottom: 0, top: 10 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    cursor={{ fill: "var(--muted)" }}
                  />
                  <Bar
                    name="Dự án"
                    dataKey="count"
                    fill="var(--brand-ink)"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={42}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <section className="mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Nội dung cần hoàn thiện</h2>
          <Badge variant="outline">{drafts.length} bản nháp</Badge>
        </div>
        {drafts.length ? (
          <div className="surface overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.title}</TableCell>
                    <TableCell>{d.type}</TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link href={d.href}>
                          Tiếp tục biên tập
                          <ArrowUpRight data-icon="inline-end" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="surface flex flex-col items-start justify-between gap-5 p-7 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold">Mọi nội dung đã sẵn sàng.</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Bắt đầu một câu chuyện mới cho portfolio của bạn.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/articles/new">
                Viết bài mới
                <Plus data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
