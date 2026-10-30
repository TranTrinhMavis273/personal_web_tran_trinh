import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function Home() {
  return (
    <main className="relative isolate mx-auto flex min-h-screen max-w-6xl flex-col justify-center overflow-hidden px-6 py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"><Spotlight fill="#05308C" className="left-0 top-0" /><DotPattern width={28} height={28} className="text-deepsea/30 [mask-image:linear-gradient(to_bottom,white,transparent)]" /></div>
      <div className="mb-10 flex items-center gap-3 text-sm tracking-widest text-cream-muted"><Layers3 size={20} /> TECH PM / PORTFOLIO</div>
      <p className="mb-5 font-mono text-sm text-cream-muted">AI · DATA · SYSTEMS</p>
      <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">Biến tư duy kỹ thuật thành giá trị thực tế.</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-cream-muted">Nền tảng portfolio và CMS đã được khởi tạo. Nội dung dự án, kinh nghiệm và góc nhìn quản trị sẽ được bổ sung trong giai đoạn tiếp theo.</p>
      <div className="mt-8"><Button asChild variant="outline"><Link href="/design-system">Khám phá phong cách giao diện <ArrowUpRight data-icon="inline-end" /></Link></Button></div>
      <div className="mt-12 rounded-2xl border border-steel-border bg-steel-surface p-6">
        <p className="flex items-center gap-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-cream" /> Môi trường phát triển đã sẵn sàng <ArrowUpRight size={16} /></p>
        <p className="mt-2 text-sm text-cream-muted">Next.js · TypeScript · Tailwind CSS · Supabase</p>
      </div>
    </main>
  );
}
