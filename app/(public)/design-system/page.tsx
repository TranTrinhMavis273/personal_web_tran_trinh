import Link from "next/link";
import { ArrowLeft, Braces, Layers3, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { MinimalCard, MinimalCardTitle, MinimalCardDescription } from "@/components/ui/minimal-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverSkillCard } from "@/components/design/hover-skill-card";

export const metadata = { title: "Design System", robots: { index: false, follow: false } };

export default function DesignSystem() {
  return <main className="mx-auto max-w-6xl px-6 py-10 sm:py-16">
    <Button asChild variant="outline" size="sm"><Link href="/"><ArrowLeft data-icon="inline-start" /> Trang chủ</Link></Button>
    <section className="relative isolate mt-10 overflow-hidden rounded-3xl border border-border px-7 py-16 sm:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"><Spotlight fill="#05308C" className="left-0 top-0" /><DotPattern width={24} height={24} className="text-deepsea/40 [mask-image:linear-gradient(to_right,transparent,white)]" /></div>
      <Badge variant="outline">DEEP OCEAN / DESIGN PREVIEW</Badge>
      <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Chiều sâu kỹ thuật.<br />Dấu ấn cá nhân.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">Bản xem thử hệ thống giao diện cho portfolio Technical PM: nền xanh sâu, ánh sáng tiết chế và tương tác có chủ đích.</p>
    </section>
    <section className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label="Bảng màu thương hiệu">
      {[['Steel Marine', '#0A0A3A', 'bg-steel-marine'], ['Deep Sea Blue', '#05308C', 'bg-deepsea'], ['Lobster Red', '#AD1F23', 'bg-lobster'], ['Claw Cream', '#FEFDF8', 'bg-cream']].map(([name, hex, color]) => <div key={name} className="overflow-hidden rounded-xl border border-border"><div className={`h-20 ${color}`} /><div className="p-4"><p className="text-sm font-medium">{name}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{hex}</p></div></div>)}
    </section>
    <Tabs defaultValue="visual" className="gap-6">
      <TabsList aria-label="Nhóm thành phần"><TabsTrigger value="visual">Hiệu ứng & thẻ</TabsTrigger><TabsTrigger value="controls">Điều khiển</TabsTrigger></TabsList>
      <TabsContent value="visual" className="grid gap-6 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7"><Layers3 className="mb-8 text-muted-foreground" /><h2 className="text-xl font-semibold">Một điểm nhấn, đủ khác biệt.</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Border Beam cho dự án nổi bật. Viền chuyển động chậm, nội dung luôn là trọng tâm.</p><div aria-hidden="true" className="motion-reduce:hidden"><BorderBeam duration={12} colorFrom="#05308C" colorTo="#AD1F23" /></div></div>
        <HoverSkillCard><Braces className="mb-8 text-muted-foreground" /><h2 className="text-xl font-semibold">Tương tác vừa đủ.</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Thẻ kính nghiêng nhẹ theo con trỏ. Tự tắt chuyển động khi bạn bật chế độ giảm hiệu ứng.</p></HoverSkillCard>
        <MinimalCard><div className="flex h-32 items-center justify-center rounded-2xl bg-background"><Workflow size={44} className="text-muted-foreground" /></div><MinimalCardTitle>Hệ thống & quy trình</MinimalCardTitle><MinimalCardDescription>Thẻ Cult UI được đồng bộ với bảng màu thương hiệu, sẵn sàng cho nội dung thật.</MinimalCardDescription></MinimalCard>
        <div className="flex flex-col justify-center gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7"><h2 className="text-xl font-semibold">Công cụ trong hệ sinh thái</h2><Marquee pauseOnHover repeat={2} aria-label="Công nghệ: Next.js, Supabase, Python, n8n"><span>Next.js</span><span>Supabase</span><span>Python</span><span>n8n</span></Marquee></div>
      </TabsContent>
      <TabsContent value="controls" className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7"><h2 className="text-xl font-semibold">Nền tảng điều khiển</h2><div className="flex flex-wrap gap-3"><Button>Xem dự án</Button><Button variant="outline">Tải CV</Button><Button variant="destructive">Liên hệ</Button><Button disabled>Đang xử lý</Button></div><div className="flex flex-wrap gap-3"><Badge>AI & Data</Badge><Badge variant="secondary">Agile Delivery</Badge><Badge variant="outline">System Architecture</Badge></div><p className="text-sm text-muted-foreground">Các nút ở đây minh họa trạng thái giao diện.</p></TabsContent>
    </Tabs>
  </main>;
}
